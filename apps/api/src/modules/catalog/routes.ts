//The only file that touches Express directly for this module
import { Router } from "express";
import { productListQuerySchema, type ProductListQuery } from "@v2fashion/shared";
import { validateQuery } from "../../platform/http/validate.js";
import { getProduct, listProducts } from "./service.js";

export const catalogRouter = Router();

catalogRouter.get("/products", validateQuery(productListQuerySchema), async (req, res, next) => {
  try {
    const { category } = res.locals.query as ProductListQuery;
    const products = await listProducts(category);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

catalogRouter.get("/products/:id", async (req, res, next) => {
  try {
    const product = await getProduct(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});
