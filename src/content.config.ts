import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    topic: z.enum(['AI & PMM', 'Positioning', 'Customer Insight', 'GTM', 'Enablement']),
    kind: z.enum(['POV', 'Field Note', 'Essay']),
    readTime: z.string(),
    featured: z.boolean().default(false),
    sourceUrl: z.url().optional(),
    sourceLabel: z.string().optional(),
    generated: z.boolean().default(false),
    draft: z.boolean().default(false)
  })
});

export const collections = { writing };
