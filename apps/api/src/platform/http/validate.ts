import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

//checks incoming data before your handler runs
//if correct sends to the handler(route)
export function validateQuery<T>(schema: ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    res.locals.query = schema.parse(req.query);
    next();
  };
}
