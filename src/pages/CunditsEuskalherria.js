import React from 'react';
import { Link } from 'react-router-dom';

const CunditsEuskalherria = () => {
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
          <h2>cundits en euskalherria</h2>
          <p>documentary about my friends music tour (2023)</p>
          
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/3MDoXISPsZM"
              title="Cundits en Euskalherria"
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

export default CunditsEuskalherria;
