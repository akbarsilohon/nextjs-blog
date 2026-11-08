import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getSiteConfig(){
    const filePath = path.join(process.cwd(), 'config', 'sites.md');
    if (!fs.existsSync(filePath)) {
        return {
            siteName: 'Next.Js',
            tagline: 'Next.Js Blogging Theme',
            navLinks: [],
            flexboxMenus: [],
            siteFooter: []
        };
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);

    return matterResult.data;
}