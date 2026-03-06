import crypto from "node:crypto";
import { getAppUrl, getRequiredEnv } from "@/lib/env";

const LEMON_API_URL = "https://api.lemonsqueezy.com/v1/checkouts";

interface CreateCheckoutInput {
    variantId: string;
    chapterId: string;
    chapterSlug: string;
    userId: string;
    email: string;
}

interface LemonCheckoutResponse {
    data?: {
        attributes?: {
            url?: string;
        };
    };
    errors?: Array<{ detail?: string }>;
}

export async function createLemonCheckoutUrl({
    variantId,
    chapterId,
    chapterSlug,
    userId,
    email,
}: CreateCheckoutInput): Promise<string> {
    const apiKey = getRequiredEnv("LEMON_SQUEEZY_API_KEY");
    const storeId = getRequiredEnv("LEMON_SQUEEZY_STORE_ID");
    const appUrl = getAppUrl();

    const response = await fetch(LEMON_API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
        },
        body: JSON.stringify({
            data: {
                type: "checkouts",
                attributes: {
                    checkout_data: {
                        email,
                        custom: {
                            chapter_id: chapterId,
                            chapter_slug: chapterSlug,
                            user_id: userId,
                        },
                    },
                    checkout_options: {
                        embed: false,
                        media: true,
                        logo: true,
                    },
                    product_options: {
                        redirect_url: `${appUrl}/chapters/${chapterSlug}?purchase=success`,
                    },
                },
                relationships: {
                    store: {
                        data: {
                            type: "stores",
                            id: storeId,
                        },
                    },
                    variant: {
                        data: {
                            type: "variants",
                            id: variantId,
                        },
                    },
                },
            },
        }),
    });

    const payload = (await response.json()) as LemonCheckoutResponse;

    if (!response.ok || !payload.data?.attributes?.url) {
        const errorMessage = payload.errors?.[0]?.detail ?? "Failed to create Lemon Squeezy checkout.";
        throw new Error(errorMessage);
    }

    return payload.data.attributes.url;
}

export function verifyLemonWebhookSignature(rawBody: string, signature: string | null): boolean {
    if (!signature) {
        return false;
    }

    const secret = getRequiredEnv("LEMON_SQUEEZY_WEBHOOK_SECRET");
    const expected = crypto
        .createHmac("sha256", secret)
        .update(rawBody)
        .digest("hex");

    if (expected.length !== signature.length) {
        return false;
    }

    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}