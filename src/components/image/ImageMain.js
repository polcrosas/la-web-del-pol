import { useState } from "react";
import { Link } from 'react-router-dom';
import { loadS3Image } from '../helpers/Functions';

export const ImageMain = ({ image, pageTo, artist, isDownload, text = "", year = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const imgEl = (
    <img
      alt={artist}
      src={image}
      decoding="async"
      className={`relative w-full transition duration-300 ease-in-out ${isHovered ? 'opacity-80' : ''}`}
    />
  );

  return (
    <div className='justify-center w-full relative bg-gray-100' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isDownload ? (
        <a href={pageTo} target="_blank" rel="noreferrer">
          {imgEl}
        </a>
      ) : (
        <Link to={pageTo}>
          {imgEl}
        </Link>
      )}
      {text && (
        <div className={`absolute bottom-0 left-0 right-0 z-10 bg-transparent py-2 rounded text-black font-bold text-sm ${isHovered ? 'opacity-100' : 'opacity-0'} transition duration-300 ease-in-out px-4 pb-4 flex justify-between items-end`}>
          <p>{text}</p>
          {year && <p className="ml-4 shrink-0">{year}</p>}
        </div>
      )}
    </div>
  );
};
