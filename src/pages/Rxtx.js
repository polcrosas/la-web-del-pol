import React from 'react';
import { Link } from 'react-router-dom';

const Rxtx = () => {
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
          <h2>rxtx</h2>
          <p>virtual flamethrower in an online exhibition (2020)</p>
          
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/s9ZI-0z4iNs"
              title="RXTX"
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

export default Rxtx;
