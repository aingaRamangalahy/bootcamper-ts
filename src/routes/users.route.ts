import { Router } from "express";
import userController from "../controllers/users.controller";

class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", userController.getUsers);
  }
}

export default new UserRouter().router;
