import React from 'react';
import { Link } from 'react-router-dom';

const Foflas = () => {
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
          <h2>foflas</h2>
          <p>ai generated shitpost with el foflas (2024)</p>
          
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/ZHJE_b56_HM"
              title="Foflas"
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

export default Foflas;
