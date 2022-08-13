import chalk from "chalk";
import Debug from "debug";
import { Request, Response } from "express";
import robots from "../../database/robots";

const debug = Debug("app-robot:robotsControllers.ts");

const getRobots = (req: Request, res: Response) => {
  debug(chalk.bgGreenBright(`A request has arrived!`));
  res.status(200).json(robots);
};

export default getRobots;
