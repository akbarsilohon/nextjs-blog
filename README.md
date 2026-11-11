- [ ] Posts
    - [x] List posts perpage
    - [x] Post by category
    - [x] Single Post
        - [x] Main Post
        - [x] Sidebar
        - [x] Related Post
- [ ] Web Pages
- [ ] Standar SEO Website
    - [x] SEO Home Page
    - [x] SEO Single Post
    - [ ] SEO Web Page
    - [x] SEO Category
    - [ ] Sitemap Generator

## Theme Docs

This theme using setting for Dinamic sidebar and Footer. You can custom for your Next.Js Blog.

### Navbar Header
Edit file config/sites.md and find navLinks. For Example:
navLinks:
    - name: "Menu name"
      url: "/url-this-menu"
      hex: "Font Awesome Icon Color"
      icon: "Font Awesome Color"

You can add 2 or more menu.

### Writing Articles (Markdown Guide)
To write a new blog post, create a `.md` file inside the `posts/` directory with the following frontmatter and formatting standards:

#### 1. Frontmatter Structure
```markdown
---
title: "Your Post Title Here"
slug: "your-post-url-slug"
date: "2026-11-11T10:00:00Z"
category: "Category Name"
description: "Short summary or excerpt of your post for SEO."
thumbnail: "your thubmbail url"
---
```