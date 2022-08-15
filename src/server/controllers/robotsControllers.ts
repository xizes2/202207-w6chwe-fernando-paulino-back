import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";

import Robot from "../../database/models/Robot";
import createCustomError from "../../utils/errorFunction";

const debug = Debug("app-robot:robotsControllers.ts");

export const getRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(chalk.bgGreenBright(`A request has arrived!`));
  try {
    const robots = await Robot.find();
    await res.status(200).json({ robots });
  } catch (error) {
    const customError = createCustomError(
      400,
      error.message,
      "Error getting the data"
    );
    next(customError);
  }
};

export const createRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const robot = req.body;
  try {
    debug(chalk.yellowBright("A post was send"));
    const newRobot = await Robot.create(robot);
    res.status(201).json({ robot: newRobot });
  } catch (error) {
    const customError = createCustomError(
      409,
      error.message,
      "Error creating the data, please try again"
    );
    next(customError);
  }
};
