import { Socket, io } from "socket.io-client";
import { useRef, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

export function useJobBinding({
  serverBase,
  specName,
  outputsToWatch = [{ key: "default", mode: "replace" }],
}: {
  serverBase: string;
  specName: string;
  outputsToWatch?: {
    childSpec?: string;
    childSpecLabel?: string;
    key?: string;
    mode: "append" | "replace";
  }[];
}) {
  const clientRef = useRef<Socket>();

  const jobInfoRef = useRef<
    | {
        jobId: string;
        inputKeys: string[];
        outputKeys: string[];
      }
    | "not-initialized"
    | "working"
  >("not-initialized");

  const [outputsByKey, setOutputsByKey] = useState<{
    [key: string]: any;
  }>({});

  useDeepCompareEffect(() => {
    if (!clientRef.current) {
      clientRef.current = io(serverBase, {
        autoConnect: true,
        path: "/livestack.socket.io",
        transports: ["websocket", "polling"],
      });
    }
    const client = clientRef.current;
    client.on("error", (err) => {
      console.error(err);
      console.error(
        "Error trying to connect to livestack gateway. Did you forget to set serverBase to the server hosting LiveStack gateway?"
      );
    });
    if (jobInfoRef.current === "not-initialized") {
      jobInfoRef.current = "working";
      client.emit("request_and_bind", { specName });
      client.on(
        "job_info",
        ({
          inputKeys,
          outputKeys,
          jobId,
        }: {
          jobId: string;
          inputKeys: string[];
          outputKeys: string[];
        }) => {
          jobInfoRef.current = { jobId, inputKeys, outputKeys };
          for (const { mode, key = "default" } of outputsToWatch) {
            client.on(`output:${jobId}/${key}`, (data: any) => {
              const timeStamped = { ...data, _timeStamp: Date.now() };
              if (mode === "replace") {
                setOutputsByKey((prev) => ({ ...prev, [key]: timeStamped }));
              } else if (mode === "append") {
                setOutputsByKey((prev) => ({
                  ...prev,
                  [key]: [...(prev[key] || []), timeStamped],
                }));
              }
            });
          }
        }
      );
    }
    return () => {
      if (
        jobInfoRef.current !== "not-initialized" &&
        jobInfoRef.current !== "working"
      ) {
        client.emit("unbind", { specName, jobId: jobInfoRef.current?.jobId });
      }
    };
  }, [specName, outputsToWatch]);

  const feed = async <T,>(data: T, key: string = "default") => {
    if (typeof jobInfoRef.current === "string") {
      throw new Error("Background job not yet running.");
    }
    if (!jobInfoRef.current.inputKeys.includes(key)) {
      throw new Error(`Key ${key} not in inputKeys.`);
    }

    if (!clientRef.current) {
      throw new Error("clientRef.current is null");
    }
    clientRef.current.emit(`feed:${jobInfoRef.current.jobId}/${key}`, data);
  };

  return { jobInfo: jobInfoRef.current, feed, outputsByKey };
}