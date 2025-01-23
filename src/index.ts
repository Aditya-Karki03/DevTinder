import express from "express";
import { Request, Response } from "express";
const app = express();
const port = 3000;

app.use("/login", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("Port is listening at " + port);
});
