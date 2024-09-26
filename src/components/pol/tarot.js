import React, { useState } from 'react';
import { LogoHeader } from "../image/LogoHeader";

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
  'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dogs/dogs_22.png'
];

const Tarot = () => {
  const [question, setQuestion] = useState('');
  const [spread, setSpread] = useState([]);

  const generateSpread = () => {
    const shuffledDeck = [...tarotImages].sort(() => 0.5 - Math.random());
    const drawnCards = shuffledDeck.slice(0, 10); // Draw 10 cards for Celtic Cross
    setSpread(drawnCards);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px',
    backgroundColor: 'white',
    color: 'black',
  };

  // Adjust card size for mobile and desktop
  const cardStyle = {
    width: '100%', 
    height: 'auto',
  };

  // Dynamic grid for mobile and desktop
  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)', // 7 columns for large screens
    gap: '10px',
    justifyItems: 'center',
    marginTop: '20px',
  };

  // Update card position for better layout
  const cardPosition = {
    card1: { gridColumn: '4', gridRow: '3' },
    card2: { gridColumn: '4', gridRow: '3', transform: 'rotate(90deg)' }, // Overlaps card1 horizontally
    card3: { gridColumn: '4', gridRow: '4' },
    card4: { gridColumn: '3', gridRow: '3' },
    card5: { gridColumn: '4', gridRow: '2' },
    card6: { gridColumn: '5', gridRow: '3' },
    card7: { gridColumn: '7', gridRow: '5' },
    card8: { gridColumn: '7', gridRow: '4' },
    card9: { gridColumn: '7', gridRow: '3' },
    card10: { gridColumn: '7', gridRow: '2' }
  };

  const questionInputStyle = {
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    maxWidth: '400px',
    marginBottom: '20px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <div className="bg-white h-screen">
      <LogoHeader />
      <div className="flex justify-center">
        <div className="flex justify-center flex-col lg:w-1/6 md:w-1/5 sm:w-1/2 items-center">
          <h1 className="text-2xl font-bold">celtic cross spread</h1>
          <p>ask your question below:</p>
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            placeholder="your question..."
            style={questionInputStyle}
          />
          <button onClick={generateSpread} className="border-2 border-dashed border-black border-opacity-0 hover:border-opacity-100 px-2 py-1 text-left rounded-xl">
            spread
          </button>
        </div>
      </div>

      {spread.length > 0 && (
        <div className="bg-white" style={gridContainerStyle}>
          <div style={{ ...cardStyle, ...cardPosition.card1 }}>
            <img src={spread[0]} alt="Card 1" style={cardStyle} />
          </div>
          <div style={{ ...cardStyle, ...cardPosition.card2 }}>
            <img src={spread[1]} alt="Card 2" style={cardStyle} />
          </div>
          <div style={{ ...cardStyle, ...cardPosition.card3 }}>
            <img src={spread[2]} alt="Card 3" style={cardStyle} />
          </div>
          <div style={{ ...cardStyle, ...cardPosition.card4 }}>
            <img src={spread[3]} alt="Card 4" style={cardStyle} />
          </div>
          <div style={{ ...cardStyle, ...cardPosition.card5 }}>
            <img src={spread[4]} alt="Card 5" style={cardStyle} />
          </div>
          <div style={{ ...cardStyle, ...cardPosition.card6 }}>
            <img src={spread[5]} alt="Card 6" style={cardStyle} />
          </div>
          <div style={{ ...cardStyle, ...cardPosition.card7 }}>
            <img src={spread[6]} alt="Card 7" style={cardStyle} />
          </div>
          <div style={{ ...cardStyle, ...cardPosition.card8 }}>
            <img src={spread[7]} alt="Card 8" style={cardStyle} />
          </div>
          <div style={{ ...cardStyle, ...cardPosition.card9 }}>
            <img src={spread[8]} alt="Card 9" style={cardStyle} />
          </div>
          <div style={{ ...cardStyle, ...cardPosition.card10 }}>
            <img src={spread[9]} alt="Card 10" style={cardStyle} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tarot;
