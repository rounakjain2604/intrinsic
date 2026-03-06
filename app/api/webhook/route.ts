import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { verifyLemonWebhookSignature } from "@/lib/lemon";

interface LemonWebhookPayload {
    meta?: {
        event_name?: string;
        custom_data?: {
            chapter_id?: string;
            chapter_slug?: string;
            user_id?: string;
        };
    };
    data?: {
        id?: string;
        attributes?: {
            identifier?: string;
            order_number?: number;
            created_at?: string;
        };
    };
}

export async function POST(req: Request) {
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature");

    try {
        if (!verifyLemonWebhookSignature(rawBody, signature)) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }
    } catch (error) {
        console.error("[API /webhook] Signature verification error:", error);
        return NextResponse.json({ error: "Webhook configuration error" }, { status: 500 });
    }

    const payload = JSON.parse(rawBody) as LemonWebhookPayload;
    if (payload.meta?.event_name !== "order_created") {
        return NextResponse.json({ received: true });
    }

    const chapterId = payload.meta?.custom_data?.chapter_id;
    const userId = payload.meta?.custom_data?.user_id;
    const lemonOrderId = String(
        payload.data?.id ??
            payload.data?.attributes?.identifier ??
            payload.data?.attributes?.order_number ??
            ""
    );

    if (!chapterId || !userId || !lemonOrderId) {
        return NextResponse.json(
            { error: "Missing purchase metadata in webhook payload" },
            { status: 400 }
        );
    }

    const supabase = createServerClient();
    const { error } = await supabase
        .from("purchases")
        .upsert(
            {
                user_id: userId,
                chapter_id: chapterId,
                lemon_order_id: lemonOrderId,
                purchased_at:
                    payload.data?.attributes?.created_at ?? new Date().toISOString(),
            },
            { onConflict: "lemon_order_id" }
        );

    if (error) {
        console.error("[API /webhook] Failed to record purchase:", error);
        return NextResponse.json({ error: "Failed to record purchase" }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}