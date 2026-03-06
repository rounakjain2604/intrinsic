import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { createServerClient } from "@/lib/supabase/server";

const subscribeSchema = z.object({
    email: z.email(),
});

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const parsed = subscribeSchema.safeParse(json);

        if (!parsed.success) {
            return NextResponse.json(
                { message: "Enter a valid email address." },
                { status: 400 }
            );
        }

        const supabase = createServerClient();
        const { error } = await supabase
            .from("email_subscribers")
            .upsert({ email: parsed.data.email.toLowerCase() }, { onConflict: "email" });

        if (error) {
            console.error("[API /subscribe] Error:", error);
            return NextResponse.json(
                { message: "Could not save your email right now. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: "You’re in. Check your inbox.",
        });
    } catch (error) {
        console.error("[API /subscribe] Unexpected error:", error);
        return NextResponse.json(
            { message: "Could not save your email right now. Please try again." },
            { status: 500 }
        );
    }
}