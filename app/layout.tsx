import React from 'react';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { getSiteConfig } from '@/src/libs/sites';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

import '../style/main.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({children}: {
  children: React.ReactNode;
}) {
  const config = getSiteConfig();
  return(
    <html lang="en" suppressHydrationWarning>
      <head>
      <link rel="shortcut icon" href={config.favicon} type="image/x-icon" />
      <link rel="apple-touch-icon" href={config.favicon} />
        <link 
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css"
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        <Script
          id="theme-switcher-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                if (storedTheme === 'dark') {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className}`} style={{ fontFamily: 'var(--font-sans)' }}>
        <Header config={config} />
        <div className="container">
          { children }
        </div>
        <Footer config={config} />
      </body>
    </html>
  )
}