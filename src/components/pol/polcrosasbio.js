import React from 'react';
import { LogoHeader } from "../image/LogoHeader";

const PolCrosasBio = () => {
  return (
    <div className='bg-white'>
      <LogoHeader className='' />
      <div className="text-black font-black p-6 flex flex-col md:flex-row">
        <div className="md:w-1/2">

          <p className="mt-8 mr-8">
            Pol Crosas (b. 1999, Barcelona) is an artist and curator whose practice encompasses film, publishing, artificial intelligence, and visual/digital arts. He holds a Bachelor’s degree in Fine Arts from the University of Barcelona and an MA in Curation and Creation at Elías Querejeta Zine Eskola. He is a member of the art collective Majin Don Patch, working alongside Domenec Miralles in the field of artificial intelligence-driven creation. He is also a member of Barbara Soberana, Barcelona based art curation group.
          </p>

          <p className="mt-6 mr-8 mb-8">
            Pol has curated and exhibited in various spaces in Barcelona, San Sebastián, and London. He has created and installed publications, video pieces, and sculptures in venues such as Tabakalera, Colour Factory London, Arts Libris, Gallery46, among others. He has curated film cycles, collaborative publications, and concert series at Arts Santa Mònica, Tabakalera, Rocío Santa Cruz, Galeria dels Àngels, Dabadaba, and Pumarejo, among others. He has published or self-published over 20 artist books, fanzines, catalogs, and comics.
          </p>
          <p className="mb-80">say hi: pol.crosas@gmail.com</p>

          {/* Social media links */}
          <div className="mb-8 flex space-x-4 font-custom"
          style={{
            fontFamily: 'sans-serif'
          }}
          >
            <a 
              href="https://www.instagram.com/huidaespectacular1999" 
              target="_blank" 
              rel="noreferrer"
              className='border-2 border-dashed border-black border-opacity-0 hover:border-opacity-100 px-2 py-1 text-left rounded-xl'
            >
              instagram
            </a>
            <a 
              href="https://x.com/polcrosas" 
              target="_blank" 
              rel="noreferrer"
              className='border-2 border-dashed border-black border-opacity-0 hover:border-opacity-100 px-2 py-1 text-left rounded-xl'
            >
              twitter
            </a>
            <a 
              href="https://vimeo.com/pol" 
              target="_blank" 
              rel="noreferrer"
              className='border-2 border-dashed border-black border-opacity-0 hover:border-opacity-100 px-2 py-1 text-left rounded-xl'
            >
              vimeo
            </a>
            <a 
              href="https://www.youtube.com/@polcrosas" 
              target="_blank" 
              rel="noreferrer"
              className='border-2 border-dashed border-black border-opacity-0 hover:border-opacity-100 px-2 py-1 text-left rounded-xl'
            >
              youtube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolCrosasBio;
