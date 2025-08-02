"use server";

import { db } from "@/db/drizzle";
import {  MemobookInsert, memobooks } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const createMemobook = async (values: MemobookInsert) => {
    try {
        await db.insert(memobooks).values(values);
        return { success: true, message: "memobook created successfully" };
    } catch {
        return { success: false, message: "Failed to create memobook" };
    }
};

export const getMemobooks = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        const userId = session?.user?.id;

        if (!userId) {
            return { success: false, message: "User not found" };
        }

        const memobooksByUser = await db.query.memobooks.findMany({
            where: eq(memobooks.userId, userId),
            with: {
                memos: true
            }
        });

        return { success: true, memobooks: memobooksByUser };
    } catch {
        return { success: false, message: "Failed to get memobooks" };
    }
};

export const getMemobookById = async (id: string) => {
    try {
        const memobook = await db.query.memobooks.findFirst({
            where: eq(memobooks.id, id),
            with: {
                memos: true
            }
        });

        return { success: true, memobook };
    } catch {
        return { success: false, message: "Failed to get memobook" };
    }
};

export const updateMemobook = async (id: string, values: MemobookInsert) => {
    try {
        await db.update(memobooks).set(values).where(eq(memobooks.id, id));
        return { success: true, message: "memobook updated successfully" };
    } catch {
        return { success: false, message: "Failed to update memobook" };
    }
};

export const deleteMemobook = async (id: string) => {
    try {
        await db.delete(memobooks).where(eq(memobooks.id, id));
        return { success: true, message: "memobook deleted successfully" };
    } catch {
        return { success: false, message: "Failed to delete memobook" };
    }
};