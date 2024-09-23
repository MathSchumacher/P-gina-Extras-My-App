// src/components/StorageLoginData.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Criando um contexto para armazenar os dados de login
const AuthContext = createContext();

// Componente que prover o contexto
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  // Carregar dados de autenticação do localStorage ao carregar o componente
  useEffect(() => {
    const storedData = localStorage.getItem('authData');
    if (storedData) {
      setAuthData(JSON.parse(storedData));
    }
  }, []);

  // Função para fazer o login e salvar no localStorage
  const login = (username, password) => {
    const userData = { username, password };
    setAuthData(userData);
    localStorage.setItem('authData', JSON.stringify(userData));
  };

  // Função para login com Google
  const loginWithGoogle = (profileObj) => {
    const userData = {
      username: profileObj.email, // ou use profileObj.givenName para o nome
      name: profileObj.name,
      imageUrl: profileObj.imageUrl,
      googleId: profileObj.googleId,
    };
    setAuthData(userData);
    localStorage.setItem('authData', JSON.stringify(userData));
  };

  // Função para deslogar
  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('authData');
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
