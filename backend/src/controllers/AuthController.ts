import { Request, Response } from "express";
import { User } from "../schema/user";
import { signupDataValidation, verifyPassword } from "../utils/validation";
import { tokenGenerator } from "../utils/tokenGenerator";
import { generateOtp, verifyOtp } from "../utils/otpGenerator";
import { sendOtpEmail } from "../utils/email";
import { getPresignedUrls, uploadToS3 } from "../utils/S3";
export class AuthController {
  //method to verify email, if email does not exist send OTP
  // async sendOtpForEmailVerification(req: Request, res: Response) {
  //   const { email } = req.body;
  //   //check if email exist in the db
  //   try {
  //     const user = await User.findOne({ email });
  //     if (user) {
  //       res.status(400).json({
  //         message:
  //           "User with this email already exist. Try with different email",
  //         hash: null,
  //       });
  //       return;
  //     }
  //     const { hashedData, otp } = await generateOtp(email);
  //     //write a logic to send otp via email
  //     const mailResponse = await sendOtpEmail(otp.toString(), email);
  //     if (mailResponse.error) {
  //       res.status(500).json({
  //         message:
  //           "Unable to send OTP, please contact CEO: adityakarki03@gmail.com",
  //         hash: null,
  //       });
  //       return;
  //     }
  //     res.status(200).json({
  //       message: `OTP sent to ${email}`,
  //       hash: hashedData,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Something went wrong, while processing OTP. Please try again",
  //       hash: null,
  //     });
  //   }
  // }

  // async otpVerification(req: Request, res: Response) {
  //   const { otp, hash, email } = req.body;
  //   const { isVerified, message } = await verifyOtp(email, hash, otp);
  //   if (!isVerified) {
  //     res.status(400).json({
  //       isVerified,
  //       message,
  //     });
  //     return;
  //   }
  //   res.status(200).json({
  //     isVerified,
  //     message,
  //   });
  // }

  //method to create instance of user in the database
  async createUser(req: Request, res: Response) {
    //while user creation after post request, photo comes here=>should be uploaded to S3 using putObject
    //afte uploading I should either get a resposne of the URL of the file or get the URL of the image uploaded save it to DB
    //configure S3 such that only the user of devTinder are allowed to view that image

    const profilePicture = req.file;
    const { firstName, lastName, age, gender, email, about, skills } = req.body;
    //always validate the data first even if you have schema defined for that data
    //because schema will be checked only when attempting to save data into db
    //after validation encrypt the password using bycrypt
    //than save the data onto db
    //DO NOT save lke new User(req.body) or new User(userData)
    //because we don't know how many extra params a user is sending, can have extra data as well
    //only save by destructuring the required data from the body

    //photoURL, about skills

    //just showing
    const { error, message } = signupDataValidation(req);
    if (error) {
      res.status(400).json({
        message,
        data: null,
      });
      return;
    }

    //bcrypt returns us a promise hence we need to await it
    // const encryptedPassword = await bcrypt.hash(password, 10);

    // const user = await User.create(userData);
    // res.status(201).json({
    //   message: "User Created Successfully!",
    //   data: user,
    // });

    //check if the provided email already exist in the db

    try {
      const userEmail = await User.findOne({ email });
      if (userEmail) {
        res.status(403).json({
          message: "User with this email already exist",
          data: null,
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong. Please try again",
        data: null,
      });
    }

    try {
      //upload the picture to S3
      const fileName = `user-uploads/ProfilePicture/${
        profilePicture?.originalname ?? ""
      }-${Date.now()}`;
      await uploadToS3({
        fileName,
        contentType: profilePicture?.mimetype ?? "",
        fileBuffer: profilePicture?.buffer ?? "",
      });

      //file name should be unique, if not S3 overwrites the prev one if same name

      // const photoUrl = await getPresignedUrls(fileName);
      //cloudfront is a CDN which makes the delivery of the files from the private bucket of S3 much faster
      const photoUrl = `https://d1fh7jyuhei6w9.cloudfront.net/${fileName}`;
      // const imgUrl = await apiCallToUpload(
      //   s3UploadPresignedUrl,
      //   profilePicture
      // );
      // console.log(imgUrl);
      // console.log("(--------IMG URL------------");

      //another way of doing the same is by creating new instance of user model and saving in db
      const user = new User({
        firstName,
        lastName,
        photoName: fileName,
        gender,
        age,
        email,
        about,
        skills,
        photoUrl,
      });

      await user.save();
      //generate and send the access token
      const userId = user._id.toString();
      const token = tokenGenerator(userId);
      res.cookie("loginToken", token);
      res.status(201).json({
        message: "User created successfully!",
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          age: user.age,
          email: user.email,
          about: user.about,
          skills: user.skills,
          photoUrl: user.photoUrl,
        },
      });
    } catch (error: any) {
      console.log(error);
      if (error.name == "ValidationError") {
        const errors = Object.values(error.errors).map(
          (err: any) => err.message
        );
        res.status(400).json({
          message: errors[0],
          user: null,
        });
        return;
      }
      res.status(500).json({
        message: "Something went wrong. Please try again",
        user: null,
      });
    }
  }

  async login(req: Request, res: Response) {
    const { user } = req;
    //first we will try finding email
    try {
      const userId = user?._id.toString();
      //create a token with user id
      const token = tokenGenerator(userId || "");
      res.cookie("loginToken", token);
      //provide user with all data except the password in the response
      //using destructuring separated password from the userData and rest of the data goes to the user
      res.status(201).json({
        message: "User verified successfully",
        user: {
          _id: user?._id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          gender: user?.gender,
          age: user?.age,
          email: user?.email,
          about: user?.about,
          skills: user?.skills,
          photoUrl: user?.photoUrl,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong.",
        user: null,
      });
    }
  }

  async logout(req: Request, res: Response) {
    res.cookie("loginToken", null, {
      expires: new Date(Date.now()),
    });
    res.json({
      message: "Logout Successfull",
      user: null,
    });
  }
}
