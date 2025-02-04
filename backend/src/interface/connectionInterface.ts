import { Types } from "mongoose";

export enum statusEnum {
  Send = "send",
  Ignore = "ignore",
  Accept = "accept",
  reject = "reject",
}

export interface connectionRequest extends Document {
  fromRequest: Types.ObjectId;
  toRequest: Types.ObjectId;
  status: statusEnum;
}
