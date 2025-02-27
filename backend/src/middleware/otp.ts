import { Request, Response, NextFunction } from "express";
import { User } from "../schema/user";
import { generateOtp, verifyOtp } from "../utils/otpGenerator";
import { sendOtpEmail } from "../utils/email";

export const otpGenerator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //generate otp
  //auth type should either be registration or login
  const { email, authType } = req.body;
  try {
    const user = await User.findOne({ email });
    //if registration than there should be no user in db
    if (authType == "registration") {
      //if user registers newly than email should not be in the db
      if (user) {
        res.status(400).json({
          message: "User with this email already exist. Please login",
          hash: null,
        });
        return;
      }
      const { hashedData, otp } = await generateOtp(email);
      //send otp via email
      const { error, info } = await sendOtpEmail(otp.toString(), email);
      if (error) {
        res.status(500).json({
          message:
            "Unable to send OTP, please contact CEO: adityakarki03@gmail.com",
          hash: null,
        });
        return;
      }

      res.status(200).json({
        message: `Otp sent to ${email}`,
        hash: hashedData,
      });
      next();
    }
    //if login there should be user in the db
    else if (authType == "login") {
      if (!user) {
        res.status(404).json({
          message: `No user found with ${email} as mail id. Try registering first`,
          hash: null,
        });
        return;
      }
      const { otp, hashedData } = await generateOtp(email);
      //send otp via email
      const { error, info } = await sendOtpEmail(otp.toString(), email);
      if (error) {
        res.status(500).json({
          message:
            "Unable to send OTP, please contact CEO: adityakarki03@gmail.com",
          hash: null,
        });
        return;
      }
      res.status(200).json({
        message: `Otp sent to ${email}`,
        hash: hashedData,
      });
      next();
    }
    //incase both the authType does not match
    else {
      res.status(404).json({
        message: "Invalid authentication type.",
        hash: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message:
        "Unable to send OTP, please contact CEO: adityakarki03@gmail.com",
      hash: null,
    });
  }
};

export const otpVerifier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { hash, email, otp } = req.body;
  try {
    const { isVerified, message } = await verifyOtp(email, hash, otp);
    if (!isVerified) {
      res.status(402).json({
        message,
        isVerified,
      });
      return;
    }
    const user = await User.findOne({ email });
    if (user) {
      //if user is found with that email, that means we are working for login else registration,
      //incase of login we send the user to the next middleware
      req.user = user;
      next();
    } else {
      //else it means it is registration we send the user a resposne message
      res.status(200).json({
        message,
        isVerified,
      });
    }
  } catch (error) {
    res.status(500).json({
      message:
        "Something went wrong, while verifying OTP. Please contact CEO: adityakarki03@gmail.com",
      isVerified: false,
    });
  }
};
