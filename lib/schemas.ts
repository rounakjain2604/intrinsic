import { z } from "zod/v4";
import { PRICE_TIER_VALUES } from "@/lib/constants";
import type { ChapterFrontmatter } from "@/lib/types";

/**
 * Zod schema for chapter MDX frontmatter.
 * Used to runtime-validate frontmatter parsed from .mdx files.
 */
export const chapterFrontmatterSchema: z.ZodType<ChapterFrontmatter> = z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    is_free: z.boolean(),
    price_tier: z.enum(PRICE_TIER_VALUES),
    price_usd: z.number().optional(),
    order: z.number().optional(),
});
