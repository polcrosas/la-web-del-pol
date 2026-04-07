import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { loadS3Image } from '../helpers/Functions';

export const ImageMain = ({ image, pageTo, artist, isDownload, text = "", year = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMobileText, setShowMobileText] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMobileClick = (e) => {
    // Only handle on mobile (screens smaller than md breakpoint)
    if (window.innerWidth < 768) {
      if (!showMobileText) {
        // First click: show text
        e.preventDefault();
        setShowMobileText(true);
      } else {
        // Second click: navigate (let default behavior happen)
        if (!isDownload) {
          navigate(pageTo);
        }
      }
    }
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
    <div className='justify-center w-full relative border-r border-b border-black' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isDownload ? (
        <a href={pageTo} target="_blank" rel="noreferrer" onClick={handleMobileClick}>
          {imgEl}
        </a>
      ) : (
        <div onClick={handleMobileClick}>
          <Link to={pageTo}>
            {imgEl}
          </Link>
        </div>
      )}
      {text && (
        <div className={`absolute bottom-0 left-0 right-0 z-10 bg-transparent py-2 rounded text-black font-bold text-sm transition duration-300 ease-in-out px-4 pb-4 flex justify-between items-end ${showMobileText ? 'opacity-100' : 'opacity-0'} md:opacity-0 ${isHovered ? 'md:opacity-100' : ''}`}>
          <p>{text}</p>
          {year && <p className="ml-4 shrink-0">{year}</p>}
        </div>
      )}
    </div>
  );
};
