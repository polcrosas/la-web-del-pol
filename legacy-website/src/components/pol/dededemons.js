import React from 'react';
import { LogoHeader } from "../image/LogoHeader";

const Dededemons = () => {
  const pdfUrl = 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/dededemons/dededemons.pdf'; // Define pdfUrl variable

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw', // 100% of viewport width
    height: '100vh', // 100% of viewport height
  };

  const iframeStyle = {
    width: '80%', // Adjust the width as needed
    height: '80%', // Adjust the height as needed
  };

  const buttonStyle = {
    marginTop: '10px', // Adjust margin top as needed
  };

  return (
    <div className='bg-green-300 min-h-screen'>
      <LogoHeader />
      <div style={containerStyle}>
        {/* Iframe for web */}
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          frameBorder="0"
          style={iframeStyle}
        ></iframe>
        {/* Button with anchor tag */}
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={buttonStyle}>
          download pdf
        </a>
      </div>
    </div>
  );
};

export default Dededemons;
