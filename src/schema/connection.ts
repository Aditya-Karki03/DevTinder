import mongoose from "mongoose";
import {
  connectionRequest,
  statusEnum,
} from "../interface/connectionInterface";

const connectionSchema = new mongoose.Schema<connectionRequest>(
  {
    fromRequest: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toRequest: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: statusEnum,
    },
  },
  {
    timestamps: true,
  }
);

const Connection = mongoose.model("Connection", connectionSchema);
export { Connection };
