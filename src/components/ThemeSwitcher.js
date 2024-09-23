// src/components/ThemeSwitcher.js
import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Ajuste o caminho conforme necessário
import './ThemeSwitcher.css'; // Importa o arquivo CSS

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={`theme-switcher ${theme}`} onClick={toggleTheme}>
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  );
};

export default ThemeSwitcher;
