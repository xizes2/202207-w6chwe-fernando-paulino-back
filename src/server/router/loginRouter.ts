import express from "express";
import loginUser from "../controllers/userControllers/loginController";

const loginRouter = express.Router();
loginRouter.post("/login", loginUser);
export default loginRouter;
