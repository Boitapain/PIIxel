import { pgTable, uuid, inet, timestamp, text } from 'drizzle-orm/pg-core';

export const profile = pgTable('profile', {
    id: uuid('id').primaryKey(),
    role: text('role').notNull().default('user'),
    ip_address: inet('ip_address'),
    ui_language: text('ui_language').notNull().default('en'),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});