import cors from "cors";
import morgan from "morgan";
import express from "express";
import connectDataBase from "./database";
import { generalError, notFoundError } from "./server/middlewares/error";
import "./dotenv";
import robotsRouter from "./server/router/robotsRouter";
import { startServer, app } from "./server/startServer";
import usersRouter from "./server/router/usersRouter";

const PORT = process.env.PORT ?? 4050;
const mongoUrl = process.env.MONGOURL;

(async () => {
  try {
    await connectDataBase(mongoUrl);
    await startServer(+PORT);
  } catch {
    process.exit(1);
  }
})();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/robots", robotsRouter);
app.use(notFoundError);
app.use(generalError);
