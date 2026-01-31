import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        description: z.string().optional(),
        created_at: z.coerce.date().optional(),
        updated_at: z.coerce.date().optional(),
        cover: z.string().optional(),
        tags: z.array(z.string()).optional(),
        author: z.string().optional(),
        collaborators: z.array(z.string()).optional(),
    }),
});

export const collections = { docs };
