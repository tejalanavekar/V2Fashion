import { integer, pgEnum, pgSchema, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const catalogSchema = pgSchema("catalog");

export const categoryEnum = catalogSchema.enum("category", [
  "women",
  "men",
  "kids",
  "jewellery",
]);

//database structure for both database structure and typescript
export const badgeEnum = catalogSchema.enum("badge", ["Ready to ship", "New"]);

export const products = catalogSchema.table("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  category: categoryEnum("category").notNull(),
  categoryLabel: text("category_label").notNull(),
  name: text("name").notNull(),
  priceInPaise: integer("price_in_paise").notNull(),
  shippingText: text("shipping_text").notNull(),
  badge: badgeEnum("badge"),
  placeholderGradient: text("placeholder_gradient").notNull(),
  placeholderLabel: text("placeholder_label").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
