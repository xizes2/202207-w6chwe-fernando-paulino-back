import express from "express";
import getRobots from "../constrollers/robotsControllers";

const robotsRouter = express.Router();

robotsRouter.get("/", getRobots);

export default robotsRouter;
