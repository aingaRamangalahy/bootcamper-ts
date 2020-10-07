import { Response, Request } from "express";
import asyncHandler from "../@middlewares/asyncHandler";
class UserController {
  constructor() {}

  /**
   * @description Get all users
   * @param req express request
   * @param res express response
   */
  getUsers = asyncHandler((req: Request, res: Response) => {
    res.end("Ok");
  }); 
}

const userController = new UserController();

export default userController;
