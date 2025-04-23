import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if there's a theme in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    // If not, check user's preferred color scheme
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return savedTheme;
  });

  useEffect(() => {
    // Update the document with the current theme
    const root = window.document.documentElement;
    
    // Remove both classes and then add the current one
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    
    // Save the theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};