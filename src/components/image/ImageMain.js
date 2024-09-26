import { useState } from "react";
import { Link } from 'react-router-dom';
import { loadS3Image } from '../helpers/Functions';

export const ImageMain = ({ image, pageTo, artist, isDownload, text = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className='justify-center w-full relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isDownload ? (
        <a href={pageTo} download target="_blank"> 
          <img 
            alt={artist} 
            src={image} 
            className={`relative ${isHovered ? 'opacity-80' : ''} transition duration-300 ease-in-out`}
          />
        </a>
      ) : (
        <Link to={pageTo}> 
          <img 
            alt={artist} 
            src={image} 
            className={`relative ${isHovered ? 'opacity-80' : ''} transition duration-300 ease-in-out`}
          />
        </Link>
      )}
      {text && (
        <div className={`absolute bottom-0 left-0 z-10 bg-transparent py-2 rounded text-black font-bold text-sm ${isHovered ? 'opacity-100' : 'opacity-0'} transition duration-300 ease-in-out pl-4 pb-4`}>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};
