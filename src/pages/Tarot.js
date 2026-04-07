import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const tarotImages = [
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_0.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_1.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_2.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_3.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_4.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_5.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_6.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_7.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_8.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_9.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_10.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_11.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_12.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_13.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_14.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_15.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_16.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_17.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_18.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_19.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_20.png',
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_21.png',
];

const Tarot = () => {
  const [question, setQuestion] = useState('');
  const [spread, setSpread] = useState([]);
  const [error, setError] = useState('');

  const generateSpread = () => {
    if (!question.trim()) {
      setError('ask something smh...');
      return;
    }

    setError('');
    const shuffledDeck = [...tarotImages].sort(() => 0.5 - Math.random());
    const drawnCards = shuffledDeck.slice(0, 10);
    setSpread(drawnCards);
  };

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
          <h2>tarot</h2>
          <p style={{ textAlign: 'center' }}>celtic cross spread</p>
          
          <div style={{ maxWidth: '400px', margin: '30px auto', textAlign: 'center' }}>
            <p style={{ marginBottom: '10px' }}>ask your question below:</p>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="your question..."
              style={{ 
                padding: '10px', 
                fontSize: '16px', 
                width: '100%', 
                marginBottom: '10px',
                border: '1px solid #000'
              }}
            />
            {error && <p style={{ color: '#000', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
            <button
              onClick={generateSpread}
              style={{
                padding: '10px 20px',
                border: '1px solid #000',
                background: '#fff',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              spread
            </button>
          </div>

          {spread.length > 0 && (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)', 
              gap: '10px', 
              marginTop: '40px',
              maxWidth: '900px',
              margin: '40px auto'
            }}>
              <div style={{ gridColumn: '4', gridRow: '3' }}>
                <img src={spread[0]} alt="Card 1" style={{ width: '100%' }} />
              </div>
              <div style={{ gridColumn: '4', gridRow: '3', transform: 'rotate(90deg)' }}>
                <img src={spread[1]} alt="Card 2" style={{ width: '100%' }} />
              </div>
              <div style={{ gridColumn: '4', gridRow: '4' }}>
                <img src={spread[2]} alt="Card 3" style={{ width: '100%' }} />
              </div>
              <div style={{ gridColumn: '3', gridRow: '3' }}>
                <img src={spread[3]} alt="Card 4" style={{ width: '100%' }} />
              </div>
              <div style={{ gridColumn: '4', gridRow: '2' }}>
                <img src={spread[4]} alt="Card 5" style={{ width: '100%' }} />
              </div>
              <div style={{ gridColumn: '5', gridRow: '3' }}>
                <img src={spread[5]} alt="Card 6" style={{ width: '100%' }} />
              </div>
              <div style={{ gridColumn: '7', gridRow: '5' }}>
                <img src={spread[6]} alt="Card 7" style={{ width: '100%' }} />
              </div>
              <div style={{ gridColumn: '7', gridRow: '4' }}>
                <img src={spread[7]} alt="Card 8" style={{ width: '100%' }} />
              </div>
              <div style={{ gridColumn: '7', gridRow: '3' }}>
                <img src={spread[8]} alt="Card 9" style={{ width: '100%' }} />
              </div>
              <div style={{ gridColumn: '7', gridRow: '2' }}>
                <img src={spread[9]} alt="Card 10" style={{ width: '100%' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tarot;
