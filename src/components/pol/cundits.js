import React from 'react';
import { LogoHeader } from "../image/LogoHeader";

const Cundits = () => {
  const pdfUrl = 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/pol/pdfs/cundits.pdf'; // Define pdfUrl variable

  return (
    <div className='bg-white min-h-screen'>
      <LogoHeader />
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        {/* Download Button with similar styling */}
        <a
          href={pdfUrl}
          target="_blank" // Open in a new tab
          rel="noopener noreferrer" // Security best practice for target="_blank"
          className='border-2 border-dashed border-black border-opacity-0 hover:border-opacity-100 px-2 py-1 text-left rounded-xl mt-4' // Margin top to move the button up
        >
          download pdf
        </a>
      </div>
    </div>
  );
};

export default Cundits;
