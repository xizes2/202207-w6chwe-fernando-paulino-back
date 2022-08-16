import { Request, Response } from "express";
import { createToken } from "../../../utils/loginFunctions";
import { JwtPayload, LoginData } from "../../types/usersLogin";

const loginUser = (req: Request, res: Response) => {
  const user = req.body as LoginData;

  const payload: JwtPayload = {
    id: "124123412",
    userName: user.username,
  };
  debugger;

  const responseData = {
    user: {
      token: createToken(payload),
      userName: payload.userName,
    },
  };
  debugger;
  res.status(200).json(responseData);
};

export default loginUser;
