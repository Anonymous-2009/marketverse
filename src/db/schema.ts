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
  json,
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
  id: serial('id'),
  email: varchar('email', { length: 255 }).notNull().primaryKey(),
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
  phoneNo: varchar('phone_no', { length: 10 }).notNull().unique(),
  gender: varchar('gender', { length: 30 }),
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
  productId: integer('product_id').primaryKey().notNull(), // 5-digit ID
  sellerId: varchar('seller_id').notNull(), // Unique ID for each seller
  sellerEmail: varchar('seller_email').notNull(),
  productName: varchar('product_name', { length: 255 }).notNull(), // Name of the product
  productPrice: integer('product_price').notNull(), // Price of the product
  productDescription: text('product_description').notNull(), // Description of the product
  productImages: json('product-images').array().notNull(), // Array of product image URLs
});

export const paymentAccount = pgTable('paymentAccount', {
  id: serial('id'),
  accountUsername: varchar('account_username'),
  accountNumber: numeric('account_number').primaryKey(),
  sellerId: varchar('seller_id').notNull(), // Unique ID for each seller
  sellerEmail: varchar('seller_email').notNull(), // Email of the seller
  // isSeller: boolean('is_seller'), if future use or we check if the user is a seller or need to add this field
});

// here's come's the buyer detail's table's.

export const buyerProfile = pgTable('buyerProfile', {
  id: serial('id'),
  uniqueId: varchar('unique_id', { length: 50 }).notNull().unique(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }),
  username: varchar('username', { length: 50 }).notNull(),
  age: integer('age').notNull(),
  email: varchar('email', { length: 100 }).notNull().unique().primaryKey(),
  phoneNo: varchar('phone_no', { length: 12 }).notNull().unique(),
  gender: varchar('gender', { length: 40 }),
  profileImageUrl: varchar('profile_image_url', { length: 255 }),
  createdAt: date('created_at').defaultNow().notNull(),
  updatedAt: date('updated_at').defaultNow().notNull(),
});

export const buyerAddress = pgTable('buyerAddress', {
  id: serial('id'),
  email: varchar('email', { length: 100 })
    .notNull()
    .references(() => buyerProfile.email, { onDelete: 'cascade' }),
  addressID: integer('address_id').notNull().unique(),
  isDefault: boolean('is_default').default(false).notNull(),
  country: varchar('country', { length: 100 }).notNull(),
  fullName: varchar('full_name', { length: 100 }).notNull(),
  streetName: varchar('street_name', { length: 255 }),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 100 }).notNull(),
  pincode: varchar('pincode').notNull(),
  phoneNo: varchar('phone_no', { length: 12 }).notNull(), // Adjusted to varchar for 12+ digits
  createdAt: date('created_at').defaultNow().notNull(),
  updatedAt: date('updated_at').defaultNow().notNull(),
});

export const buyerPayment = pgTable('buyerPayment', {
  id: serial('id'),
  accountUsername: varchar('account_username'),
  accountNumber: numeric('account_number').primaryKey(),
  buyerId: varchar('seller_id').notNull(), // Unique ID for each seller
  buyerEmail: varchar('seller_email')
    .notNull()
    .references(() => buyerProfile.email, { onDelete: 'cascade' }), // Email of the seller
  // isSeller: boolean('is_seller'), if future use or we check if the user is a seller or need to add this field
});
