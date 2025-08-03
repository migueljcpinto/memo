"use server";

import { db } from "@/db/drizzle";
import { InsertMemo, memos } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createMemo = async (values: InsertMemo) => {
    try {
        await db.insert(memos).values(values);
        return { success: true, message: "Memo created successfully" };
    } catch {
        return { success: false, message: "Failed to create memobook" };
    }
};

export const getMemoById = async (id: string) => {
    try {
        const memo = await db.query.memos.findFirst({
            where: eq(memos.id, id),
            with: {
                memobook: true
            }
        });

        return { success: true, memo };
    } catch {
        return { success: false, message: "Failed to get memobook" };
    }
};

export const updateMemo = async (id: string, values: Partial<InsertMemo>) => {
    try {
        await db.update(memos).set(values).where(eq(memos.id, id));
        return { success: true, message: "Memobook updated successfully" };
    } catch {
        return { success: false, message: "Failed to update memobook" };
    }
};

export const deleteMemo = async (id: string) => {
    try {
        await db.delete(memos).where(eq(memos.id, id));
        return { success: true, message: "Memobook deleted successfully" };
    } catch {
        return { success: false, message: "Failed to delete memobook" };
    }
};