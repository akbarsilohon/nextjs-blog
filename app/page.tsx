'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [theme, setTheme] = useState('light');

  // Cek tema yang aktif saat halaman dimuat
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(currentTheme);
  }, []);

  // Fungsi untuk mengganti tema
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <main style={{ padding: 'var(--space-8)' }}>
      
    </main>
  );
}