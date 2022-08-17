import "../dotenv";
import chalk from "chalk";
import Debug from "debug";
import mongoose from "mongoose";

const debug = Debug("app-robot:database:index");

const connectDataBase = (mongoUrl: string) =>
  new Promise((resolve, reject) => {
    // Aqui cambio el _id por id y _v por
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret: { _id: string; _v: string }) => {
        const newDocument = { ...ret };

        // eslint-disable-next-line no-underscore-dangle
        delete newDocument._id;
        // eslint-disable-next-line no-underscore-dangle
        delete newDocument._v;

        return newDocument;
      },
    });

    mongoose.connect(mongoUrl, (error) => {
      if (error) {
        debug(chalk.bgRedBright("Error connecting to Database"));
        reject(error);
        return;
      }
      debug(chalk.bgGreenBright("Connected with Database"));
      resolve(true);
    });
  });

export default connectDataBase;
