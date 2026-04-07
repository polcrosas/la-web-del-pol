import React from 'react';
import { Link } from 'react-router-dom';

const CosasDeCasa = () => {
  const videoIds = ['agq5to_akAQ', 'OiY2K_TKBRU', 'MWr8QDxJ0tU'];

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
          <h2>cosas de casa</h2>
          <p>video series made at home (2020)</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', margin: '30px 0' }}>
            {videoIds.map((videoId, index) => (
              <div key={index} className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`Cosas de Casa ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CosasDeCasa;
