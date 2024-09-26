import React, { useState } from 'react';
import { LogoHeader } from "../image/LogoHeader";

export const Vertical = () => {
  const [videoId, setVideoId] = useState('-lyEMlVZGnI');

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  };

  const iframeStyle = {
    width: '80%',
    height: '80%',
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
