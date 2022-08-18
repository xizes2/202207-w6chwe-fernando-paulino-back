import "../dotenv";
import chalk from "chalk";
import Debug from "debug";
import mongoose from "mongoose";

const debug = Debug("app-robot:database:index");

const connectDataBase = (mongoUrl: string) =>
  new Promise((resolve, reject) => {
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret: { _id: string; __v: string }) => {
        const newDocument = { ...ret };

        // Aqui yo borro _id y __v de la salida de datos del db, no del db en si
        // eslint-disable-next-line no-underscore-dangle
        delete newDocument._id;
        // eslint-disable-next-line no-underscore-dangle
        delete newDocument.__v;

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
