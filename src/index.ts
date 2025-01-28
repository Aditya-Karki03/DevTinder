import express from "express";
import { Request, Response } from "express";
import { connectDB, disconnectDB } from "./config/db";
import { config } from "dotenv";
config();
const app = express();
const port = 3000;

app.use("/login", (req: Request, res: Response) => {
  res.send("Hello world");
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Port is listening at", port);
    });
  })
  .catch((error) => console.error(error));

//create a config folder to put every configuration files inside of it
