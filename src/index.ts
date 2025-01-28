import express from "express";
import { Request, Response } from "express";
import { connectDB, disconnectDB } from "./config/db";
import { config } from "dotenv";
import appRouterV1 from "./routes/v1";
config();
const app = express();
const port = 3000;

// app.use("/login", (req: Request, res: Response) => {
//   res.send("Hello world");
// });

app.use("/v1", appRouterV1);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Port is listening at", port);
    });
  })
  .catch((error) => console.error(error));

//create a config folder to put every configuration files inside of it
