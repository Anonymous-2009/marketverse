import {
  pgTable,
  serial,
  text,
  date,
  time,
  varchar,
  boolean,
  integer
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
  lastName: varchar('last_name', { length: 50 }).notNull(),
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
  id: serial("id").primaryKey(),
  firstName: varchar("firstName", { length: 50 }).notNull(),
  lastName: varchar("lastName", { length: 50 }).notNull(),
  age: integer("age").notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  phoneNo: varchar("phoneNo", { length: 15 }).notNull().unique(),
  gender: varchar("gender", { length: 10 }).notNull(),
  profileImageUrl: varchar("profileImageUrl", { length: 255 }),
  createdAt: date("createdAt").defaultNow().notNull(),
  updatedAt: date("updatedAt").defaultNow().notNull()
});

export interface SellerInfo {
  id: number;
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
