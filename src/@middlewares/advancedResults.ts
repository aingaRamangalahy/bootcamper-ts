import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

const advancedResults = (model: Model<any>, populate: Model<any>) => async (
  req: any,
  res: any,
  next: NextFunction
) => {
  let query;

  //copy req.query
  const reqQuery = { ...req.query };

  // declare Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // create query string
  let queryString = JSON.stringify(reqQuery);

  // Create operators ($gt|$gte)
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Find resources
  query = model.find(JSON.parse(queryString));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sortBy(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Paginate
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }
  // Execute query
  const results = await query;

  // Pagination Results

  let pagination: { next; prev };

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

export default advancedResults;
