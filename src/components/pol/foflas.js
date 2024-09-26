import React, { useState } from 'react';
import { LogoHeader } from "../image/LogoHeader";

export const Foflas = () => {
  const [videoId, setVideoId] = useState('ZHJE_b56_HM?si=hzvczyECwnalgfNl');

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  };

  // Make the iframe square
  const iframeStyle = {
    width: '80vmin',  // Use vmin to ensure the square scales with the viewport
    height: '80vmin', // height is the same as width
  };

  return (
    <div className='bg-white'>
      <LogoHeader />
      <div style={containerStyle}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={iframeStyle}
        ></iframe>
      </div>
    </div>
  );
};
