import express from "express";
import { createRobots, getRobots } from "../controllers/robotsControllers";
import authentication from "../middlewares/authentication";

const robotsRouter = express.Router();

robotsRouter.get("/", getRobots);
robotsRouter.post("/create", authentication, createRobots);

export default robotsRouter;
