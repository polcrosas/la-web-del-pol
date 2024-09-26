import React from 'react';
import { useState } from 'react';
import { LogoHeader } from "../image/LogoHeader";

export const Cundits_EU = () => {
  const [videoId, setVideoId] = useState('3MDoXISPsZM'); // Extracted video ID

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw', // 100% of viewport width
    height: '100vh', // 100% of viewport height
    //backgroundColor: 'pink', // Change background color here
  };

  const iframeStyle = {
    width: '80%', // Adjust the width as needed
    height: '80%', // Adjust the height as needed
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
      >
      </iframe>
    </div>
    </div>

  );
};