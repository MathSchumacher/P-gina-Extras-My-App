import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import './Drag&DropPage.css'; // Importar o arquivo CSS

const DragAndDropPage = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState('');

  // Função para lidar com o início do arrasto
  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
  };

  // Função para lidar com o despejo
  const handleDrop = (event) => {
    event.preventDefault();
    setError('');

    const files = event.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];
      const fileType = file.type;

      if (fileType.startsWith('image/')) {
        // Se for uma imagem, cria um URL e exibe
        const reader = new FileReader();
        reader.onload = (e) => {
          setContent((prevContent) => [
            ...prevContent,
            <img src={e.target.result} alt="Dropped content" className="dropped-item" key={Date.now()} />
          ]);
        };
        reader.readAsDataURL(file);
      } else if (fileType.startsWith('text/')) {
        // Se for um texto, lê e exibe o conteúdo
        const reader = new FileReader();
        reader.onload = (e) => {
          setContent((prevContent) => [
            ...prevContent,
            <pre className="dropped-item dropped-text" key={Date.now()}>{e.target.result}</pre>
          ]);
        };
        reader.readAsText(file);
      } else {
        // Caso o formato não seja aceito
        setError('Formato não aceito');
      }
    } else {
      setError('Formato errado');
    }
  };

  // Função para permitir o despejo
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Lógica de teclas
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
    <div className="DragAndDropPage">
      <h1>Drag and Drop Page</h1>
      <div
        id="draggable-item"
        className="draggable"
        draggable
        onDragStart={handleDragStart}
      >
        Drag me!
      </div>
      <div
        className="dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        Drop here
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="content-container">
        {content.length > 100 && <p className="warning">Número máximo de itens alcançado</p>}
        {content.slice(0, 100)}
      </div>
      <BackButton />
    </div>
  );
};

export default DragAndDropPage;
