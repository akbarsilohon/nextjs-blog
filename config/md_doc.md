[**Silohon**](/) - Cara penulisan markdown atau (md), disini saya hanya mencoba saja untuk desain css dan juga belajar cara cara penulisan di blog menggunakan markdown.

### List ul dan ol
Dokumentasi untuk ul bisa kamu tulis seperti ini:
- ul list
- ul list

Sedangkan untuk Ol juga hampir sama, hanya saja menggunakan angka, contoh:
1. ol list
2. ol list
3. ol list

> **_Ini adalah contoh blockquote_**: Coba kamu perhatikan, kamu hanya perlu menulis seperti ini saja dan udah dirender menggunakan tag HTML, magic bukan? hehehehe.

#### Contoh Artikel dengan Gambar Unsplash
Berikut adalah ilustrasi tampilan dari artikel kita kali ini:

![Coding Setup di Meja Kerja](https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop)

Atau jika ingin menggunakan gambar kategori lain dengan ukuran dinamis:

![Ilustrasi Kopi dan Laptop](https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop "Suasana ngoding tengah malam")

#### Contoh Penulisan Tabel 4 Kolom di Markdown

Berikut adalah contoh tabel data dengan 4 kolom untuk perbandingan framework atau spesifikasi:

| No | Nama Framework | Bahasa Utama | Performa |
| :--- | :--- | :--- | :--- |
| 1 | Next.js | JavaScript / TypeScript | Sangat Cepat (SSR/SSG) |
| 2 | Laravel | PHP | Tangguh (MVC Backend) |
| 3 | React Native | JavaScript / TypeScript | Mobile Cross-Platform |
| 4 | Vue.js | JavaScript | Ringan & Fleksibel |

#### 1. PHP (Contoh helper fungsi filesystem & matter)
```php
<?php
namespace App\Services;

class PostService {
    public function getPostBySlug(string $slug): ?array {
        $filePath = posts_path("{$slug}.md");
        if (!file_exists($filePath)) {
            return null;
        }
        return ['slug' => $slug, 'status' => 'active'];
    }
}
```

#### Javascript

``` javascript
function urlize(str) {
    if (!str) return '';
    return String(str)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

console.log(urlize("Belajar Next.js 15 & Pure CSS!"));
```

#### Java

``` java
public class BlogPost {
    private String title;
    private String slug;

    public BlogPost(String title, String slug) {
        this.title = title;
        this.slug = slug;
    }

    public void displayInfo() {
        System.out.println("Post: " + title + " (/post/" + slug + ")");
    }
}
```

#### Penulisan Css

``` css
:root {
    --text-primary: #111827;
    --text-secondary: #4b5563;
    --accent-color: #0070f3;
}

.postContent {
    font-family: system-ui, -apple-system, sans-serif;
    color: var(--text-primary);
    line-height: 1.7;
}
```

#### Penulisan HTML

``` HTML
<article class="singlePostContainer">
    <header class="postHeader">
        <h1>Panduan Lengkap Next.js 15</h1>
        <div class="postMeta">
            <span class="postCat">Teknologi</span>
            <time datetime="2026-11-11">11 Nov 2026</time>
        </div>
    </header>
    <div class="postContent">
        <p>Isi artikel markdown yang sudah dirender menjadi HTML...</p>
    </div>
</article>
```