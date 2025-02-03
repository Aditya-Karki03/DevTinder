import mongoose, { connection } from "mongoose";
import {
  connectionRequest,
  statusEnum,
} from "../interface/connectionInterface";

const connectionSchema = new mongoose.Schema<connectionRequest>(
  {
    fromRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

//arrow function won't work because this keyword does not work in the arrow function
connectionSchema.pre("save", function (next) {
  if (this.toRequest == this.fromRequest) {
    throw new Error("You cannot send connection request to yourself");
  }
  next();
});

connectionSchema.pre("save", function () {
  if (this.fromRequest.equals(this.toRequest)) {
    throw new Error("Cannot send connection request to yourself");
  }
});

const Connection = mongoose.model("Connection", connectionSchema);
export { Connection };
