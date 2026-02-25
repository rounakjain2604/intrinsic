import { NextResponse } from "next/server";
import { syncUser } from "@/lib/supabase/syncUser";
import { toggleChapterComplete } from "@/lib/chapters";

export async function POST(req: Request) {
    try {
        const userId = await syncUser();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { chapterId } = await req.json();
        if (!chapterId) {
            return NextResponse.json(
                { error: "chapterId is required" },
                { status: 400 }
            );
        }

        const completed = await toggleChapterComplete(userId, chapterId);
        return NextResponse.json({ completed });
    } catch (err) {
        console.error("[API /progress] Error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
