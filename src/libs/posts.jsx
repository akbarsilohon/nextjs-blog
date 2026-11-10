import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

function getPostFiles() {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    return fs.readdirSync(postsDirectory)
        .filter((file) => file.endsWith('.md'));
}

function getPostMetadata(filename) {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    const fileSlug = filename.replace(/\.md$/, '');
    return {
        slug: data.slug || fileSlug,
        ...data,
    };
}

function sortPostsByDate(posts) {
    return posts.sort((a, b) => {
        return new Date(b.date).getTime() -
               new Date(a.date).getTime();
    });
}

export function checkPostsExists() {
    return getPostFiles().length > 0;
}

export function getPostsLimit(limitCount = 10) {
    const files = getPostFiles();
    const posts = files.map((file) => {
        return getPostMetadata(file);
    });
    return sortPostsByDate(posts)
        .slice(0, Math.max(0, limitCount));
}

export function getPostsByCategory(cateName = 'General', limitCount = 10) {
    const files = getPostFiles();
    const posts = files
        .map((file) => getPostMetadata(file))
        .filter((post) => {
            return String(post.category || '').toLowerCase() ===
                   String(cateName).toLowerCase();
        });
    return sortPostsByDate(posts)
        .slice(0, Math.max(0, limitCount));
}

export function getPostBySlug(slug) {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
        slug,
        ...data,
        content,
    };
}

export function getPostsByPage(limitCount = 10, offset = 0) {
    const files = getPostFiles();
    const posts = files.map((file) => {
        return getPostMetadata(file);
    });
    
    return sortPostsByDate(posts)
        .slice(offset, offset + limitCount);
}