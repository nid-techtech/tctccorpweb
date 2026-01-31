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
            if (file.endsWith('.md')) {
                filelist.push(filePath);
            }
        }
    });
    return filelist;
}

// 1. Build map of filename -> slug
const fileMap = new Map();
const files = walkSync(contentDir);

files.forEach(file => {
    const relativePath = path.relative(contentDir, file);
    // Slug is relative path without extension, holding directory structure
    // e.g. blog\welcome25.md -> blog/welcome25
    // Windows path separator handling
    const slug = relativePath.replace(/\\/g, '/').replace(/\.md$/, '');
    const filename = path.basename(file, '.md');

    // Store both exact match and slug match
    // Obsidian often links by filename unique
    fileMap.set(filename, slug);
});

console.log('File Map built:', fileMap);

// 2. Process files
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let hasFrontmatter = content.trim().startsWith('---');
    let title = 'Untitled';
    let lines = content.split('\n');
    let body = content;

    if (!hasFrontmatter) {
        // Extract H1 extraction
        // Look for first # Title
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('# ')) {
                title = lines[i].trim().substring(2).trim();
                // Remove H1 line
                lines.splice(i, 1);
                body = lines.join('\n').trim();
                break;
            }
        }

        // Create frontmatter
        const frontmatter = `---
title: "${title}"
created_at: "${new Date().toISOString()}"
updated_at: "${new Date().toISOString()}"
---
`;
        content = frontmatter + body;
        console.log(`Added frontmatter to ${path.basename(file)}`);
    }

    // 3. Replace Wikilinks [[link]] or [[link|text]]
    // Regex for [[...]]
    content = content.replace(/\[\[(.*?)\]\]/g, (match, p1) => {
        const parts = p1.split('|');
        const linkTarget = parts[0].trim();
        const linkText = parts.length > 1 ? parts[1].trim() : linkTarget;

        // Resolve linkTarget
        // Logic: if linkTarget matches a filename in map, use the slug.
        // If not, keep as is or try relative?
        // Obsidian allows linking by filename across folders.

        let targetSlug = fileMap.get(linkTarget);
        if (!targetSlug) {
            // Try to see if it's already a path
            // e.g. blog/welcome25
            // If not found, maybe invalid link
            console.warn(`Link target not found: ${linkTarget} in ${path.basename(file)}`);
            return match; // Keep as is if broken
        }

        // Construct markdown link
        return `[${linkText}](/${targetSlug})`;
    });

    fs.writeFileSync(file, content);
});

console.log('Migration complete.');
