import { pgTable, serial, text, date, time, varchar, boolean } from 'drizzle-orm/pg-core';

// Define your table
export const newsletterTable = pgTable('newsletter', {
  id: serial('id').primaryKey(), // Auto-incrementing ID
  email: text('email').notNull().unique(), // Email field with uniqueness constraint
  createdAt: date('created_at').defaultNow(), // Date field with default as current timestamp
  time: time('time').defaultNow(), // Date field with default as current timestamp
});

export const sellersTable = pgTable("sellers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  uniqueId: varchar("unique_id", { length: 50 }).notNull().unique(),
  username: varchar("username", { length: 50 }).notNull(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  isSeller: boolean("is_seller").default(true),
});