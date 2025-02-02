import { Types } from "mongoose";

export enum statusEnum {
  Send = "send",
  Ignore = "ignore",
}

export interface connectionRequest extends Document {
  fromRequest: Types.ObjectId;
  toRequest: Types.ObjectId;
  status: statusEnum;
}
