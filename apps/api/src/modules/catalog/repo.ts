//The only file allowed to write raw queries against the products table
import { eq } from "drizzle-orm";
import type { Category } from "@v2fashion/shared";
import { db } from "../../platform/db.js";
import { products } from "./schema.js";

export async function findProducts(category?: Category) {
  if (category) {
    return db.select().from(products).where(eq(products.category, category));
  }
  return db.select().from(products);
}

export async function findProductById(id: string) {
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return rows[0];
}
