import chalk from "chalk";
import Debug from "debug";
import { Request, Response } from "express";
import Robot from "../../database/models/Robot";

const debug = Debug("app-robot:robotsControllers.ts");

const getRobots = async (req: Request, res: Response) => {
  debug(chalk.bgGreenBright(`A request has arrived!`));
  const robots = await Robot.find();
  await res.status(200).json({ robots });
};

export default getRobots;
