import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Direktori tempat file markdown web pages disimpan (ubah jika foldernya berbeda, misal 'content/pages')
const pagesDirectory = path.join(process.cwd(), 'pages');

// Konfigurasi renderer marked khusus untuk gambar (jika halaman statis juga butuh gambar responsif)
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

/**
 * Mengambil data halaman statis berdasarkan slug dengan format URL /p/slug
 * 
 * @param {string} slug - Slug halaman statis
 * @returns {object|null} Data frontmatter dan konten HTML
 */
export function getWebPageBySlug(slug) {
    const filePath = path.join(pagesDirectory, `${slug}.md`);

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