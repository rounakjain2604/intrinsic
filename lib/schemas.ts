import { z } from "zod/v4";

/**
 * Zod schema for chapter MDX frontmatter.
 * Used to runtime-validate frontmatter parsed from .mdx files.
 */
export const chapterFrontmatterSchema = z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    is_free: z.boolean(),
    price_tier: z.enum(["free", "standard", "premium"]),
    price_usd: z.number().optional(),
    order: z.number().optional(),
});

export type ChapterFrontmatter = z.infer<typeof chapterFrontmatterSchema>;
