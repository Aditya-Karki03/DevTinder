import express from "express";
import { userAuth } from "../../middleware/userAuth";
import { UserProfileController } from "../../controllers/UserProfileController";
const userProfileRoutes = express.Router();

const userProfileController = new UserProfileController();

userProfileRoutes.get(
  "/user/profile",
  userAuth,
  userProfileController.getProfile
);

export default userProfileRoutes;
