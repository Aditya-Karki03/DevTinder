import express from "express";
import authRoutes from "./authRoutes";
import userProfileRoutes from "./userProfileRoutes";
const appRouterV1 = express.Router();

appRouterV1.use("/user", authRoutes);
appRouterV1.use("/user-profile", userProfileRoutes);

export default appRouterV1;
