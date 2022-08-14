import "../dotenv";
import chalk from "chalk";
import Debug from "debug";
import express from "express";

export const app = express();
const debug = Debug("app-robot:server");

export const startServer = (port: number) => {
  const promise = new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(
        chalk.bgGreenBright(`Server listening on http://localhost:${port}`)
      );
      resolve(true);
    });
    server.on("error", (error) => {
      debug(chalk.bgRedBright("Error conecting to database: ", error.message));
      reject(error);
    });
  });
  return promise;
};
