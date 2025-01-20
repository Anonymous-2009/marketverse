import {
  pgTable,
  serial,
  text,
  date,
  time,
  varchar,
  boolean,
  integer,
  numeric,
  json
} from 'drizzle-orm/pg-core';

// Define your table
export const newsletterTable = pgTable('newsletter', {
  id: serial('id').primaryKey(), // Auto-incrementing ID
  email: text('email').notNull().unique(), // Email field with uniqueness constraint
  createdAt: date('created_at').defaultNow(), // Date field with default as current timestamp
  time: time('time').defaultNow(), // Date field with default as current timestamp
});

export interface Newsletter {
  id: number;
  email: string;
  createdAt: Date;
  time: string;
}

export const sellersTable = pgTable('sellers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  uniqueId: varchar('unique_id', { length: 50 }).notNull().unique(),
  username: varchar('username', { length: 50 }).notNull(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }),
  isSeller: boolean('is_seller').default(true),
});

export interface Seller {
  id: number;
  email: string;
  uniqueId: string;
  username: string;
  firstName: string;
  lastName: string;
  isSeller: boolean;
}

export const sellersInfoTable = pgTable('sellers_info', {
  id: serial('id').primaryKey(),
  uniqueId: varchar('unique_id', { length: 50 }).notNull().unique(),
  firstName: varchar('firstName', { length: 50 }).notNull(),
  lastName: varchar('lastName', { length: 50 }),
  username: varchar('username', { length: 50 }).notNull(),
  age: integer('age').notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  phoneNo: integer('phone_no').notNull().unique(),
  gender: varchar('gender', { length: 10 }),
  profileImageUrl: varchar('profile_image_url', { length: 255 }),
  createdAt: date('created_at').defaultNow().notNull(),
  updatedAt: date('updated_at').defaultNow().notNull(),
});

export interface SellerInfo {
  id: number;
  uniqueId: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phoneNo: string;
  gender: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const products = pgTable('products', {
  id: serial('id'),
  productId: numeric('product_id').primaryKey().notNull(), // 5-digit ID
  sellerId: serial('seller_id').notNull(), // Unique ID for each seller
  productName: varchar('product_name', { length: 255 }).notNull(), // Name of the product
  productPrice: numeric('product_price', { precision: 10, scale: 2 }).notNull(), // Price of the product
  productDescription: text('product_description').notNull(), // Description of the product
  productImages: json('product-images').array().notNull(), // Array of product image URLs
});