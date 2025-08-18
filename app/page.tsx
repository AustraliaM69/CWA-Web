
'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <main>
      <h1>Welcome to Next.js!</h1>
      <p>This is a simple Next.js application.</p>
     
      <div className="flex justify-end">
      <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      </div>
    </main>
  );
}
