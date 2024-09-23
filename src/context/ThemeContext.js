import React, { createContext, useContext, useState, useEffect } from 'react';

// Definições dos temas
const themes = {
  light: {
    '--background-color': '#ffffff',
    '--text-color': '#000000',
    '--info-background-color': '#f0f0f0',
    '--info-background-color-opposite': '#333',
    '--info-text-color': '#333',
    '--info-text-color-opposite': '#ffffff', // Cor oposta
    '--info-border-color': '#ccc',
    '--location-background-color': 'rgba(255, 255, 255, 0.8)', // Fundo da localização no modo claro
    '--location-text-color': '#000',                            // Texto da localização no modo claro
  },
  dark: {
    '--background-color': '#000000',
    '--text-color': '#ffffff',
    '--info-background-color': '#333',
    '--info-background-color-opposite': '#f0f0f0',
    '--info-text-color': '#f0f0f0',
    '--info-border-color': '#fff',
    '--location-background-color': 'rgba(0, 0, 0, 0.8)',        // Fundo da localização no modo escuro
    '--location-text-color': '#fff',
    '--info-text-color-opposite': '#000000', // Cor oposta                            
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Mudar tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    // Aplicar variáveis CSS no documento
    const root = document.documentElement;
    const themeVariables = themes[theme];
    Object.keys(themeVariables).forEach((key) => {
      root.style.setProperty(key, themeVariables[key]);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
