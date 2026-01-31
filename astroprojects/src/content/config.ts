import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
    type: 'content',
    // schema: z.object({
    // 	title: z.string().optional(),
    // 	description: z.string().optional(),
    // 	pubDate: z.coerce.date().optional(),
    // 	updatedDate: z.coerce.date().optional(),
    // 	heroImage: z.string().optional(),
    //     tags: z.array(z.string()).optional(),
    // }),
    // Allow loose schema for now as Obsidian files might be messy
});

export const collections = { docs };
