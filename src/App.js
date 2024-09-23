import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage';
import LooksPage from './Pages/Looks-page';
import PortfolioPage from './Pages/PortfolioPage';
import DragAndDropPage from './Pages/Drag&DropPage';
import RegisterPage from './Pages/RegisterPage';
import LogosPage from './Pages/LogosPage';
import { ThemeProvider } from './context/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import { AuthProvider } from './components/StorageLoginData'; // Importando AuthProvider

function App() {
  return (
    <ThemeProvider>
      <AuthProvider> {/* Envolva com AuthProvider */}
        <div className="App">
          <ThemeSwitcher />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/looks" element={<LooksPage />} />
            <Route path="/Port" element={<PortfolioPage />} />
            <Route path="/logos" element={<LogosPage />} />
            <Route path="/drag" element={<DragAndDropPage />} />
            <Route path="/regis" element={<RegisterPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
