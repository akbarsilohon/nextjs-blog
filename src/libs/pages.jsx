import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'pages');
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

export function getWebPageBySlug(slug){
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