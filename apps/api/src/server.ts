import { app } from "./app.js";
import { config } from "./platform/config.js";
import { logger } from "./platform/logger.js";

app.listen(config.PORT, () => {
  logger.info(`API listening on http://localhost:${config.PORT}`);
});
