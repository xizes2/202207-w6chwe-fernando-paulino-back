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
      mongoose.set("toJSON", {
        virtuals: true,
        transform: (doc, ret) => {
          const newDocument = { ...ret };
          // eslint-disable-next-line no-underscore-dangle
          delete newDocument._v;
          // eslint-disable-next-line no-underscore-dangle
          delete newDocument._id;
          return newDocument;
        },
      });
    });
  });

export default connectDataBase;
