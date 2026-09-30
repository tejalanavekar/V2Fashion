//zod schema for both webs and api to validate the data
import { z } from "zod";

export const categorySchema = z.enum(["women", "men", "kids", "jewellery"]);
export type Category = z.infer<typeof categorySchema>;

export const productBadgeSchema = z.enum(["Ready to ship", "New"]);
export type ProductBadge = z.infer<typeof productBadgeSchema>;

export const productSchema = z.object({
  id: z.string().uuid(),
  category: categorySchema,
  categoryLabel: z.string(),
  name: z.string(),
  priceInPaise: z.number().int().positive(),
  shippingText: z.string(),
  badge: productBadgeSchema.nullable(),
  placeholderGradient: z.string(),
  placeholderLabel: z.string(),
});
export type Product = z.infer<typeof productSchema>;

export const productListQuerySchema = z.object({
  category: categorySchema.optional(),
});
export type ProductListQuery = z.infer<typeof productListQuerySchema>;
