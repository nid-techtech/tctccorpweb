import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, 'src/content/docs');

// Helper to walk directory
function walkSync(dir, filelist = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            filelist = walkSync(filePath, filelist);
        } else {
            // Process both .md and .mdx, but target conversion to .mdx
            if (file.endsWith('.md') || file.endsWith('.mdx')) {
                filelist.push(filePath);
            }
        }
    });
    return filelist;
}

// 1. Build map for linking
const fileMap = new Map();
const files = walkSync(contentDir);

files.forEach(file => {
    const relativePath = path.relative(contentDir, file);
    // Slug base: remove extension
    const slug = relativePath.replace(/\\/g, '/').replace(/(\.mdx|\.md)$/, '');
    const filename = path.basename(file).replace(/(\.mdx|\.md)$/, '');
    fileMap.set(filename, slug);
});

console.log('File Map built.');

// 2. Process files
files.forEach(file => {
    // Skip template files if any (though user said template.mdx is reference)
    if (file.includes('template.mdx') || file.includes('公開用テンプレート.md')) return;

    let content = fs.readFileSync(file, 'utf8');
    let hasFrontmatter = content.trim().startsWith('---');
    let frontmatterRaw = '';
    let body = content;
    
    // Parse existing frontmatter/body
    if (hasFrontmatter) {
        const parts = content.split('---');
        // parts[0] is empty, parts[1] is fm, parts[2...] is body
        frontmatterRaw = parts[1];
        body = parts.slice(2).join('---').trim(); // Rejoin in case body has ---
    } else {
        // Extract Title from H1 if H1 exists
        let lines = content.split('\n');
        let title = 'Untitled';
        for (let i = 0; i < lines.length; i++) {
             if (lines[i].trim().startsWith('# ')) {
                 title = lines[i].trim().substring(2).trim();
                 lines.splice(i, 1); // remove H1
                 body = lines.join('\n').trim();
                 break;
             }
        }
        frontmatterRaw = `\ntitle: "${title}"\n`;
    }

    // Helper to extract value from frontmatter string
    const getValue = (key) => {
        const match = frontmatterRaw.match(new RegExp(`${key}:\\s*(.*)`));
        return match ? match[1].trim().replace(/^"|"$/g, '') : null;
    };

    // Current values or defaults
    const currentTitle = getValue('title') || 'Untitled';
    const currentCreatedAt = getValue('created_at') || new Date().toISOString().split('T')[0];
    const currentUpdatedAt = getValue('updated_at') || new Date().toISOString().split('T')[0];
    const currentDescription = getValue('description') || '';
    const currentCover = getValue('cover') || ''; // Default empty or placeholder
    const currentTags = getValue('tags') || '[]'; // Keep as string for now if array format
    const currentSubtitle = getValue('subtitle') || '';
    const currentAuthor = getValue('author') || 'TCTC Member';

    // Construct new Frontmatter
    const newFrontmatter = `---
title: "${currentTitle}"
subtitle: "${currentSubtitle}"
description: "${currentDescription}"
created_at: "${currentCreatedAt}"
updated_at: "${currentUpdatedAt}"
cover: "${currentCover}"
author: "${currentAuthor}"
tags: ${currentTags.startsWith('[') ? currentTags : '[]'}
---
`;

    // Wikilink replacement logic
    body = body.replace(/\[\[(.*?)\]\]/g, (match, p1) => {
        const parts = p1.split('|');
        const linkTarget = parts[0].trim();
        const linkText = parts.length > 1 ? parts[1].trim() : linkTarget;
        
        // Link target matching
        let targetSlug = fileMap.get(linkTarget);
        if (!targetSlug) {
            // Try simplified matching (e.g. if target is "file.md")
            const cleanTarget = linkTarget.replace(/(\.mdx|\.md)$/, '');
            targetSlug = fileMap.get(cleanTarget);
        }
        
        if (targetSlug) {
             return `[${linkText}](/${targetSlug})`;
        } else {
             return match;
        }
    });

    const newContent = newFrontmatter + body;
    
    // Determine new filepath (.md -> .mdx)
    const newFilePath = file.replace(/\.md$/, '.mdx');
    
    fs.writeFileSync(newFilePath, newContent);
    console.log(`Processed: ${path.basename(newFilePath)}`);

    // Remove old .md file if name changed
    if (file.endsWith('.md')) {
        fs.unlinkSync(file);
        console.log(`Removed old file: ${path.basename(file)}`);
    }
});

console.log('Migration to MDX complete.');
