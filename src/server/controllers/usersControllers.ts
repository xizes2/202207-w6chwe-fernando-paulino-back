import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import {
  createToken,
  hashCompare,
  hashCreator,
  IJwtPayload,
} from "../../utils/auth";
import User, { USerData } from "../../database/models/User";
import CreateCustomError from "../../utils/CreateCustomError";

const debug = Debug("app-robots:usersControllers.ts");

interface LoginData {
  username: string;
  password: string;
}
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body as LoginData;
  let findUsers: Array<USerData>;

  const userError = CreateCustomError(
    401,
    "User not found",
    "User or password not valid"
  );

  // Gestion para saber si es valido el userName. Las funciones con await se deben poner dentro de un bloque try-catch
  try {
    findUsers = await User.find({ userName: user.username });
    if (findUsers.length === 0) {
      next(userError);
      return;
    }
  } catch (error) {
    const finalError = CreateCustomError(
      403,
      `Error name: ${(error as Error).name} Message. ${
        (error as Error).message
      }`,
      "User or password not valid"
    );

    next(finalError);
    return;
  }

  try {
    const isPasswordValid = hashCompare(
      user.password /* Pass original del user */,
      findUsers[0].password /* Pass hasheada en mongoose */
    );
    if (!isPasswordValid) {
      userError.message = "Password Invalid";
      next(userError);
      return;
    }
  } catch (error) {
    const finalError = CreateCustomError(
      403,
      `Error name: ${(error as Error).name} Message. ${
        (error as Error).message
      }`,
      "User or password not valid"
    );
    next(finalError);
    return;
  }

  const payload: IJwtPayload = {
    id: findUsers[0].id,
    userName: findUsers[0].userName,
  };
  const responseData = {
    user: {
      token: createToken(payload),
    },
  };
  res.status(200).json(responseData);
};

interface UserRegister {
  username: string;
  password: string;
}

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: UserRegister = req.body as LoginData;
  user.password = await hashCreator(user.password);

  try {
    const newUser = await User.create(user);
    res.status(201).json({ user: newUser });
    debug(chalk.bgGreenBright("User registered"));
  } catch (error) {
    const customError = CreateCustomError(
      400,
      error.message,
      "Error registering the user, please try again"
    );
    next(customError);
  }
};
