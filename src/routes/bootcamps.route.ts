import { Router } from "express";
import BootcampController from "../controllers/bootcamps.controller";

class BootcampRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", BootcampController.getBootcamps);
  }
}

export default new BootcampRouter().router;
