//app.ts imports catalogRouter from here — never reaches into routes.ts

export { catalogRouter } from "./routes.js";
export { getProduct, listProducts } from "./service.js";
