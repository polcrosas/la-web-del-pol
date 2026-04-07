import React from 'react';
import { Link } from 'react-router-dom';

const Vertical = () => {
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
          <h2>vertical (but rather be horizontal)</h2>
          <p>video poem with cameras and the sea (2021)</p>
          
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/-lyEMlVZGnI"
              title="Vertical"
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

export default Vertical;
