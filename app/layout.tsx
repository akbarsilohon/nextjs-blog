import React from 'react';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
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
      </head>
      <body className={`${inter.className}`} style={{ fontFamily: 'var(--font-sans)' }}>
        <Suspense fallback={null}>
          <Header config={config} />
        </Suspense>
        <div className="container">
          { children }
        </div>
        <Footer config={config} />
      </body>
    </html>
  )
}