import { createServerClient } from "@/lib/supabase/server";

// ── Types ──────────────────────────────────────────────────
export interface Chapter {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    order_index: number;
    is_free: boolean;
    price_tier: "free" | "standard" | "premium";
    price_usd: number;
    lemon_product_id: string | null;
    published: boolean;
    created_at: string;
    updated_at: string;
}

// ── Chapter Queries ────────────────────────────────────────

/**
 * Fetch all published chapters, ordered by order_index.
 */
export async function getAllChapters(): Promise<Chapter[]> {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("published", true)
        .order("order_index", { ascending: true });

    if (error) {
        console.error("[chapters] Failed to fetch chapters:", error);
        return [];
    }

    return (data as Chapter[]) ?? [];
}

/**
 * Fetch a single chapter by slug.
 */
export async function getChapterBySlug(
    slug: string
): Promise<Chapter | null> {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("[chapters] Failed to fetch chapter by slug:", error);
        return null;
    }

    return (data as Chapter) ?? null;
}

// ── Access Control ─────────────────────────────────────────

/**
 * Check if a user has access to a chapter.
 * - Free chapters: always accessible (even without userId)
 * - Paid chapters: requires a purchase row in the database
 */
export async function hasChapterAccess(
    userId: string | null,
    chapterId: string
): Promise<boolean> {
    const supabase = createServerClient();

    // First check if the chapter is free
    const { data: chapter } = await supabase
        .from("chapters")
        .select("is_free")
        .eq("id", chapterId)
        .single();

    if (!chapter) return false;
    if (chapter.is_free) return true;

    // Paid chapter — need a userId and a purchase row
    if (!userId) return false;

    const { data: purchase } = await supabase
        .from("purchases")
        .select("id")
        .eq("user_id", userId)
        .eq("chapter_id", chapterId)
        .single();

    return !!purchase;
}

/**
 * Get all chapter IDs the user has purchased.
 */
export async function getUserPurchasedChapterIds(
    userId: string
): Promise<string[]> {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("purchases")
        .select("chapter_id")
        .eq("user_id", userId);

    if (error) {
        console.error("[chapters] Failed to fetch purchases:", error);
        return [];
    }

    return (data ?? []).map((row) => row.chapter_id);
}

// ── Progress Tracking ──────────────────────────────────────

/**
 * Toggle a chapter's completion status.
 * - If already completed: removes the row, returns false
 * - If not completed: inserts a row, returns true
 */
export async function toggleChapterComplete(
    userId: string,
    chapterId: string
): Promise<boolean> {
    const supabase = createServerClient();

    // Check if already completed
    const { data: existing } = await supabase
        .from("user_progress")
        .select("id")
        .eq("user_id", userId)
        .eq("chapter_id", chapterId)
        .single();

    if (existing) {
        // Already completed — remove it
        await supabase
            .from("user_progress")
            .delete()
            .eq("user_id", userId)
            .eq("chapter_id", chapterId);
        return false;
    }

    // Not completed — mark it
    const { error } = await supabase
        .from("user_progress")
        .insert({ user_id: userId, chapter_id: chapterId });

    if (error) {
        console.error("[chapters] Failed to toggle progress:", error);
        return false;
    }

    return true;
}

/**
 * Get all completed chapters for a user.
 */
export async function getUserProgress(
    userId: string
): Promise<{ chapterId: string; completedAt: string }[]> {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("user_progress")
        .select("chapter_id, completed_at")
        .eq("user_id", userId);

    if (error) {
        console.error("[chapters] Failed to fetch progress:", error);
        return [];
    }

    return (data ?? []).map((row) => ({
        chapterId: row.chapter_id,
        completedAt: row.completed_at,
    }));
}
