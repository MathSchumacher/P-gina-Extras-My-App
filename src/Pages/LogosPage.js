// src/Pages/LogosPage.js
import React, { useEffect } from 'react';
import BackButton from '../components/BackButton'; // Certifique-se de que o caminho está correto
import BootstrapCarousel from '../components/BootstrapCarousel'; // Importar o novo componente BootstrapCarousel
import './LogosPage.css'; // Importar o arquivo CSS

const logos = [
  { src: process.env.PUBLIC_URL + '/logos/apple-black-logo-svgrepo-com.svg', alt: 'Logo 1' },
  { src: process.env.PUBLIC_URL + '/logos/coca-cola-logo-svgrepo-com.svg', alt: 'Logo 2' },
  { src: process.env.PUBLIC_URL + '/logos/facebook-2-logo-svgrepo-com.svg', alt: 'Logo 3' },
  { src: process.env.PUBLIC_URL + '/logos/google-icon-logo-svgrepo-com.svg', alt: 'Logo 4' },
  { src: process.env.PUBLIC_URL + '/logos/mcdonald-s-15-logo-svgrepo-com.svg', alt: 'Logo 5' },
  { src: process.env.PUBLIC_URL + '/logos/spotify-1-logo-svgrepo-com.svg', alt: 'Logo 6' },
];

const LogosPage = () => {
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
    <div className="LogosPage">
      <h1>Logos Page</h1>
      <BackButton />
      <BootstrapCarousel logos={logos} /> {/* Use o novo componente BootstrapCarousel aqui */}
    </div>
  );
};

export default LogosPage;
