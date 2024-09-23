import React from 'react';
import { useNavigation } from './useNavigation';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const { popHistory } = useNavigation();
  const navigate = useNavigate();

  const handleBack = () => {
    popHistory();
    navigate(-1); // Voltar uma página no histórico
  };

  return (
    <button onClick={handleBack}>Voltar</button>
  );
};

export default BackButton;
