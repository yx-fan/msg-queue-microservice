// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               v3.19.1
// source: messageQueue.proto

/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import Long = require("long");

export const protobufPackage = "messageQueue";

/** Define the message structure */
export interface Message {
  /** The unique identifier of the message */
  id: string;
  /** The body of the message */
  body: string;
  /** The topic of the message */
  topic: string;
  /** The timestamp of the message */
  timestamp: number;
}

/** Point-to-point mode request and response */
export interface PublishRequest {
  /** The topic of the message */
  topic: string;
  /** The message to be published */
  message: Message | undefined;
}

export interface PublishResponse {
  /** The success status of the publish operation */
  success: boolean;
  /** The message of the response */
  message: string;
}

export interface SubscribeRequest {
  /** The topic to subscribe to */
  topic: string;
}

export interface SubscribeResponse {
  /** The success status of the subscribe operation */
  success: boolean;
  /** The message of the response */
  message: string;
}

export interface UnsubscribeRequest {
  /** The topic to unsubscribe from */
  topic: string;
}

export interface UnsubscribeResponse {
  /** The success status of the unsubscribe operation */
  success: boolean;
  /** The message of the response */
  message: string;
}

/** Fanout mode request and response */
export interface FanoutPublishRequest {
  /** The exchange name for fanout mode */
  exchangeName: string;
  /** The message to be published */
  message: Message | undefined;
}

export interface FanoutPublishResponse {
  /** The success status of the publish operation */
  success: boolean;
  /** The message of the response */
  message: string;
}

export interface FanoutSubscribeRequest {
  /** The exchange name to subscribe to */
  exchangeName: string;
}

export interface FanoutSubscribeResponse {
  /** The success status of the subscribe operation */
  success: boolean;
  /** The message of the response */
  message: string;
}

export interface FanoutUnsubscribeRequest {
  /** The exchange name to unsubscribe from */
  exchangeName: string;
}

export interface FanoutUnsubscribeResponse {
  /** The success status of the unsubscribe operation */
  success: boolean;
  /** The message of the response */
  message: string;
}

function createBaseMessage(): Message {
  return { id: "", body: "", topic: "", timestamp: 0 };
}

export const Message = {
  encode(message: Message, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.body !== "") {
      writer.uint32(18).string(message.body);
    }
    if (message.topic !== "") {
      writer.uint32(26).string(message.topic);
    }
    if (message.timestamp !== 0) {
      writer.uint32(32).int64(message.timestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Message {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.body = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.topic = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.timestamp = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Message {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      body: isSet(object.body) ? globalThis.String(object.body) : "",
      topic: isSet(object.topic) ? globalThis.String(object.topic) : "",
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.body !== "") {
      obj.body = message.body;
    }
    if (message.topic !== "") {
      obj.topic = message.topic;
    }
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Message>, I>>(base?: I): Message {
    return Message.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.id = object.id ?? "";
    message.body = object.body ?? "";
    message.topic = object.topic ?? "";
    message.timestamp = object.timestamp ?? 0;
    return message;
  },
};

function createBasePublishRequest(): PublishRequest {
  return { topic: "", message: undefined };
}

export const PublishRequest = {
  encode(message: PublishRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.topic !== "") {
      writer.uint32(10).string(message.topic);
    }
    if (message.message !== undefined) {
      Message.encode(message.message, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublishRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topic = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = Message.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PublishRequest {
    return {
      topic: isSet(object.topic) ? globalThis.String(object.topic) : "",
      message: isSet(object.message) ? Message.fromJSON(object.message) : undefined,
    };
  },

  toJSON(message: PublishRequest): unknown {
    const obj: any = {};
    if (message.topic !== "") {
      obj.topic = message.topic;
    }
    if (message.message !== undefined) {
      obj.message = Message.toJSON(message.message);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PublishRequest>, I>>(base?: I): PublishRequest {
    return PublishRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PublishRequest>, I>>(object: I): PublishRequest {
    const message = createBasePublishRequest();
    message.topic = object.topic ?? "";
    message.message = (object.message !== undefined && object.message !== null)
      ? Message.fromPartial(object.message)
      : undefined;
    return message;
  },
};

function createBasePublishResponse(): PublishResponse {
  return { success: false, message: "" };
}

export const PublishResponse = {
  encode(message: PublishResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublishResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PublishResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: PublishResponse): unknown {
    const obj: any = {};
    if (message.success !== false) {
      obj.success = message.success;
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PublishResponse>, I>>(base?: I): PublishResponse {
    return PublishResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PublishResponse>, I>>(object: I): PublishResponse {
    const message = createBasePublishResponse();
    message.success = object.success ?? false;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseSubscribeRequest(): SubscribeRequest {
  return { topic: "" };
}

export const SubscribeRequest = {
  encode(message: SubscribeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.topic !== "") {
      writer.uint32(10).string(message.topic);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscribeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topic = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequest {
    return { topic: isSet(object.topic) ? globalThis.String(object.topic) : "" };
  },

  toJSON(message: SubscribeRequest): unknown {
    const obj: any = {};
    if (message.topic !== "") {
      obj.topic = message.topic;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequest>, I>>(base?: I): SubscribeRequest {
    return SubscribeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeRequest>, I>>(object: I): SubscribeRequest {
    const message = createBaseSubscribeRequest();
    message.topic = object.topic ?? "";
    return message;
  },
};

function createBaseSubscribeResponse(): SubscribeResponse {
  return { success: false, message: "" };
}

export const SubscribeResponse = {
  encode(message: SubscribeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscribeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: SubscribeResponse): unknown {
    const obj: any = {};
    if (message.success !== false) {
      obj.success = message.success;
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeResponse>, I>>(base?: I): SubscribeResponse {
    return SubscribeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeResponse>, I>>(object: I): SubscribeResponse {
    const message = createBaseSubscribeResponse();
    message.success = object.success ?? false;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseUnsubscribeRequest(): UnsubscribeRequest {
  return { topic: "" };
}

export const UnsubscribeRequest = {
  encode(message: UnsubscribeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.topic !== "") {
      writer.uint32(10).string(message.topic);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnsubscribeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnsubscribeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topic = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UnsubscribeRequest {
    return { topic: isSet(object.topic) ? globalThis.String(object.topic) : "" };
  },

  toJSON(message: UnsubscribeRequest): unknown {
    const obj: any = {};
    if (message.topic !== "") {
      obj.topic = message.topic;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UnsubscribeRequest>, I>>(base?: I): UnsubscribeRequest {
    return UnsubscribeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UnsubscribeRequest>, I>>(object: I): UnsubscribeRequest {
    const message = createBaseUnsubscribeRequest();
    message.topic = object.topic ?? "";
    return message;
  },
};

function createBaseUnsubscribeResponse(): UnsubscribeResponse {
  return { success: false, message: "" };
}

export const UnsubscribeResponse = {
  encode(message: UnsubscribeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnsubscribeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnsubscribeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UnsubscribeResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: UnsubscribeResponse): unknown {
    const obj: any = {};
    if (message.success !== false) {
      obj.success = message.success;
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UnsubscribeResponse>, I>>(base?: I): UnsubscribeResponse {
    return UnsubscribeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UnsubscribeResponse>, I>>(object: I): UnsubscribeResponse {
    const message = createBaseUnsubscribeResponse();
    message.success = object.success ?? false;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseFanoutPublishRequest(): FanoutPublishRequest {
  return { exchangeName: "", message: undefined };
}

export const FanoutPublishRequest = {
  encode(message: FanoutPublishRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.exchangeName !== "") {
      writer.uint32(10).string(message.exchangeName);
    }
    if (message.message !== undefined) {
      Message.encode(message.message, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FanoutPublishRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFanoutPublishRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.exchangeName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = Message.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FanoutPublishRequest {
    return {
      exchangeName: isSet(object.exchangeName) ? globalThis.String(object.exchangeName) : "",
      message: isSet(object.message) ? Message.fromJSON(object.message) : undefined,
    };
  },

  toJSON(message: FanoutPublishRequest): unknown {
    const obj: any = {};
    if (message.exchangeName !== "") {
      obj.exchangeName = message.exchangeName;
    }
    if (message.message !== undefined) {
      obj.message = Message.toJSON(message.message);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FanoutPublishRequest>, I>>(base?: I): FanoutPublishRequest {
    return FanoutPublishRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FanoutPublishRequest>, I>>(object: I): FanoutPublishRequest {
    const message = createBaseFanoutPublishRequest();
    message.exchangeName = object.exchangeName ?? "";
    message.message = (object.message !== undefined && object.message !== null)
      ? Message.fromPartial(object.message)
      : undefined;
    return message;
  },
};

function createBaseFanoutPublishResponse(): FanoutPublishResponse {
  return { success: false, message: "" };
}

export const FanoutPublishResponse = {
  encode(message: FanoutPublishResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FanoutPublishResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFanoutPublishResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FanoutPublishResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: FanoutPublishResponse): unknown {
    const obj: any = {};
    if (message.success !== false) {
      obj.success = message.success;
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FanoutPublishResponse>, I>>(base?: I): FanoutPublishResponse {
    return FanoutPublishResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FanoutPublishResponse>, I>>(object: I): FanoutPublishResponse {
    const message = createBaseFanoutPublishResponse();
    message.success = object.success ?? false;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseFanoutSubscribeRequest(): FanoutSubscribeRequest {
  return { exchangeName: "" };
}

export const FanoutSubscribeRequest = {
  encode(message: FanoutSubscribeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.exchangeName !== "") {
      writer.uint32(10).string(message.exchangeName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FanoutSubscribeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFanoutSubscribeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.exchangeName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FanoutSubscribeRequest {
    return { exchangeName: isSet(object.exchangeName) ? globalThis.String(object.exchangeName) : "" };
  },

  toJSON(message: FanoutSubscribeRequest): unknown {
    const obj: any = {};
    if (message.exchangeName !== "") {
      obj.exchangeName = message.exchangeName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FanoutSubscribeRequest>, I>>(base?: I): FanoutSubscribeRequest {
    return FanoutSubscribeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FanoutSubscribeRequest>, I>>(object: I): FanoutSubscribeRequest {
    const message = createBaseFanoutSubscribeRequest();
    message.exchangeName = object.exchangeName ?? "";
    return message;
  },
};

function createBaseFanoutSubscribeResponse(): FanoutSubscribeResponse {
  return { success: false, message: "" };
}

export const FanoutSubscribeResponse = {
  encode(message: FanoutSubscribeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FanoutSubscribeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFanoutSubscribeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FanoutSubscribeResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: FanoutSubscribeResponse): unknown {
    const obj: any = {};
    if (message.success !== false) {
      obj.success = message.success;
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FanoutSubscribeResponse>, I>>(base?: I): FanoutSubscribeResponse {
    return FanoutSubscribeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FanoutSubscribeResponse>, I>>(object: I): FanoutSubscribeResponse {
    const message = createBaseFanoutSubscribeResponse();
    message.success = object.success ?? false;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseFanoutUnsubscribeRequest(): FanoutUnsubscribeRequest {
  return { exchangeName: "" };
}

export const FanoutUnsubscribeRequest = {
  encode(message: FanoutUnsubscribeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.exchangeName !== "") {
      writer.uint32(10).string(message.exchangeName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FanoutUnsubscribeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFanoutUnsubscribeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.exchangeName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FanoutUnsubscribeRequest {
    return { exchangeName: isSet(object.exchangeName) ? globalThis.String(object.exchangeName) : "" };
  },

  toJSON(message: FanoutUnsubscribeRequest): unknown {
    const obj: any = {};
    if (message.exchangeName !== "") {
      obj.exchangeName = message.exchangeName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FanoutUnsubscribeRequest>, I>>(base?: I): FanoutUnsubscribeRequest {
    return FanoutUnsubscribeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FanoutUnsubscribeRequest>, I>>(object: I): FanoutUnsubscribeRequest {
    const message = createBaseFanoutUnsubscribeRequest();
    message.exchangeName = object.exchangeName ?? "";
    return message;
  },
};

function createBaseFanoutUnsubscribeResponse(): FanoutUnsubscribeResponse {
  return { success: false, message: "" };
}

export const FanoutUnsubscribeResponse = {
  encode(message: FanoutUnsubscribeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FanoutUnsubscribeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFanoutUnsubscribeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FanoutUnsubscribeResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: FanoutUnsubscribeResponse): unknown {
    const obj: any = {};
    if (message.success !== false) {
      obj.success = message.success;
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FanoutUnsubscribeResponse>, I>>(base?: I): FanoutUnsubscribeResponse {
    return FanoutUnsubscribeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FanoutUnsubscribeResponse>, I>>(object: I): FanoutUnsubscribeResponse {
    const message = createBaseFanoutUnsubscribeResponse();
    message.success = object.success ?? false;
    message.message = object.message ?? "";
    return message;
  },
};

/** Define the messaging service */
export interface MessagingService {
  Publish(request: PublishRequest): Promise<PublishResponse>;
  Subscribe(request: SubscribeRequest): Observable<Message>;
  Unsubscribe(request: UnsubscribeRequest): Promise<UnsubscribeResponse>;
}

export const MessagingServiceServiceName = "messageQueue.MessagingService";
export class MessagingServiceClientImpl implements MessagingService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MessagingServiceServiceName;
    this.rpc = rpc;
    this.Publish = this.Publish.bind(this);
    this.Subscribe = this.Subscribe.bind(this);
    this.Unsubscribe = this.Unsubscribe.bind(this);
  }
  Publish(request: PublishRequest): Promise<PublishResponse> {
    const data = PublishRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Publish", data);
    return promise.then((data) => PublishResponse.decode(_m0.Reader.create(data)));
  }

  Subscribe(request: SubscribeRequest): Observable<Message> {
    const data = SubscribeRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "Subscribe", data);
    return result.pipe(map((data) => Message.decode(_m0.Reader.create(data))));
  }

  Unsubscribe(request: UnsubscribeRequest): Promise<UnsubscribeResponse> {
    const data = UnsubscribeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Unsubscribe", data);
    return promise.then((data) => UnsubscribeResponse.decode(_m0.Reader.create(data)));
  }
}

/** Define the fanout messaging service */
export interface FanoutMessagingService {
  FanoutPublish(request: FanoutPublishRequest): Promise<FanoutPublishResponse>;
  FanoutSubscribe(request: FanoutSubscribeRequest): Observable<Message>;
  FanoutUnsubscribe(request: FanoutUnsubscribeRequest): Promise<FanoutUnsubscribeResponse>;
}

export const FanoutMessagingServiceServiceName = "messageQueue.FanoutMessagingService";
export class FanoutMessagingServiceClientImpl implements FanoutMessagingService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || FanoutMessagingServiceServiceName;
    this.rpc = rpc;
    this.FanoutPublish = this.FanoutPublish.bind(this);
    this.FanoutSubscribe = this.FanoutSubscribe.bind(this);
    this.FanoutUnsubscribe = this.FanoutUnsubscribe.bind(this);
  }
  FanoutPublish(request: FanoutPublishRequest): Promise<FanoutPublishResponse> {
    const data = FanoutPublishRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "FanoutPublish", data);
    return promise.then((data) => FanoutPublishResponse.decode(_m0.Reader.create(data)));
  }

  FanoutSubscribe(request: FanoutSubscribeRequest): Observable<Message> {
    const data = FanoutSubscribeRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "FanoutSubscribe", data);
    return result.pipe(map((data) => Message.decode(_m0.Reader.create(data))));
  }

  FanoutUnsubscribe(request: FanoutUnsubscribeRequest): Promise<FanoutUnsubscribeResponse> {
    const data = FanoutUnsubscribeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "FanoutUnsubscribe", data);
    return promise.then((data) => FanoutUnsubscribeResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (long.lt(globalThis.Number.MIN_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}