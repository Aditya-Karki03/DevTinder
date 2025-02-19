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

// const passwordValidator = (password: string) => {
//   const passwordSchema = z.string().min(8, {
//     message: "Please enter a strong password",
//   });
//   const { success } = passwordSchema.safeParse(password);
//   return success;
// };

const photoValidator = (url: string) => {
  const validPhotoExtensions = ["jpg", "jpeg", "png", "svg"];
  const urlSchema = z
    .string()
    .url()
    .refine(
      (photo) => {
        const isValid = validPhotoExtensions.filter((ext) => url.endsWith(ext));
        return isValid;
      },
      {
        message: "Only jpg, jpeg, png & svg type imamges supported",
      }
    );
  const { success } = urlSchema.safeParse(url);
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
    // password: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   validate: {
    //     validator: passwordValidator,
    //     message: "Please enter a strong password",
    //   },
    // },
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
    photoUrl: {
      type: String,
      //default value only works if the value provided is undefined, even if null is provided, null is stored
      default:
        "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
      trim: true,
      validate: {
        validator: photoValidator,
        message: "Please upload a valid photo (jpg, jpeg, png,svg)",
      },
    },
    about: {
      type: String,
      trim: true,
      required: [
        true,
        "Please tell briefly tell us about yourself, and limit it within 50 words max.",
      ],
    },
    skills: {
      type: [String],
      required: [
        true,
        "Please mention your skills, to get better match for you",
      ],
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export { User };
