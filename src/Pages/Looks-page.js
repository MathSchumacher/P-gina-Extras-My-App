import React, { useEffect } from 'react';
import BackButton from '../components/BackButton';
import './Looks-page.css'; // Importar o arquivo CSS

const LooksPage = () => {
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
    <div className="LooksPage">
      <h1>Looks Page</h1>
      <BackButton />
    </div>
  );
};

export default LooksPage;
