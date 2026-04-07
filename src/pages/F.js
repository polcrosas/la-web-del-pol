import React from 'react';
import { Link } from 'react-router-dom';

const F = () => {
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
          <h2>barranco fest</h2>
          <p>barranco fest aftermovie with dome (2024)</p>
          
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/tCDvDmz59Qg"
              title="Barranco Fest"
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

export default F;
