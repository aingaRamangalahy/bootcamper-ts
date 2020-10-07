import { Response, Request } from "express";
import * as path from "path";

class BootcampController {
  constructor() {}

  getBootcamp = (req: Request, res: Response) => {
    res.end("Ok");
  };
}

const bootcampController = new BootcampController();

export default bootcampController;
