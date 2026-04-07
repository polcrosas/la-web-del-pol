import React from 'react';
import { LogoHeader } from "../image/LogoHeader";

export const Casa = () => {
  // Array of video IDs from the playlist
  const videoIds = ['agq5to_akAQ', 'OiY2K_TKBRU', 'MWr8QDxJ0tU'];

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    overflowX: 'auto', // Enable horizontal scrolling if videos exceed screen width
  };

  const iframeStyle = {
    width: '80vw', // Adjusted width to fit the screen horizontally
    height: 'calc(80vw * 9 / 16)', // Calculate height based on aspect ratio (16:9)
    margin: '10px 10px', // Add some margin between videos
  };

  return (
    <div className='bg-white'>
      <LogoHeader />
      <div style={containerStyle} className='flex flex-col lg:flex-row'>
        {videoIds.map((videoId, index) => (
          <iframe
            key={index}
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={iframeStyle}
          ></iframe>
        ))}
      </div>
    </div>
  );
};
