//pino is for the logger instance to get the logs
import pino from "pino";
import { config } from "./config.js";

export const logger = pino({
  level: config.NODE_ENV === "development" ? "debug" : "info",
});
