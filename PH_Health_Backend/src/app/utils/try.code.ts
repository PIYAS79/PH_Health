import type { NextFunction, Request, RequestHandler, Response } from "express";

const Async_Catch = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default Async_Catch;
