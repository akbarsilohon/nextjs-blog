import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'posts');
const renderer = new marked.Renderer();
renderer.image = function ({ href, title, text }) {
    return `
        <img 
            src="${href}" 
            alt="${text || ''}" 
            title="${title || ''}" 
            loading="lazy" 
            class="postImage"
        />
    `;
};

marked.use({ renderer });

function urlize(str) {
    if (!str) return '';
    return String(str)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

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

export function getAllPosts() {
    const files = getPostFiles();
    const posts = files.map((file) => getPostMetadata(file));
    return sortPostsByDate(posts);
}

export function getPostsLimit(limitCount = 10) {
    const posts = getAllPosts();
    return posts.slice(0, Math.max(0, limitCount));
}

export function getPostsByCategory(categorySlug, limit = 3, offset = 0) {
    const allPosts = getAllPosts();
    
    const filtered = allPosts.filter(post => {
        if (!post.category) return false;
        const postCatSlug = urlize(post.category); 
        return postCatSlug === categorySlug.toLowerCase();
    });

    return filtered.slice(offset, offset + limit);
}

export function getPostBySlug(slug) {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const htmlContent = marked(content);
    return {
        slug,
        ...data,
        content: htmlContent,
    };
}

export function getPostsByPage(limitCount = 10, offset = 0) {
    const posts = getAllPosts();
    return posts.slice(offset, offset + limitCount);
}