import { z } from 'zod';
import { pgTable, text, integer, serial, timestamp, boolean, json, varchar, decimal } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

// Product
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  name_ar: text("name_ar").notNull(),
  description: text("description").notNull(),
  description_ar: text("description_ar").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  oldPrice: decimal("old_price", { precision: 10, scale: 2 }),
  imageUrl: text("image_url").notNull(),
  categoryId: integer("category_id").notNull(),
  brandId: integer("brand_id").notNull(),
  stock: integer("stock").notNull().default(0),
  weight: text("weight").notNull(),
  isNew: boolean("is_new").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  tags: json("tags").$type<string[]>().default([]).notNull(),
  nutritionFacts: json("nutrition_facts").$type<Record<string, string>>().default({}),
  ingredients: text("ingredients"),
  ingredients_ar: text("ingredients_ar"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  name_ar: text("name_ar").notNull(),
  description: text("description"),
  description_ar: text("description_ar"),
  imageUrl: text("image_url"),
  parentId: integer("parent_id"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Brands
export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  name_ar: text("name_ar"),
  description: text("description"),
  description_ar: text("description_ar"),
  logoUrl: text("logo_url").notNull(),
  websiteUrl: text("website_url"),
  country: text("country"),
  country_ar: text("country_ar"),
  featured: boolean("featured").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Reviews
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  userId: integer("user_id").notNull(),
  rating: integer("rating").notNull(),
  title: text("title"),
  comment: text("comment"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Orders
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  shippingAddress: json("shipping_address").notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }).notNull(),
  paymentStatus: varchar("payment_status", { length: 20 }).notNull().default("pending"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Order Items
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Insert Schemas
export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  created_at: true
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  created_at: true
});

export const insertBrandSchema = createInsertSchema(brands).omit({
  id: true,
  created_at: true
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  created_at: true
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  created_at: true
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
  created_at: true
});

// Types
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Brand = typeof brands.$inferSelect;
export type InsertBrand = z.infer<typeof insertBrandSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;

// Cart Item Type (for client-side only)
export interface CartItem {
  productId: number;
  product: Product;
  quantity: number;
}

// Shopping Cart (for client-side only)
export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}