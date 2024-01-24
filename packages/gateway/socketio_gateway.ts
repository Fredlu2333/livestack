import {
  UNBIND_CMD,
  UnbindParams,
  REQUEST_AND_BIND_CMD,
  RequestAndBindType,
  FEED,
  FeedParams,
  JOB_INFO,
  JobInfoType,
} from "@livestack/shared/gateway-binding-types";
import { Subscription } from "rxjs";
import { ZZEnv, ZZJobSpec } from "@livestack/core";
import { Socket, Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import {
  SpecOrName,
  resolveUniqueSpec,
} from "@livestack/core/orchestrations/ZZWorkflow";

export function setupJobBindingGateway({
  httpServer,
  socketPath = "/livestack.socket.io",
  onConnect,
  allowedSpecsForBinding = [],
  zzEnv,
}: {
  httpServer: HTTPServer;
  socketPath?: string;
  onConnect?: (conn: LiveGatewayConn) => void;
  allowedSpecsForBinding?: SpecOrName[];
  zzEnv?: ZZEnv | null;
}) {
  const io = new SocketIOServer(httpServer, {
    path: socketPath,
    cors: {
      origin: "*", // Adjust according to your needs for security
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    console.info(`🦓 Socket client connected: ${socket.id}.`);
    const conn = new LiveGatewayConn({
      socket,
      allowedSpecsForBinding: allowedSpecsForBinding
        .map(resolveUniqueSpec)
        .map(({ spec, uniqueSpecLabel }) => ({
          specName: spec.name,
          uniqueSpecLabel,
        })),
      zzEnv,
    });
    if (onConnect) {
      onConnect(conn);
    }
    let disconnected = false;

    socket.on("disconnect", async () => {
      if (!disconnected) {
        disconnected = true;
      }
      console.info(`🦓 Socket client disconnected  ${socket.id}.`);
    });

    socket.on("reconnect", async () => {
      disconnected = false;
      console.log("reconnected");
    });
  });
  console.info("🦓 LiveStack socket.io gateway initiated.");
  return io;
}

class LiveGatewayConn {
  socket: Socket;
  private readonly allowedSpecsForBinding: {
    specName: string;
    uniqueSpecLabel?: string;
  }[];
  zzEnv: ZZEnv;

  constructor({
    zzEnv,
    socket,
    allowedSpecsForBinding = [],
  }: {
    zzEnv?: ZZEnv | null;
    socket: Socket;
    allowedSpecsForBinding?: {
      specName: string;
      uniqueSpecLabel?: string;
    }[];
  }) {
    this.socket = socket;
    this.allowedSpecsForBinding = allowedSpecsForBinding;
    zzEnv = zzEnv || ZZEnv.global();
    if (!zzEnv) {
      throw new Error("ZZEnv not found.");
    }
    this.zzEnv = zzEnv;

    this.socket.on(
      REQUEST_AND_BIND_CMD,
      async ({ specName, uniqueSpecLabel }: RequestAndBindType) => {
        if (
          !this.allowedSpecsForBinding.some(
            (s) =>
              s.specName === specName && s.uniqueSpecLabel === uniqueSpecLabel
          )
        ) {
          throw new Error(
            `Spec name ${specName} not allowed for binding to socket.`
          );
        }
        const spec = ZZJobSpec.lookupByName(specName);
        await this.bindToNewJob(spec);
      }
    );
  }

  public onDisconnect = async (cb: () => void) => {
    this.socket.on("disconnect", cb);
  };

  public bindToNewJob = async <P, IMap, OMap>(
    jobSpec: ZZJobSpec<P, IMap, OMap>,
    jobOptions?: P
  ) => {
    const { input, output, jobId } = await jobSpec.enqueueJob({ jobOptions });
    const data: JobInfoType = {
      jobId,
      availableInputs: input.keys.map((k) => String(k)),
      availableOutputs: output.keys.map((k) => String(k)),
    };
    this.socket.emit(JOB_INFO, data);
    this.socket.on(
      FEED,
      async ({ data, tag }: FeedParams<IMap[keyof IMap]>) => {
        try {
          await input.byTag(tag as keyof IMap).feed(data);
        } catch (err) {
          console.error(err);
        }
      }
    );

    let subs: Subscription[] = [];

    for (const tag of output.keys) {
      const sub = output.byTag(tag).valueObservable.subscribe((data) => {
        this.socket.emit(`stream:${jobId}/${String(tag)}`, data);
      });
      subs.push(sub);
    }

    this.onDisconnect(() => {
      for (const key of input.keys) {
        try {
          input.byTag(key).terminate();
        } catch (err) {
          console.error(err);
        }
      }

      for (const sub of subs) {
        sub.unsubscribe();
      }
    });

    this.socket.on(UNBIND_CMD, ({ jobId }: UnbindParams) => {
      for (const key of input.keys) {
        try {
          input.byTag(key).terminate();
        } catch (err) {
          console.error(err);
        }
      }

      for (const sub of subs) {
        sub.unsubscribe();
      }
    });
  };
}
