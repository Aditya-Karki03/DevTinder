import express from "express";
import { Request, Response } from "express";
import { connectDB, disconnectDB } from "./config/db";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import appRouterV1 from "./routes/v1";
import cors from "cors";
config();
const app = express();
const port = 3000;

// app.use("/login", (req: Request, res: Response) => {
//   res.send("Hello world");
// });

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.WEB_ENDPOINT || "",
      credentials: true,
    })
  );
}

//middleware to convert the json to valid js object and put into req body
app.use(express.json());
app.use(cookieParser());

app.use("/v1", appRouterV1);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Port is listening at", port);
    });
  })
  .catch((error) => console.error(error));

//create a config folder to put every configuration files inside of it
