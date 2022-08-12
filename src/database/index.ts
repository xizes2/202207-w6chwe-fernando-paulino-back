import "../dotenv";
import chalk from "chalk";
import Debug from "debug";
import mongoose from "mongoose";

const debug = Debug("app-robot:database:index");

const connectDataBase = (mongoUrl: string) =>
  new Promise((resolve, reject) => {
    mongoose.connect(mongoUrl, (error) => {
      if (error) {
        debug(chalk.red("Error connecting to Database"));
        reject(error);
        return;
      }
      debug(chalk.greenBright("Connected with Database"));
      resolve(true);
    });
  });

export default connectDataBase;
