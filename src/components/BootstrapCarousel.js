// src/components/BootstrapCarousel.js
import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BootstrapCarousel.css'; // Adicione um arquivo CSS para estilos específicos, se necessário

const BootstrapCarousel = ({ logos }) => {
  return (
    <Carousel interval={500} controls={true} indicators={true} pause="hover">
      {logos.map((logo, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={logo.src}
            alt={logo.alt}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default BootstrapCarousel;
