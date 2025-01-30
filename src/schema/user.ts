import mongoose from "mongoose";
import { userInterface, Genders } from "../interface/userInterface";
import { z } from "zod";

const emailValidator = (email: string) => {
  const emailSchema = z.string().email({
    message: "Invalid Email address",
  });
  const { success } = emailSchema.safeParse(email);
  return success;
};

const passwordValidator = (password: string) => {
  const passwordSchema = z.string().min(8, {
    message: "Please enter a strong password",
  });
  const { success } = passwordSchema.safeParse(password);
  return success;
};

//install isValidator npm package which is used for data sanitization purposes
const userSchema = new mongoose.Schema<userInterface>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: passwordValidator,
        message: "Please enter a strong password",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: emailValidator,
        message: "Please fill a valid email address",
      },
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: 18,
      max: 60,
    },
    gender: {
      type: String,
      enum: Object.values(Genders),
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export { User };
