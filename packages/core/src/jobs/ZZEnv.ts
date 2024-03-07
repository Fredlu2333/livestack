import { vaultClient } from "@livestack/vault-client";
import { IStorageProvider } from "../storage/cloudStorage";
import { Stream } from "stream";
import chalk, { green, inverse, red, yellow } from "ansis";

import { z } from "zod";
interface EnvParams {
  readonly storageProvider?: IStorageProvider;
  readonly projectId: string;
}

export class ZZEnv implements EnvParams {
  public readonly storageProvider?: IStorageProvider;
  private readonly _projectId: string;
  private static _zzEnv: ZZEnv | null = null;

  static global() {
    return ZZEnv._zzEnv;
  }

  static setGlobal(env: ZZEnv) {
    console.info("Global project ID set to ", env._projectId);

    ZZEnv._zzEnv = env;
  }

  constructor({
    storageProvider,
    projectId,
  }: Omit<EnvParams, "projectId"> & {
    projectId?: string;
  }) {
    this.storageProvider = storageProvider;
    if (!projectId) {
      projectId = "live-project-" + new Date().getTime();
      console.warn(
        "No projectId provided to ZZEnv. Giving it a default one: ",
        projectId
      );
      // fs.writeFileSync("PROJECT_ID", projectId);
    }

    this._projectId = projectId;
  }

  get projectId() {
    this.printLiveDevUrlOnce();
    return this._projectId;
  }

  private static _cachedInstanceId: string | null = null;
  private livePrinted = false;

  private printLiveDevUrlOnce() {
    if (!this.livePrinted) {
      console.info(
        yellow`${inverse` 🔴 LIVE 🦓🦓 https://live.dev/p/test-user/${this._projectId}`}${inverse``}`
      );

      this.livePrinted = true;
    }
  }

  public static async getInstanceId() {
    if (!this._cachedInstanceId) {
      const r = await vaultClient.queue.initInstance({});
      this._cachedInstanceId = r.instanceId;
    }
    return this._cachedInstanceId;
  }

  public derive(newP: Partial<EnvParams>) {
    return new ZZEnv({
      ...this,
      ...newP,
    });
  }
}

export const fileOrBufferSchema = z.custom<Buffer | Stream>((data) => {
  return data instanceof Buffer || data instanceof Stream;
}, "Data is not an instance of a Buffer or a Stream.");
