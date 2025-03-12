import express from "express";
import authRoutes from "./authRoutes";
import userProfileRoutes from "./userProfileRoutes";
import connectionRoutes from "./connectionRequest";
import feedRoutes from "./feedRoutes";
import chatRoutes from "./chatRoutes";
const appRouterV1 = express.Router();

appRouterV1.use("/user", authRoutes);
appRouterV1.use("/user-profile", userProfileRoutes);
appRouterV1.use("/user-connection", connectionRoutes);
appRouterV1.use("/user-feed", feedRoutes);
appRouterV1.use("/chat", chatRoutes);

export default appRouterV1;
