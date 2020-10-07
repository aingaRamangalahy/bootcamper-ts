import { Response, Request } from "express";
import asyncHandler from "../@middlewares/asyncHandler";
class BootcampController {
  constructor() {}

  /**
   * @description Get all bootcamps
   * @route GET /api/v1/bootcamps
   * @route GET /api/v1/bootcamps?location[gt]=762
   * @route GET /api/v1/bootcamps?page=5&limit=54
   * @route GET /api/v1/bootcamps?select=name,description&sort=name 
   * @param req express request
   * @param res express response
   */
  getBootcamps = asyncHandler((req: Request, res: Response) => {
    res.end("Ok");
  }); 
}

const bootcampController = new BootcampController();

export default bootcampController;
