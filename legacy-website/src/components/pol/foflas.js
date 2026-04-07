import React, { useState } from 'react';
import { LogoHeader } from "../image/LogoHeader";

export const Foflas = () => {
  const [videoId, setVideoId] = useState('ZHJE_b56_HM?si=hzvczyECwnalgfNl');

  return (
    <div className='bg-white pt-4'>
      <LogoHeader />
      
      {/* Video container with grid layout */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4 border-l border-r border-b border-black mt-0 bg-white">
        {/* Empty left column on large screens */}
        <div className="hidden lg:block border-r border-b border-black bg-white" />
        
        {/* Video column - centered, spans 1 col */}
        <div className="border-b border-black md:border-r lg:border-r p-6 bg-white">
          {/* 1:1 aspect ratio container (square) */}
          <div className="relative w-full bg-white" style={{ paddingBottom: '100%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>
        
        {/* Empty right column on large screens */}
        <div className="hidden lg:block border-b border-black bg-white" />
      </div>
    </div>
  );
};
