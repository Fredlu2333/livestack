/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Struct } from "./google/protobuf/struct";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "livestack";

export enum ConnectorType {
  IN = 0,
  OUT = 1,
  UNRECOGNIZED = -1,
}

export function connectorTypeFromJSON(object: any): ConnectorType {
  switch (object) {
    case 0:
    case "IN":
      return ConnectorType.IN;
    case 1:
    case "OUT":
      return ConnectorType.OUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ConnectorType.UNRECOGNIZED;
  }
}

export function connectorTypeToJSON(object: ConnectorType): string {
  switch (object) {
    case ConnectorType.IN:
      return "IN";
    case ConnectorType.OUT:
      return "OUT";
    case ConnectorType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum Order {
  ASC = 0,
  DESC = 1,
  UNRECOGNIZED = -1,
}

export function orderFromJSON(object: any): Order {
  switch (object) {
    case 0:
    case "ASC":
      return Order.ASC;
    case 1:
    case "DESC":
      return Order.DESC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Order.UNRECOGNIZED;
  }
}

export function orderToJSON(object: Order): string {
  switch (object) {
    case Order.ASC:
      return "ASC";
    case Order.DESC:
      return "DESC";
    case Order.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface JobRec {
  project_id: string;
  /** Align with jobs.ts */
  spec_name: string;
  job_id: string;
  time_created: Date | undefined;
  job_params: { [key: string]: any } | undefined;
}

export interface GetJobRecRequest {
  projectId: string;
  specName: string;
  jobId: string;
}

export interface JobRecAndStatus {
  rec: JobRec | undefined;
  status: string;
}

export interface GetJobRecResponse {
  /** The actual response data */
  rec?:
    | JobRecAndStatus
    | undefined;
  /** Signal that the response is null */
  null_response?: Empty | undefined;
}

export interface GetZZJobTestRequest {
  id: string;
}

export interface GetZZJobTestResponse {
  projectId: string;
  pipeName: string;
  jobId: string;
}

export interface EnsureStreamRecRequest {
  project_id: string;
  stream_id: string;
}

export interface EnsureJobAndStatusAndConnectorRecsRequest {
  projectId: string;
  specName: string;
  jobId: string;
  jobOptionsStr: string;
  parentJobId?: string | undefined;
  uniqueSpecLabel?: string | undefined;
  inputStreamIdOverridesByTag: { [key: string]: string };
  outputStreamIdOverridesByTag: { [key: string]: string };
}

export interface EnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry {
  key: string;
  value: string;
}

export interface EnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry {
  key: string;
  value: string;
}

export interface GetJobDatapointsRequest {
  projectId: string;
  specName: string;
  jobId: string;
  key: string;
  ioType: ConnectorType;
  order?: Order | undefined;
  limit?: number | undefined;
}

export interface DatapointRecord {
  datapointId: string;
  dataStr: string;
}

export interface GetJobDatapointsResponse {
  points: DatapointRecord[];
}

export interface JobInfo {
  jobId: string;
  outputTag: string;
}

export interface AddDatapointRequest {
  projectId: string;
  streamId: string;
  datapointId: string;
  dataStr: string;
  jobInfo?: JobInfo | undefined;
}

export interface AddDatapointResponse {
  datapointId: string;
}

export interface GetJobStreamConnectorRecsRequest {
  projectId: string;
  jobId: string;
  key?: string | undefined;
  connectorType?: ConnectorType | undefined;
}

export interface JobStreamConnectorRecord {
  project_id: string;
  job_id: string;
  time_created: Date | undefined;
  stream_id: string;
  key: string;
  connector_type: ConnectorType;
}

export interface GetJobStreamConnectorRecsResponse {
  records: JobStreamConnectorRecord[];
}

export interface AppendJobStatusRecRequest {
  projectId: string;
  specName: string;
  jobId: string;
  jobStatus: string;
}

function createBaseJobRec(): JobRec {
  return { project_id: "", spec_name: "", job_id: "", time_created: undefined, job_params: undefined };
}

export const JobRec = {
  encode(message: JobRec, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.project_id !== "") {
      writer.uint32(10).string(message.project_id);
    }
    if (message.spec_name !== "") {
      writer.uint32(18).string(message.spec_name);
    }
    if (message.job_id !== "") {
      writer.uint32(26).string(message.job_id);
    }
    if (message.time_created !== undefined) {
      Timestamp.encode(toTimestamp(message.time_created), writer.uint32(34).fork()).ldelim();
    }
    if (message.job_params !== undefined) {
      Struct.encode(Struct.wrap(message.job_params), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JobRec {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJobRec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.project_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.spec_name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.job_id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.time_created = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.job_params = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JobRec {
    return {
      project_id: isSet(object.project_id) ? globalThis.String(object.project_id) : "",
      spec_name: isSet(object.spec_name) ? globalThis.String(object.spec_name) : "",
      job_id: isSet(object.job_id) ? globalThis.String(object.job_id) : "",
      time_created: isSet(object.time_created) ? fromJsonTimestamp(object.time_created) : undefined,
      job_params: isObject(object.job_params) ? object.job_params : undefined,
    };
  },

  toJSON(message: JobRec): unknown {
    const obj: any = {};
    if (message.project_id !== "") {
      obj.project_id = message.project_id;
    }
    if (message.spec_name !== "") {
      obj.spec_name = message.spec_name;
    }
    if (message.job_id !== "") {
      obj.job_id = message.job_id;
    }
    if (message.time_created !== undefined) {
      obj.time_created = message.time_created.toISOString();
    }
    if (message.job_params !== undefined) {
      obj.job_params = message.job_params;
    }
    return obj;
  },

  create(base?: DeepPartial<JobRec>): JobRec {
    return JobRec.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<JobRec>): JobRec {
    const message = createBaseJobRec();
    message.project_id = object.project_id ?? "";
    message.spec_name = object.spec_name ?? "";
    message.job_id = object.job_id ?? "";
    message.time_created = object.time_created ?? undefined;
    message.job_params = object.job_params ?? undefined;
    return message;
  },
};

function createBaseGetJobRecRequest(): GetJobRecRequest {
  return { projectId: "", specName: "", jobId: "" };
}

export const GetJobRecRequest = {
  encode(message: GetJobRecRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    if (message.specName !== "") {
      writer.uint32(18).string(message.specName);
    }
    if (message.jobId !== "") {
      writer.uint32(26).string(message.jobId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetJobRecRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetJobRecRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.specName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.jobId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetJobRecRequest {
    return {
      projectId: isSet(object.projectId) ? globalThis.String(object.projectId) : "",
      specName: isSet(object.specName) ? globalThis.String(object.specName) : "",
      jobId: isSet(object.jobId) ? globalThis.String(object.jobId) : "",
    };
  },

  toJSON(message: GetJobRecRequest): unknown {
    const obj: any = {};
    if (message.projectId !== "") {
      obj.projectId = message.projectId;
    }
    if (message.specName !== "") {
      obj.specName = message.specName;
    }
    if (message.jobId !== "") {
      obj.jobId = message.jobId;
    }
    return obj;
  },

  create(base?: DeepPartial<GetJobRecRequest>): GetJobRecRequest {
    return GetJobRecRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetJobRecRequest>): GetJobRecRequest {
    const message = createBaseGetJobRecRequest();
    message.projectId = object.projectId ?? "";
    message.specName = object.specName ?? "";
    message.jobId = object.jobId ?? "";
    return message;
  },
};

function createBaseJobRecAndStatus(): JobRecAndStatus {
  return { rec: undefined, status: "" };
}

export const JobRecAndStatus = {
  encode(message: JobRecAndStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rec !== undefined) {
      JobRec.encode(message.rec, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== "") {
      writer.uint32(18).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JobRecAndStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJobRecAndStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rec = JobRec.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.status = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JobRecAndStatus {
    return {
      rec: isSet(object.rec) ? JobRec.fromJSON(object.rec) : undefined,
      status: isSet(object.status) ? globalThis.String(object.status) : "",
    };
  },

  toJSON(message: JobRecAndStatus): unknown {
    const obj: any = {};
    if (message.rec !== undefined) {
      obj.rec = JobRec.toJSON(message.rec);
    }
    if (message.status !== "") {
      obj.status = message.status;
    }
    return obj;
  },

  create(base?: DeepPartial<JobRecAndStatus>): JobRecAndStatus {
    return JobRecAndStatus.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<JobRecAndStatus>): JobRecAndStatus {
    const message = createBaseJobRecAndStatus();
    message.rec = (object.rec !== undefined && object.rec !== null) ? JobRec.fromPartial(object.rec) : undefined;
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseGetJobRecResponse(): GetJobRecResponse {
  return { rec: undefined, null_response: undefined };
}

export const GetJobRecResponse = {
  encode(message: GetJobRecResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rec !== undefined) {
      JobRecAndStatus.encode(message.rec, writer.uint32(10).fork()).ldelim();
    }
    if (message.null_response !== undefined) {
      Empty.encode(message.null_response, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetJobRecResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetJobRecResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rec = JobRecAndStatus.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.null_response = Empty.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetJobRecResponse {
    return {
      rec: isSet(object.rec) ? JobRecAndStatus.fromJSON(object.rec) : undefined,
      null_response: isSet(object.null_response) ? Empty.fromJSON(object.null_response) : undefined,
    };
  },

  toJSON(message: GetJobRecResponse): unknown {
    const obj: any = {};
    if (message.rec !== undefined) {
      obj.rec = JobRecAndStatus.toJSON(message.rec);
    }
    if (message.null_response !== undefined) {
      obj.null_response = Empty.toJSON(message.null_response);
    }
    return obj;
  },

  create(base?: DeepPartial<GetJobRecResponse>): GetJobRecResponse {
    return GetJobRecResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetJobRecResponse>): GetJobRecResponse {
    const message = createBaseGetJobRecResponse();
    message.rec = (object.rec !== undefined && object.rec !== null)
      ? JobRecAndStatus.fromPartial(object.rec)
      : undefined;
    message.null_response = (object.null_response !== undefined && object.null_response !== null)
      ? Empty.fromPartial(object.null_response)
      : undefined;
    return message;
  },
};

function createBaseGetZZJobTestRequest(): GetZZJobTestRequest {
  return { id: "" };
}

export const GetZZJobTestRequest = {
  encode(message: GetZZJobTestRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetZZJobTestRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetZZJobTestRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetZZJobTestRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: GetZZJobTestRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create(base?: DeepPartial<GetZZJobTestRequest>): GetZZJobTestRequest {
    return GetZZJobTestRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetZZJobTestRequest>): GetZZJobTestRequest {
    const message = createBaseGetZZJobTestRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetZZJobTestResponse(): GetZZJobTestResponse {
  return { projectId: "", pipeName: "", jobId: "" };
}

export const GetZZJobTestResponse = {
  encode(message: GetZZJobTestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    if (message.pipeName !== "") {
      writer.uint32(18).string(message.pipeName);
    }
    if (message.jobId !== "") {
      writer.uint32(26).string(message.jobId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetZZJobTestResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetZZJobTestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pipeName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.jobId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetZZJobTestResponse {
    return {
      projectId: isSet(object.projectId) ? globalThis.String(object.projectId) : "",
      pipeName: isSet(object.pipeName) ? globalThis.String(object.pipeName) : "",
      jobId: isSet(object.jobId) ? globalThis.String(object.jobId) : "",
    };
  },

  toJSON(message: GetZZJobTestResponse): unknown {
    const obj: any = {};
    if (message.projectId !== "") {
      obj.projectId = message.projectId;
    }
    if (message.pipeName !== "") {
      obj.pipeName = message.pipeName;
    }
    if (message.jobId !== "") {
      obj.jobId = message.jobId;
    }
    return obj;
  },

  create(base?: DeepPartial<GetZZJobTestResponse>): GetZZJobTestResponse {
    return GetZZJobTestResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetZZJobTestResponse>): GetZZJobTestResponse {
    const message = createBaseGetZZJobTestResponse();
    message.projectId = object.projectId ?? "";
    message.pipeName = object.pipeName ?? "";
    message.jobId = object.jobId ?? "";
    return message;
  },
};

function createBaseEnsureStreamRecRequest(): EnsureStreamRecRequest {
  return { project_id: "", stream_id: "" };
}

export const EnsureStreamRecRequest = {
  encode(message: EnsureStreamRecRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.project_id !== "") {
      writer.uint32(10).string(message.project_id);
    }
    if (message.stream_id !== "") {
      writer.uint32(18).string(message.stream_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EnsureStreamRecRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnsureStreamRecRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.project_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.stream_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EnsureStreamRecRequest {
    return {
      project_id: isSet(object.project_id) ? globalThis.String(object.project_id) : "",
      stream_id: isSet(object.stream_id) ? globalThis.String(object.stream_id) : "",
    };
  },

  toJSON(message: EnsureStreamRecRequest): unknown {
    const obj: any = {};
    if (message.project_id !== "") {
      obj.project_id = message.project_id;
    }
    if (message.stream_id !== "") {
      obj.stream_id = message.stream_id;
    }
    return obj;
  },

  create(base?: DeepPartial<EnsureStreamRecRequest>): EnsureStreamRecRequest {
    return EnsureStreamRecRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<EnsureStreamRecRequest>): EnsureStreamRecRequest {
    const message = createBaseEnsureStreamRecRequest();
    message.project_id = object.project_id ?? "";
    message.stream_id = object.stream_id ?? "";
    return message;
  },
};

function createBaseEnsureJobAndStatusAndConnectorRecsRequest(): EnsureJobAndStatusAndConnectorRecsRequest {
  return {
    projectId: "",
    specName: "",
    jobId: "",
    jobOptionsStr: "",
    parentJobId: undefined,
    uniqueSpecLabel: undefined,
    inputStreamIdOverridesByTag: {},
    outputStreamIdOverridesByTag: {},
  };
}

export const EnsureJobAndStatusAndConnectorRecsRequest = {
  encode(message: EnsureJobAndStatusAndConnectorRecsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    if (message.specName !== "") {
      writer.uint32(18).string(message.specName);
    }
    if (message.jobId !== "") {
      writer.uint32(26).string(message.jobId);
    }
    if (message.jobOptionsStr !== "") {
      writer.uint32(34).string(message.jobOptionsStr);
    }
    if (message.parentJobId !== undefined) {
      writer.uint32(42).string(message.parentJobId);
    }
    if (message.uniqueSpecLabel !== undefined) {
      writer.uint32(50).string(message.uniqueSpecLabel);
    }
    Object.entries(message.inputStreamIdOverridesByTag).forEach(([key, value]) => {
      EnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry.encode(
        { key: key as any, value },
        writer.uint32(58).fork(),
      ).ldelim();
    });
    Object.entries(message.outputStreamIdOverridesByTag).forEach(([key, value]) => {
      EnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry.encode(
        { key: key as any, value },
        writer.uint32(66).fork(),
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EnsureJobAndStatusAndConnectorRecsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnsureJobAndStatusAndConnectorRecsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.specName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.jobId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.jobOptionsStr = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.parentJobId = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.uniqueSpecLabel = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          const entry7 = EnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry.decode(
            reader,
            reader.uint32(),
          );
          if (entry7.value !== undefined) {
            message.inputStreamIdOverridesByTag[entry7.key] = entry7.value;
          }
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          const entry8 = EnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry.decode(
            reader,
            reader.uint32(),
          );
          if (entry8.value !== undefined) {
            message.outputStreamIdOverridesByTag[entry8.key] = entry8.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EnsureJobAndStatusAndConnectorRecsRequest {
    return {
      projectId: isSet(object.projectId) ? globalThis.String(object.projectId) : "",
      specName: isSet(object.specName) ? globalThis.String(object.specName) : "",
      jobId: isSet(object.jobId) ? globalThis.String(object.jobId) : "",
      jobOptionsStr: isSet(object.jobOptionsStr) ? globalThis.String(object.jobOptionsStr) : "",
      parentJobId: isSet(object.parentJobId) ? globalThis.String(object.parentJobId) : undefined,
      uniqueSpecLabel: isSet(object.uniqueSpecLabel) ? globalThis.String(object.uniqueSpecLabel) : undefined,
      inputStreamIdOverridesByTag: isObject(object.inputStreamIdOverridesByTag)
        ? Object.entries(object.inputStreamIdOverridesByTag).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      outputStreamIdOverridesByTag: isObject(object.outputStreamIdOverridesByTag)
        ? Object.entries(object.outputStreamIdOverridesByTag).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: EnsureJobAndStatusAndConnectorRecsRequest): unknown {
    const obj: any = {};
    if (message.projectId !== "") {
      obj.projectId = message.projectId;
    }
    if (message.specName !== "") {
      obj.specName = message.specName;
    }
    if (message.jobId !== "") {
      obj.jobId = message.jobId;
    }
    if (message.jobOptionsStr !== "") {
      obj.jobOptionsStr = message.jobOptionsStr;
    }
    if (message.parentJobId !== undefined) {
      obj.parentJobId = message.parentJobId;
    }
    if (message.uniqueSpecLabel !== undefined) {
      obj.uniqueSpecLabel = message.uniqueSpecLabel;
    }
    if (message.inputStreamIdOverridesByTag) {
      const entries = Object.entries(message.inputStreamIdOverridesByTag);
      if (entries.length > 0) {
        obj.inputStreamIdOverridesByTag = {};
        entries.forEach(([k, v]) => {
          obj.inputStreamIdOverridesByTag[k] = v;
        });
      }
    }
    if (message.outputStreamIdOverridesByTag) {
      const entries = Object.entries(message.outputStreamIdOverridesByTag);
      if (entries.length > 0) {
        obj.outputStreamIdOverridesByTag = {};
        entries.forEach(([k, v]) => {
          obj.outputStreamIdOverridesByTag[k] = v;
        });
      }
    }
    return obj;
  },

  create(base?: DeepPartial<EnsureJobAndStatusAndConnectorRecsRequest>): EnsureJobAndStatusAndConnectorRecsRequest {
    return EnsureJobAndStatusAndConnectorRecsRequest.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<EnsureJobAndStatusAndConnectorRecsRequest>,
  ): EnsureJobAndStatusAndConnectorRecsRequest {
    const message = createBaseEnsureJobAndStatusAndConnectorRecsRequest();
    message.projectId = object.projectId ?? "";
    message.specName = object.specName ?? "";
    message.jobId = object.jobId ?? "";
    message.jobOptionsStr = object.jobOptionsStr ?? "";
    message.parentJobId = object.parentJobId ?? undefined;
    message.uniqueSpecLabel = object.uniqueSpecLabel ?? undefined;
    message.inputStreamIdOverridesByTag = Object.entries(object.inputStreamIdOverridesByTag ?? {}).reduce<
      { [key: string]: string }
    >((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    message.outputStreamIdOverridesByTag = Object.entries(object.outputStreamIdOverridesByTag ?? {}).reduce<
      { [key: string]: string }
    >((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseEnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry(): EnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry {
  return { key: "", value: "" };
}

export const EnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry = {
  encode(
    message: EnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): EnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: EnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create(
    base?: DeepPartial<EnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry>,
  ): EnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry {
    return EnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<EnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry>,
  ): EnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry {
    const message = createBaseEnsureJobAndStatusAndConnectorRecsRequest_InputStreamIdOverridesByTagEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseEnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry(): EnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry {
  return { key: "", value: "" };
}

export const EnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry = {
  encode(
    message: EnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): EnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: EnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create(
    base?: DeepPartial<EnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry>,
  ): EnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry {
    return EnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<EnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry>,
  ): EnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry {
    const message = createBaseEnsureJobAndStatusAndConnectorRecsRequest_OutputStreamIdOverridesByTagEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseGetJobDatapointsRequest(): GetJobDatapointsRequest {
  return { projectId: "", specName: "", jobId: "", key: "", ioType: 0, order: undefined, limit: undefined };
}

export const GetJobDatapointsRequest = {
  encode(message: GetJobDatapointsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    if (message.specName !== "") {
      writer.uint32(18).string(message.specName);
    }
    if (message.jobId !== "") {
      writer.uint32(26).string(message.jobId);
    }
    if (message.key !== "") {
      writer.uint32(34).string(message.key);
    }
    if (message.ioType !== 0) {
      writer.uint32(40).int32(message.ioType);
    }
    if (message.order !== undefined) {
      writer.uint32(56).int32(message.order);
    }
    if (message.limit !== undefined) {
      writer.uint32(64).int32(message.limit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetJobDatapointsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetJobDatapointsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.specName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.jobId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.key = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.ioType = reader.int32() as any;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.order = reader.int32() as any;
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.limit = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetJobDatapointsRequest {
    return {
      projectId: isSet(object.projectId) ? globalThis.String(object.projectId) : "",
      specName: isSet(object.specName) ? globalThis.String(object.specName) : "",
      jobId: isSet(object.jobId) ? globalThis.String(object.jobId) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      ioType: isSet(object.ioType) ? connectorTypeFromJSON(object.ioType) : 0,
      order: isSet(object.order) ? orderFromJSON(object.order) : undefined,
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : undefined,
    };
  },

  toJSON(message: GetJobDatapointsRequest): unknown {
    const obj: any = {};
    if (message.projectId !== "") {
      obj.projectId = message.projectId;
    }
    if (message.specName !== "") {
      obj.specName = message.specName;
    }
    if (message.jobId !== "") {
      obj.jobId = message.jobId;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.ioType !== 0) {
      obj.ioType = connectorTypeToJSON(message.ioType);
    }
    if (message.order !== undefined) {
      obj.order = orderToJSON(message.order);
    }
    if (message.limit !== undefined) {
      obj.limit = Math.round(message.limit);
    }
    return obj;
  },

  create(base?: DeepPartial<GetJobDatapointsRequest>): GetJobDatapointsRequest {
    return GetJobDatapointsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetJobDatapointsRequest>): GetJobDatapointsRequest {
    const message = createBaseGetJobDatapointsRequest();
    message.projectId = object.projectId ?? "";
    message.specName = object.specName ?? "";
    message.jobId = object.jobId ?? "";
    message.key = object.key ?? "";
    message.ioType = object.ioType ?? 0;
    message.order = object.order ?? undefined;
    message.limit = object.limit ?? undefined;
    return message;
  },
};

function createBaseDatapointRecord(): DatapointRecord {
  return { datapointId: "", dataStr: "" };
}

export const DatapointRecord = {
  encode(message: DatapointRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.datapointId !== "") {
      writer.uint32(10).string(message.datapointId);
    }
    if (message.dataStr !== "") {
      writer.uint32(18).string(message.dataStr);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DatapointRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDatapointRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.datapointId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.dataStr = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DatapointRecord {
    return {
      datapointId: isSet(object.datapointId) ? globalThis.String(object.datapointId) : "",
      dataStr: isSet(object.dataStr) ? globalThis.String(object.dataStr) : "",
    };
  },

  toJSON(message: DatapointRecord): unknown {
    const obj: any = {};
    if (message.datapointId !== "") {
      obj.datapointId = message.datapointId;
    }
    if (message.dataStr !== "") {
      obj.dataStr = message.dataStr;
    }
    return obj;
  },

  create(base?: DeepPartial<DatapointRecord>): DatapointRecord {
    return DatapointRecord.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<DatapointRecord>): DatapointRecord {
    const message = createBaseDatapointRecord();
    message.datapointId = object.datapointId ?? "";
    message.dataStr = object.dataStr ?? "";
    return message;
  },
};

function createBaseGetJobDatapointsResponse(): GetJobDatapointsResponse {
  return { points: [] };
}

export const GetJobDatapointsResponse = {
  encode(message: GetJobDatapointsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.points) {
      DatapointRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetJobDatapointsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetJobDatapointsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.points.push(DatapointRecord.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetJobDatapointsResponse {
    return {
      points: globalThis.Array.isArray(object?.points)
        ? object.points.map((e: any) => DatapointRecord.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetJobDatapointsResponse): unknown {
    const obj: any = {};
    if (message.points?.length) {
      obj.points = message.points.map((e) => DatapointRecord.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<GetJobDatapointsResponse>): GetJobDatapointsResponse {
    return GetJobDatapointsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetJobDatapointsResponse>): GetJobDatapointsResponse {
    const message = createBaseGetJobDatapointsResponse();
    message.points = object.points?.map((e) => DatapointRecord.fromPartial(e)) || [];
    return message;
  },
};

function createBaseJobInfo(): JobInfo {
  return { jobId: "", outputTag: "" };
}

export const JobInfo = {
  encode(message: JobInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.jobId !== "") {
      writer.uint32(10).string(message.jobId);
    }
    if (message.outputTag !== "") {
      writer.uint32(18).string(message.outputTag);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JobInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJobInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.jobId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.outputTag = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JobInfo {
    return {
      jobId: isSet(object.jobId) ? globalThis.String(object.jobId) : "",
      outputTag: isSet(object.outputTag) ? globalThis.String(object.outputTag) : "",
    };
  },

  toJSON(message: JobInfo): unknown {
    const obj: any = {};
    if (message.jobId !== "") {
      obj.jobId = message.jobId;
    }
    if (message.outputTag !== "") {
      obj.outputTag = message.outputTag;
    }
    return obj;
  },

  create(base?: DeepPartial<JobInfo>): JobInfo {
    return JobInfo.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<JobInfo>): JobInfo {
    const message = createBaseJobInfo();
    message.jobId = object.jobId ?? "";
    message.outputTag = object.outputTag ?? "";
    return message;
  },
};

function createBaseAddDatapointRequest(): AddDatapointRequest {
  return { projectId: "", streamId: "", datapointId: "", dataStr: "", jobInfo: undefined };
}

export const AddDatapointRequest = {
  encode(message: AddDatapointRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    if (message.streamId !== "") {
      writer.uint32(18).string(message.streamId);
    }
    if (message.datapointId !== "") {
      writer.uint32(26).string(message.datapointId);
    }
    if (message.dataStr !== "") {
      writer.uint32(34).string(message.dataStr);
    }
    if (message.jobInfo !== undefined) {
      JobInfo.encode(message.jobInfo, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddDatapointRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddDatapointRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.streamId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.datapointId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.dataStr = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.jobInfo = JobInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddDatapointRequest {
    return {
      projectId: isSet(object.projectId) ? globalThis.String(object.projectId) : "",
      streamId: isSet(object.streamId) ? globalThis.String(object.streamId) : "",
      datapointId: isSet(object.datapointId) ? globalThis.String(object.datapointId) : "",
      dataStr: isSet(object.dataStr) ? globalThis.String(object.dataStr) : "",
      jobInfo: isSet(object.jobInfo) ? JobInfo.fromJSON(object.jobInfo) : undefined,
    };
  },

  toJSON(message: AddDatapointRequest): unknown {
    const obj: any = {};
    if (message.projectId !== "") {
      obj.projectId = message.projectId;
    }
    if (message.streamId !== "") {
      obj.streamId = message.streamId;
    }
    if (message.datapointId !== "") {
      obj.datapointId = message.datapointId;
    }
    if (message.dataStr !== "") {
      obj.dataStr = message.dataStr;
    }
    if (message.jobInfo !== undefined) {
      obj.jobInfo = JobInfo.toJSON(message.jobInfo);
    }
    return obj;
  },

  create(base?: DeepPartial<AddDatapointRequest>): AddDatapointRequest {
    return AddDatapointRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AddDatapointRequest>): AddDatapointRequest {
    const message = createBaseAddDatapointRequest();
    message.projectId = object.projectId ?? "";
    message.streamId = object.streamId ?? "";
    message.datapointId = object.datapointId ?? "";
    message.dataStr = object.dataStr ?? "";
    message.jobInfo = (object.jobInfo !== undefined && object.jobInfo !== null)
      ? JobInfo.fromPartial(object.jobInfo)
      : undefined;
    return message;
  },
};

function createBaseAddDatapointResponse(): AddDatapointResponse {
  return { datapointId: "" };
}

export const AddDatapointResponse = {
  encode(message: AddDatapointResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.datapointId !== "") {
      writer.uint32(10).string(message.datapointId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddDatapointResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddDatapointResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.datapointId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddDatapointResponse {
    return { datapointId: isSet(object.datapointId) ? globalThis.String(object.datapointId) : "" };
  },

  toJSON(message: AddDatapointResponse): unknown {
    const obj: any = {};
    if (message.datapointId !== "") {
      obj.datapointId = message.datapointId;
    }
    return obj;
  },

  create(base?: DeepPartial<AddDatapointResponse>): AddDatapointResponse {
    return AddDatapointResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AddDatapointResponse>): AddDatapointResponse {
    const message = createBaseAddDatapointResponse();
    message.datapointId = object.datapointId ?? "";
    return message;
  },
};

function createBaseGetJobStreamConnectorRecsRequest(): GetJobStreamConnectorRecsRequest {
  return { projectId: "", jobId: "", key: undefined, connectorType: undefined };
}

export const GetJobStreamConnectorRecsRequest = {
  encode(message: GetJobStreamConnectorRecsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    if (message.jobId !== "") {
      writer.uint32(18).string(message.jobId);
    }
    if (message.key !== undefined) {
      writer.uint32(26).string(message.key);
    }
    if (message.connectorType !== undefined) {
      writer.uint32(32).int32(message.connectorType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetJobStreamConnectorRecsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetJobStreamConnectorRecsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.jobId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.key = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.connectorType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetJobStreamConnectorRecsRequest {
    return {
      projectId: isSet(object.projectId) ? globalThis.String(object.projectId) : "",
      jobId: isSet(object.jobId) ? globalThis.String(object.jobId) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : undefined,
      connectorType: isSet(object.connectorType) ? connectorTypeFromJSON(object.connectorType) : undefined,
    };
  },

  toJSON(message: GetJobStreamConnectorRecsRequest): unknown {
    const obj: any = {};
    if (message.projectId !== "") {
      obj.projectId = message.projectId;
    }
    if (message.jobId !== "") {
      obj.jobId = message.jobId;
    }
    if (message.key !== undefined) {
      obj.key = message.key;
    }
    if (message.connectorType !== undefined) {
      obj.connectorType = connectorTypeToJSON(message.connectorType);
    }
    return obj;
  },

  create(base?: DeepPartial<GetJobStreamConnectorRecsRequest>): GetJobStreamConnectorRecsRequest {
    return GetJobStreamConnectorRecsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetJobStreamConnectorRecsRequest>): GetJobStreamConnectorRecsRequest {
    const message = createBaseGetJobStreamConnectorRecsRequest();
    message.projectId = object.projectId ?? "";
    message.jobId = object.jobId ?? "";
    message.key = object.key ?? undefined;
    message.connectorType = object.connectorType ?? undefined;
    return message;
  },
};

function createBaseJobStreamConnectorRecord(): JobStreamConnectorRecord {
  return { project_id: "", job_id: "", time_created: undefined, stream_id: "", key: "", connector_type: 0 };
}

export const JobStreamConnectorRecord = {
  encode(message: JobStreamConnectorRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.project_id !== "") {
      writer.uint32(10).string(message.project_id);
    }
    if (message.job_id !== "") {
      writer.uint32(18).string(message.job_id);
    }
    if (message.time_created !== undefined) {
      Timestamp.encode(toTimestamp(message.time_created), writer.uint32(26).fork()).ldelim();
    }
    if (message.stream_id !== "") {
      writer.uint32(34).string(message.stream_id);
    }
    if (message.key !== "") {
      writer.uint32(42).string(message.key);
    }
    if (message.connector_type !== 0) {
      writer.uint32(48).int32(message.connector_type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JobStreamConnectorRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJobStreamConnectorRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.project_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.job_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.time_created = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.stream_id = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.key = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.connector_type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JobStreamConnectorRecord {
    return {
      project_id: isSet(object.project_id) ? globalThis.String(object.project_id) : "",
      job_id: isSet(object.job_id) ? globalThis.String(object.job_id) : "",
      time_created: isSet(object.time_created) ? fromJsonTimestamp(object.time_created) : undefined,
      stream_id: isSet(object.stream_id) ? globalThis.String(object.stream_id) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      connector_type: isSet(object.connector_type) ? connectorTypeFromJSON(object.connector_type) : 0,
    };
  },

  toJSON(message: JobStreamConnectorRecord): unknown {
    const obj: any = {};
    if (message.project_id !== "") {
      obj.project_id = message.project_id;
    }
    if (message.job_id !== "") {
      obj.job_id = message.job_id;
    }
    if (message.time_created !== undefined) {
      obj.time_created = message.time_created.toISOString();
    }
    if (message.stream_id !== "") {
      obj.stream_id = message.stream_id;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.connector_type !== 0) {
      obj.connector_type = connectorTypeToJSON(message.connector_type);
    }
    return obj;
  },

  create(base?: DeepPartial<JobStreamConnectorRecord>): JobStreamConnectorRecord {
    return JobStreamConnectorRecord.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<JobStreamConnectorRecord>): JobStreamConnectorRecord {
    const message = createBaseJobStreamConnectorRecord();
    message.project_id = object.project_id ?? "";
    message.job_id = object.job_id ?? "";
    message.time_created = object.time_created ?? undefined;
    message.stream_id = object.stream_id ?? "";
    message.key = object.key ?? "";
    message.connector_type = object.connector_type ?? 0;
    return message;
  },
};

function createBaseGetJobStreamConnectorRecsResponse(): GetJobStreamConnectorRecsResponse {
  return { records: [] };
}

export const GetJobStreamConnectorRecsResponse = {
  encode(message: GetJobStreamConnectorRecsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.records) {
      JobStreamConnectorRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetJobStreamConnectorRecsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetJobStreamConnectorRecsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.records.push(JobStreamConnectorRecord.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetJobStreamConnectorRecsResponse {
    return {
      records: globalThis.Array.isArray(object?.records)
        ? object.records.map((e: any) => JobStreamConnectorRecord.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetJobStreamConnectorRecsResponse): unknown {
    const obj: any = {};
    if (message.records?.length) {
      obj.records = message.records.map((e) => JobStreamConnectorRecord.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<GetJobStreamConnectorRecsResponse>): GetJobStreamConnectorRecsResponse {
    return GetJobStreamConnectorRecsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetJobStreamConnectorRecsResponse>): GetJobStreamConnectorRecsResponse {
    const message = createBaseGetJobStreamConnectorRecsResponse();
    message.records = object.records?.map((e) => JobStreamConnectorRecord.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAppendJobStatusRecRequest(): AppendJobStatusRecRequest {
  return { projectId: "", specName: "", jobId: "", jobStatus: "" };
}

export const AppendJobStatusRecRequest = {
  encode(message: AppendJobStatusRecRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    if (message.specName !== "") {
      writer.uint32(18).string(message.specName);
    }
    if (message.jobId !== "") {
      writer.uint32(26).string(message.jobId);
    }
    if (message.jobStatus !== "") {
      writer.uint32(34).string(message.jobStatus);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AppendJobStatusRecRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAppendJobStatusRecRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.specName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.jobId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.jobStatus = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AppendJobStatusRecRequest {
    return {
      projectId: isSet(object.projectId) ? globalThis.String(object.projectId) : "",
      specName: isSet(object.specName) ? globalThis.String(object.specName) : "",
      jobId: isSet(object.jobId) ? globalThis.String(object.jobId) : "",
      jobStatus: isSet(object.jobStatus) ? globalThis.String(object.jobStatus) : "",
    };
  },

  toJSON(message: AppendJobStatusRecRequest): unknown {
    const obj: any = {};
    if (message.projectId !== "") {
      obj.projectId = message.projectId;
    }
    if (message.specName !== "") {
      obj.specName = message.specName;
    }
    if (message.jobId !== "") {
      obj.jobId = message.jobId;
    }
    if (message.jobStatus !== "") {
      obj.jobStatus = message.jobStatus;
    }
    return obj;
  },

  create(base?: DeepPartial<AppendJobStatusRecRequest>): AppendJobStatusRecRequest {
    return AppendJobStatusRecRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AppendJobStatusRecRequest>): AppendJobStatusRecRequest {
    const message = createBaseAppendJobStatusRecRequest();
    message.projectId = object.projectId ?? "";
    message.specName = object.specName ?? "";
    message.jobId = object.jobId ?? "";
    message.jobStatus = object.jobStatus ?? "";
    return message;
  },
};

export type DBServiceDefinition = typeof DBServiceDefinition;
export const DBServiceDefinition = {
  name: "DBService",
  fullName: "livestack.DBService",
  methods: {
    getJobRec: {
      name: "GetJobRec",
      requestType: GetJobRecRequest,
      requestStream: false,
      responseType: GetJobRecResponse,
      responseStream: false,
      options: {},
    },
    ensureStreamRec: {
      name: "EnsureStreamRec",
      requestType: EnsureStreamRecRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    ensureJobAndStatusAndConnectorRecs: {
      name: "EnsureJobAndStatusAndConnectorRecs",
      requestType: EnsureJobAndStatusAndConnectorRecsRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    getJobDatapoints: {
      name: "GetJobDatapoints",
      requestType: GetJobDatapointsRequest,
      requestStream: false,
      responseType: GetJobDatapointsResponse,
      responseStream: false,
      options: {},
    },
    addDatapoint: {
      name: "AddDatapoint",
      requestType: AddDatapointRequest,
      requestStream: false,
      responseType: AddDatapointResponse,
      responseStream: false,
      options: {},
    },
    getJobStreamConnectorRecs: {
      name: "GetJobStreamConnectorRecs",
      requestType: GetJobStreamConnectorRecsRequest,
      requestStream: false,
      responseType: GetJobStreamConnectorRecsResponse,
      responseStream: false,
      options: {},
    },
    appendJobStatusRec: {
      name: "AppendJobStatusRec",
      requestType: AppendJobStatusRecRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface DBServiceImplementation<CallContextExt = {}> {
  getJobRec(request: GetJobRecRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetJobRecResponse>>;
  ensureStreamRec(request: EnsureStreamRecRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
  ensureJobAndStatusAndConnectorRecs(
    request: EnsureJobAndStatusAndConnectorRecsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<Empty>>;
  getJobDatapoints(
    request: GetJobDatapointsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<GetJobDatapointsResponse>>;
  addDatapoint(
    request: AddDatapointRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AddDatapointResponse>>;
  getJobStreamConnectorRecs(
    request: GetJobStreamConnectorRecsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<GetJobStreamConnectorRecsResponse>>;
  appendJobStatusRec(
    request: AppendJobStatusRecRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<Empty>>;
}

export interface DBServiceClient<CallOptionsExt = {}> {
  getJobRec(request: DeepPartial<GetJobRecRequest>, options?: CallOptions & CallOptionsExt): Promise<GetJobRecResponse>;
  ensureStreamRec(request: DeepPartial<EnsureStreamRecRequest>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  ensureJobAndStatusAndConnectorRecs(
    request: DeepPartial<EnsureJobAndStatusAndConnectorRecsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Empty>;
  getJobDatapoints(
    request: DeepPartial<GetJobDatapointsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<GetJobDatapointsResponse>;
  addDatapoint(
    request: DeepPartial<AddDatapointRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AddDatapointResponse>;
  getJobStreamConnectorRecs(
    request: DeepPartial<GetJobStreamConnectorRecsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<GetJobStreamConnectorRecsResponse>;
  appendJobStatusRec(
    request: DeepPartial<AppendJobStatusRecRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Empty>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
