import express, { Request, Response } from "express";
// import { Collection } from "mongoose";
import { User } from "../schema/user";
import { Connection } from "../schema/connection";
export class FeedController {
  async getAllFeedData(req: Request, res: Response) {
    const { user } = req;
    //we will fetch all the user from the db
    //we will filter those who are in the connections collection as they already have sent the connection request
    //also don't show your own profile on your own feed
    try {
      const collectionData = await Connection.find({
        fromRequest: user?._id,
      });

      //set is a data structure which only stores unique element and in ascending order with T.C a nlogn;
      const set = new Set();
      collectionData.map((collection: any) => {
        set.add(collection.fromRequest);
        set.add(collection.toRequest);
      });

      //$nin=not in
      //$ne= not equal
      //$and= all the conditions inside the array should match than pass otherwise does not
      const filteredUser = await User.find({
        $and: [{ _id: { $nin: Array.from(set) } }, { _id: { $ne: user?._id } }],
      }).select("firstName lastName gender");
      //   const filteredUser = allUsers.filter(
      //     (user: any) => !collectionData.includes(user)
      //   );

      res.status(200).json({
        message: "Fetched your feed",
        user: filteredUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong.",
        user: null,
      });
    }
  }
}
