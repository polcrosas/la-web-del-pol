import React from 'react';
import { Link } from 'react-router-dom';

const Serbal = () => {
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
          <h2>serbal</h2>
          <p>fanzine made during lockdown (2020)</p>
          
          <div style={{ maxWidth: '800px', margin: '20px 0' }}>
            <img 
              src="https://majindonpatch-public.s3.eu-west-2.amazonaws.com/serbal/serbal_pic.jpg" 
              alt="Serbal" 
              style={{ width: '100%', marginBottom: '20px', border: '1px solid #000' }}
            />
            
            <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
              <em>Et sic in infinitum,</em> is born in 1617 in the treatise <em>Utriusque cosmi maioris scilicet et minoris metaphysica, physica atque technica historia in duo volumina secundum cosmi differentiam divisa</em> by the English Rosicrucian physician, inventor, astrologer, urinomancer, geomancer, and metaphysician, Robert Fludd (1574-1637), whom we conjure as the guardian angel of this fanzine. On page 26 surrounded by four <em>et sic in infinitums,</em> we encounter a black square delineating a map of primordial matter or the primordial being before creation.
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              <a
                href="https://serbalpnticmec.wordpress.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', padding: '10px 20px', border: '1px solid #000', marginRight: '10px', marginBottom: '10px' }}
              >
                website
              </a>
              <a
                href="https://fatbottombooks.com/books/fanzine/serbalpnticmeces-et-sic-infinitum"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', padding: '10px 20px', border: '1px solid #000', marginBottom: '10px' }}
              >
                purchase
              </a>
            </div>
          </div>
          
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/auos2LvZVBQ"
              title="Serbal"
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

export default Serbal;
