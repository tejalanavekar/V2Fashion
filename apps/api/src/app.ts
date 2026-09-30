import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { catalogRouter } from "./modules/catalog/index.js";
import { errorHandler } from "./platform/http/errorHandler.js";
import { logger } from "./platform/logger.js";

//the main express app assembling
//helmet -> for security headers
//cors -> for cross origin requests -> web calling api from a different port/domain
//rateLimit -> for rate limiting requests
//pino -> for logging requests and responses
export const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors());
app.use(rateLimit({ windowMs: 60_000, limit: 300 }));
app.use(pinoHttp({ logger }));
app.use(express.json());

app.use("/api", catalogRouter);

app.use(errorHandler);
