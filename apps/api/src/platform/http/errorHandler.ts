import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../errors.js";
import { logger } from "../logger.js";

//Without this, every single route would need its own try/catch with its own logic for "
// turning this error into a sensible JSON response and the right HTTP status code"
//turns a ZodError (failed validation) into a 400 with the zod issues attached
//turns not found errors into a 404 with the message attached
//turns any other error into a 500 with a generic message and logs the error to the console
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    res.status(400).json({ error: "ValidationError", issues: err.issues });
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.name, message: err.message });
    return;
  }

  logger.error({ err }, "Unhandled error");
  res.status(500).json({ error: "InternalError", message: "Something went wrong" });
}
