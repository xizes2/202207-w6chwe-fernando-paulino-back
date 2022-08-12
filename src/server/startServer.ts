import "../dotenv";
import chalk from "chalk";
import Debug from "debug";
import express from "express";

const app = express();
const debug = Debug("app-robot");

const startServer = (port: number) => {
  // eslint-disable-next-line no-new
  new Promise((resolve, reject) => {
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
};

export default startServer;
