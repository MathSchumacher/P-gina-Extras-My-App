import React, { useEffect } from 'react';
import BackButton from '../components/BackButton';
import './PortfolioPage.css'; // Importar o arquivo CSS

const PortfolioPage = () => {
  const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
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
    <div className="PortfolioPage">
      <h1>Portfolio Page</h1>
      <a href="https://github.com/MathSchumacher" target="_blank" rel="noopener noreferrer">
        https://github.com/MathSchumacher
      </a>
      <BackButton />
    </div>
  );
};

export default PortfolioPage;