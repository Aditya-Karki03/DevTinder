import express from "express";
import { FeedController } from "../../controllers/FeedController";
import { userAuth } from "../../middleware/userAuth";
const feedRoutes = express.Router();
const feedController = new FeedController();
//router to get all the feed data
feedRoutes.get("/all", userAuth, feedController.getAllFeedData);

export default feedRoutes;
