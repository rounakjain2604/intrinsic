import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { syncUser } from "@/lib/supabase/syncUser";
import {
    getChapterBySlug,
    hasChapterAccess,
} from "@/lib/chapters";
import { createLemonCheckoutUrl } from "@/lib/lemon";

export async function GET(req: Request) {
    const requestUrl = new URL(req.url);
    const slug = requestUrl.searchParams.get("slug");

    if (!slug) {
        return NextResponse.redirect(new URL("/dashboard", requestUrl));
    }

    const userId = await syncUser();
    if (!userId) {
        const signInUrl = new URL("/sign-in", requestUrl);
        signInUrl.searchParams.set("redirect_url", `/chapters/${slug}`);
        return NextResponse.redirect(signInUrl);
    }

    const chapter = await getChapterBySlug(slug);
    if (!chapter) {
        return NextResponse.redirect(new URL("/dashboard", requestUrl));
    }

    if (chapter.is_free) {
        return NextResponse.redirect(new URL(`/chapters/${slug}`, requestUrl));
    }

    if (!chapter.lemon_product_id) {
        return NextResponse.redirect(new URL(`/chapters/${slug}?checkout=unavailable`, requestUrl));
    }

    const hasAccess = await hasChapterAccess(userId, chapter.id);
    if (hasAccess) {
        return NextResponse.redirect(new URL(`/chapters/${slug}`, requestUrl));
    }

    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0]?.emailAddress;
    if (!email) {
        const signInUrl = new URL("/sign-in", requestUrl);
        signInUrl.searchParams.set("redirect_url", `/chapters/${slug}`);
        return NextResponse.redirect(signInUrl);
    }

    try {
        const checkoutUrl = await createLemonCheckoutUrl({
            variantId: chapter.lemon_product_id,
            chapterId: chapter.id,
            chapterSlug: chapter.slug,
            userId,
            email,
        });

        return NextResponse.redirect(checkoutUrl);
    } catch (error) {
        console.error("[API /checkout] Error:", error);
        return NextResponse.redirect(new URL(`/chapters/${slug}?checkout=unavailable`, requestUrl));
    }
}