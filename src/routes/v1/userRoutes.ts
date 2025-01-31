import express from "express";
import { UserController } from "../../controllers/UserController";
import { userAuth } from "../../middleware/userAuth";
const userRoutes = express.Router();

const userController = new UserController();

//user signup route
userRoutes.post("/signup", userController.createUser);
userRoutes.post("/login", userController.login);
userRoutes.get("/feed", userAuth, userController.getAllUser);
userRoutes.get("/user", userAuth, userController.getUser);
userRoutes.delete("/user", userAuth, userController.deleteUser);
userRoutes.patch("/user", userAuth, userController.updateUser);

export default userRoutes;
