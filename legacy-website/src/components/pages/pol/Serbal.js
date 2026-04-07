import React from 'react';
import { LogoHeader } from '../../image/LogoHeader';
import { loadS3Image } from '../../helpers/Functions';

const links = [
  { name: 'instagram', url: 'https://www.instagram.com/serbal.pntic.mec.es/' },
  { name: 'website', url: 'https://serbalpnticmec.wordpress.com' },
  { name: 'purchase', url: 'https://fatbottombooks.com/books/fanzine/serbalpnticmeces-et-sic-infinitum' },
];

export const Serbal = () => {
  return (
    <div className="bg-white">
      <LogoHeader className="" />
      <div className="flex flex-col items-center justify-center md:flex-row md:px-8">
        <div className="mb-8 md:w-1/2 md:mr-8 mt-16">
          <img className="w-full mb-4 px-4" alt="serbal_pic" src={loadS3Image('serbal_pic.jpg', 'serbal')} />
          <div className="xt-black font-black p-6 flex flex-col md:flex-row text-left mb-4 px-4">
            <p>
              <em>Et sic in infinitum,</em> is born in 1617 in the treatise <em>Utriusque cosmi maioris scilicet et minoris metaphysica, physica atque technica historia in duo volumina secundum cosmi differentiam divisa</em> by the English Rosicrucian physician, inventor, astrologer, urinomancer, geomancer, and metaphysician, Robert Fludd (1574-1637), whom we conjure as the guardian angel of this fanzine. On page 26 surrounded by four <em>et sic in infinitums,</em> we encounter a black square delineating a map of primordial matter or the primordial being before creation.
            </p>
          </div>
          <ul className="flex flex-wrap justify-center mb-4">
            {links.map((link, index) => (
              <li key={index} className="mr-4 mb-4">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-dashed border-black border-opacity-0 hover:border-opacity-100 px-2 py-1 text-left rounded-xl"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full">
          <iframe
            className='flex flex-col items-center justify-center w-full h-screen mt-16 px-4 pb-32'
            src={`https://www.youtube.com/embed/auos2LvZVBQ`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          >
          </iframe>
        </div>
      </div>
    </div>
  );
};
