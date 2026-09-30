//it sits between the repo and route handler and is responsible for transforming the data from the repo 
// into the shape that the route handler expects. It also handles any errors that may occur in the repo 
// and throws them as HttpErrors that can be handled by the errorHandler middleware.

//basically where business logic stays similar to controllers
import type { Category, Product } from "@v2fashion/shared";
import { NotFoundError } from "../../platform/errors.js";
import { findProductById, findProducts } from "./repo.js";

export async function listProducts(category?: Category): Promise<Product[]> {
  const rows = await findProducts(category);
  return rows.map(toProduct);
}

export async function getProduct(id: string): Promise<Product> {
  const row = await findProductById(id);
  if (!row) {
    throw new NotFoundError(`Product ${id} not found`);
  }
  return toProduct(row);
}

function toProduct(row: Awaited<ReturnType<typeof findProductById>>): Product {
  if (!row) {
    throw new NotFoundError("Product not found");
  }
  return {
    id: row.id,
    category: row.category,
    categoryLabel: row.categoryLabel,
    name: row.name,
    priceInPaise: row.priceInPaise,
    shippingText: row.shippingText,
    badge: row.badge,
    placeholderGradient: row.placeholderGradient,
    placeholderLabel: row.placeholderLabel,
  };
}
