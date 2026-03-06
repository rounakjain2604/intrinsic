import type { PRICE_TIER_VALUES } from "@/lib/constants";

export type PriceTier = (typeof PRICE_TIER_VALUES)[number];

export interface Chapter {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    order_index: number;
    is_free: boolean;
    price_tier: PriceTier;
    price_usd: number;
    lemon_product_id: string | null;
    published: boolean;
    created_at: string;
    updated_at: string;
}

export interface ChapterProgress {
    chapterId: string;
    completedAt: string;
}

export interface ChapterFrontmatter {
    title: string;
    slug: string;
    description?: string;
    order?: number;
    is_free: boolean;
    price_tier: PriceTier;
    price_usd?: number;
}

export interface TOCHeading {
    id: string;
    text: string;
    level: number;
}

export interface ChapterMDXResult {
    content: React.ReactElement;
    previewContent: React.ReactElement | null;
    frontmatter: ChapterFrontmatter;
    headings: TOCHeading[];
    previewHeadings: TOCHeading[];
    hasPaywallMarker: boolean;
}