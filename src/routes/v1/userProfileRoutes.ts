import express from "express";
import { userAuth } from "../../middleware/userAuth";
import { UserProfileController } from "../../controllers/UserProfileController";
const userProfileRoutes = express.Router();

const userProfileController = new UserProfileController();

userProfileRoutes.get("/profile", userAuth, userProfileController.getProfile);
userProfileRoutes.patch(
  "/profile",
  userAuth,
  userProfileController.updateProfile
);

export default userProfileRoutes;
