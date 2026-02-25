import { currentUser } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * Just-in-Time (JIT) User Sync
 *
 * Ensures a user always exists in Supabase even if the Clerk webhook failed.
 * Call this at the TOP of every server page and API route that needs user identity.
 *
 * Returns the Supabase user UUID, or null if not authenticated.
 */
export async function syncUser(): Promise<string | null> {
    try {
        const clerkUser = await currentUser();
        if (!clerkUser) return null;

        const supabase = createServerClient();

        // Try to find existing user
        const { data: existing } = await supabase
            .from("users")
            .select("id")
            .eq("clerk_id", clerkUser.id)
            .single();

        if (existing) return existing.id;

        // User missing from Supabase — create them silently right now
        const { data: created, error } = await supabase
            .from("users")
            .insert({
                clerk_id: clerkUser.id,
                email: clerkUser.emailAddresses[0].emailAddress,
            })
            .select("id")
            .single();

        if (error) {
            console.error("[syncUser] Failed to create user in Supabase:", error);
            return null;
        }

        return created?.id ?? null;
    } catch (err) {
        console.error("[syncUser] Unexpected error:", err);
        return null;
    }
}
