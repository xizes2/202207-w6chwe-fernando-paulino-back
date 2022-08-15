import express from "express";
import { createRobots, getRobots } from "../controllers/robotsControllers";

const robotsRouter = express.Router();

robotsRouter.get("/", getRobots);
robotsRouter.post("/create", createRobots);

export default robotsRouter;
