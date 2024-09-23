import React, { useEffect } from 'react';
import BackButton from '../components/BackButton';
import './RegisterPage.css'; // Importar o arquivo CSS

const RegisterPage = () => {
  const handleKeyDown = (event) => {
    // Verifica se o elemento em foco é um campo de entrada
    const target = event.target;
    const isInputField = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

    if (event.key === 'Backspace' && !isInputField) {
      event.preventDefault();
      window.history.back();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="RegisterPage">
      <h1>Register Page</h1>
      <form className="register-form">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Register</button>
      </form>
      <BackButton />
    </div>
  );
};

export default RegisterPage;
