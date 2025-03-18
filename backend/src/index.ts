import express from "express";
import { connectDB } from "./config/db";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import appRouterV1 from "./routes/v1";
import cors from "cors";
import { createServer } from "node:http";
import { initializeSocketIO } from "./utils/socket.io";

//checking the CI pipeline test-2

config();
const app = express();
//we want to handle routes using express and socketio needs raw http server to work upon
//raw http server is needed because of low level transports
const server = createServer(app);
const port = 3000;

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
initializeSocketIO(server);

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log("Port is listening at", port);
    });
  })
  .catch((error) => console.error(error));

//create a config folder to put every configuration files inside of it
