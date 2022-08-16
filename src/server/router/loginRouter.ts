import express from "express";
import loginUser from "../controllers/userControllers/loginController";
import robotsRouter from "./robotsRouter";

const loginRouter = express.Router();

robotsRouter.post("/login", loginUser);

export default loginRouter;
