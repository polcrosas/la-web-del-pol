import React from 'react';
import { useState } from 'react';
import { LogoHeader } from "../image/LogoHeader";

export const GuerraMundial = () => {
  const [videoId, setVideoId] = useState('84JsUfDeSo0?si=H21i47LjHAKfb4zN');

  return (
    <div className='bg-white pt-4'>
      <LogoHeader />
      
      {/* Video container with grid layout */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4 border-l border-r border-b border-black mt-0 bg-white">
        {/* Video column - spans 1 col on md, 2 cols on lg */}
        <div className="md:col-span-1 lg:col-span-2 border-b border-black md:border-r lg:border-r p-6 bg-white">
          {/* 16:9 aspect ratio container */}
          <div className="relative w-full bg-white" style={{ paddingBottom: '56.25%' }}>
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
        
        {/* Credits column */}
        <div className="border-b border-black bg-white p-6">
          <div className="text-sm font-bold space-y-4">
            <p className="text-base mb-4">CREDITS MIXTAPE GUERRA MUNDIAL</p>
            
            <div className="space-y-1">
              <p>directors. Domenec Miralles & Pol Crosas.</p>
              <p>producer. Pol Crosas. @huidaespectacular1999</p>
              <p>AI videos. Domenec Miralles. @domenekc</p>
              <p>dop. Martin Ávila. @martinavilak</p>
              <p>focus. Pepe Barón. @mellamanbuby</p>
              <p>editor. Joan Colomer. @joan47129540</p>
              <p>art. Martina Montero. @p3pinot</p>
              <p>art assistant. Marina Casellas. @marina.casellas</p>
              <p>stylism. Noemí Galí. @noemigali03</p>
              <p>asistant producer. Sara Domínguez López & Anxo Soilán. @blackpineapple9 & @anxo.soilan</p>
              <p>colorist. Moisés Garriga. @garrigafilm</p>
              <p>colour assistant. Chisco Valdés. @chisco.papi</p>
              <p>post-production supervisor. Alejandro Sanchez @alekues</p>
              <p>graded at Wip. @wip.mov</p>
            </div>
            
            <p className="pt-4">( -_•)︻デ═一</p>
          </div>
        </div>
      </div>
    </div>
  );
};