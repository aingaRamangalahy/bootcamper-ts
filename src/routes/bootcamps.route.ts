import { Router } from "express";
import BootcampController from "../controllers/bootcamps.controller";

class BootcampRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("*", BootcampController.getBootcamp);
  }
}

export default new BootcampRouter().router;
