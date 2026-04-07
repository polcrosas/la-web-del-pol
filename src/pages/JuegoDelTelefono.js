import React from 'react';
import { Link } from 'react-router-dom';

const JuegoDelTelefono = () => {
  return (
    <div className="container">
      <header className="header">
        <Link to="/">
          <h1>pol crosas</h1>
        </Link>
      </header>
      
      <div className="detail-page">
        <Link to="/" className="back-link">← back to home</Link>
        
        <div className="detail-content">
          <h2>juego del teléfono</h2>
          <p>video essay about language and cameras (2023)</p>
          
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/n0BoP_HJkQ0"
              title="Juego del Teléfono"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JuegoDelTelefono;
