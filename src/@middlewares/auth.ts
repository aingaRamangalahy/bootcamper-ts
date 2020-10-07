import * as jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import ErrorResponse from "../@utils/errorResponse";
import User from "../models/users.model";
import { NextFunction, Request, Response } from "express";
import { nextTick } from "process";

const protect = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // set token from Bearer token
      token = req.headers.authorization.split(" ")[1];
    }

    /**
     * set token from cookies
     */
    //   else if (req.cookies.token) {
    //       token = req.cookies.token
    //   }

    if (!token) {
      return next(
        new ErrorResponse("not authorized to access this route", 401)
      );
    }

    try {
      // verify token
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      return next(
        new ErrorResponse("not authorized to access this route", 401)
      );
    }
  }
);

// Grant access to specific roles
const authorize = (...roles) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} has no access to this route`,
          403
        )
      );
    }

    next();
  };
};

module.exports = {
  protect,
  authorize,
};
