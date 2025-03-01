import express from "express";
import { userAuth } from "../../middleware/userAuth";
import { UserProfileController } from "../../controllers/UserProfileController";
import { imageAuth } from "../../middleware/imageUploads";
const userProfileRoutes = express.Router();

const userProfileController = new UserProfileController();

userProfileRoutes.get("/profile", userAuth, userProfileController.getProfile);
userProfileRoutes.patch(
  "/profile",
  userAuth,
  imageAuth,
  userProfileController.updateProfile
);

export default userProfileRoutes;
