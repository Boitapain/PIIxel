// src/lib/repositories/profile.ts
import { db } from "$lib/server/db";
import { profile } from "$lib/server/db/schema";
import { and, eq, sql } from "drizzle-orm/sql";

export async function updateUiLanguageProfile(id: string, ui_language: string) {
    return db
        .update(profile)
        .set({ ui_language })
        .where(eq(profile.id, id))
        .returning();
}

export async function getUserProfile(userId: string) {
    try {
        const result = await db.select().from(profile).where(eq(profile.id, userId));
        return result;
    } catch (error) {
        throw error;
    }
}