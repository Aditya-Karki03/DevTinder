import mongoose from "mongoose";
import { userInterface, Genders } from "../interface/userInterface";

const userSchema = new mongoose.Schema<userInterface>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: Object.values(Genders),
  },
});
const User = mongoose.model("User", userSchema);
export { User };
