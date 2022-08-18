import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import Robot from "../../database/models/Robot";
import User from "../../database/models/User";
import CreateCustomError from "../../utils/CreateCustomError";
import { ICustomRequest } from "../middlewares/authentication";

const debug = Debug("app-robot:robotsControllers.ts");

export const getRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(chalk.bgGreenBright(`A request has arrived!`));
  try {
    const robots = await Robot.find().populate(
      "owner",
      {
        userName: 1,
      } /* Quiero que el populate devuelva userName, el 1 funciona como true */
    );
    await res.status(200).json({ robots });
  } catch (error) {
    const customError = CreateCustomError(
      400,
      error.message,
      "Error getting the data"
    );
    next(customError);
  }
};

export const createRobots = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => {
  const robot = req.body;

  // Recoger id del user para ponerlo en la propriedad owner de robot. Aqui creamos la relacion entre las 2 colecciones.
  robot.owner = req.payload.id;

  try {
    debug(chalk.bgGreenBright("A post was send"));

    const newRobot = await Robot.create(robot);
    const user = await User.findById(req.payload.id);
    user.robots.push(newRobot.id); // Añadir las ids de los robots creados por el user a su array "robots"
    user.save();

    res.status(201).json({ robot: newRobot });
  } catch (error) {
    const customError = CreateCustomError(
      409,
      error.message,
      "Error creating the robot, please try again."
    );
    next(customError);
  }
};
