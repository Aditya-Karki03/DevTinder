import express from "express";
import authRoutes from "./authRoutes";
import userProfileRoutes from "./userProfileRoutes";
import connectionRoutes from "./connectionRequest";
const appRouterV1 = express.Router();

appRouterV1.use("/user", authRoutes);
appRouterV1.use("/user-profile", userProfileRoutes);
appRouterV1.use("/user-connection", connectionRoutes);

export default appRouterV1;
