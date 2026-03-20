import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
    type: 'content',
    schema: z.object({
        // --- Necessary (Core Metadata) ---
        title: z.string(),
        created_at: z.coerce.date(),
        draft: z.boolean().default(false),

        // --- Optional (Extended Metadata) ---
        subtitle: z.string().optional(),
        description: z.string().optional(),
        updated_at: z.coerce.date().optional(),
        cover: z.string().optional(),
        tags: z.array(z.string()).default([]),
        author: z.string().optional(),
        collaborators: z.array(z.string()).optional(),
    }),
});

export const collections = { docs };
