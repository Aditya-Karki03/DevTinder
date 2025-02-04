import mongoose, { ConnectOptions } from "mongoose";
const connectDB = async () => {
  const dbUri: string = process.env.MONGO_URI || "";
  //options is an object
  const options: ConnectOptions = {};
  try {
    await mongoose.connect(dbUri, options);
    console.log("DB is connected successfully");
  } catch (error) {
    console.error("DB Connection failed:", error);
    throw new Error("Can't connect to MongoDB");
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("DB Disconnected Successfully!");
  } catch (error) {
    console.error("DB Disconnection failed", error);
    throw new Error("Can't disconnect to mongoDB");
  }
};
export { connectDB, disconnectDB };
