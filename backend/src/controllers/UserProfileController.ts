import { Request, Response } from "express";
import { User } from "../schema/user";
import { userUpdateDataValidator } from "../utils/validation";

export class UserProfileController {
  getProfile(req: Request, res: Response) {
    const { user } = req;
    if (user) {
      res.status(201).json({
        message: "Profile Fetched successfully",
        user: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          gender: user?.gender,
          email: user?.email,
          age: user?.age,
          about: user?.about,
          skills: user?.skills,
          photoUrl: user?.photoUrl,
        },
      });
      return;
    }
    res.status(403).json({
      message: "Profile not found",
      user: null,
    });
  }
  async updateProfile(req: Request, res: Response) {
    const { user } = req;
    const { firstName, lastName, gender, email, age, about, skills, photoUrl } =
      req.body;
    //check if user is sending unnecessary data as well
    const { error, message } = userUpdateDataValidator(req);
    if (error) {
      res.status(403).json({
        message,
        user: null,
      });
    }
    try {
      const userData = await User.findByIdAndUpdate(
        user?._id,
        {
          firstName,
          lastName,
          gender,
          email,
          age,
          about,
          skills,
          photoUrl,
        },
        {
          new: true,
        }
      );
      if (!userData) {
        res.status(400).json({
          message: `Unable to update,your data could not be updated.`,
          user: null,
        });
      }
      res.status(200).json({
        message: `${userData?.firstName}, your data is updated successfully`,
        user: userData,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong.",
        user: null,
      });
    }
  }
  //   async getAllUser(req: Request, res: Response) {
  //     const cookie = req.cookies;
  //     console.log(cookie);
  //     try {
  //       const users = await User.find({});
  //       if (users) {
  //         res.status(201).json({
  //           message: "All users",
  //           data: users,
  //         });
  //       } else {
  //         res.status(404).json({
  //           message: "User not found",
  //           data: null,
  //         });
  //       }
  //     } catch (error) {
  //       res.status(500).json({
  //         message: "No user found",
  //         data: null,
  //       });
  //     }
  //   }
  //   async getUser(req: Request, res: Response) {
  //     const { email } = req.body;
  //     try {
  //       const user = await User.findOne({ email });
  //       if (user) {
  //         res.status(201).json({
  //           message: "User found",
  //           data: user,
  //         });
  //       } else {
  //         res.status(404).json({
  //           message: "User does not exist",
  //           data: null,
  //         });
  //       }
  //     } catch (error) {
  //       res.status(500).json({
  //         message: "Something went wrong.",
  //         data: null,
  //       });
  //     }
  //   }
  //   async updateUser(req: Request, res: Response) {
  //     const userData = req.body;
  //     console.log(userData);
  //     try {
  //       const user = await User.findByIdAndUpdate(userData.userId, userData);
  //       console.log(user);
  //       if (user) {
  //         res.status(204).json({
  //           message: "User data updated successfully!",
  //           data: user,
  //         });
  //       } else {
  //         res.status(404).json({
  //           message: "Cannot find the user of that id",
  //           data: null,
  //         });
  //       }
  //     } catch (error) {
  //       res.status(500).json({
  //         message: "Something went wrong. Please try again",
  //         data: null,
  //       });
  //     }
  //   }
  //   async deleteUser(req: Request, res: Response) {
  //     const { userId } = req.body;
  //     try {
  //       const user = await User.findByIdAndDelete(userId);
  //       if (!user) {
  //         res.status(404).json({
  //           message: "User not found to delete",
  //           data: user,
  //         });
  //         return;
  //       } else {
  //         res.status(201).json({
  //           message: "User deleted succssfully!",
  //           data: user,
  //         });
  //       }
  //     } catch (error) {
  //       res.status(500).json({
  //         message: "Something went wrong",
  //         data: null,
  //       });
  //     }
  //   }
}
