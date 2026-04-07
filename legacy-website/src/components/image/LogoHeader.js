import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const LogoHeader = ({ onBioToggle, bioOpen }) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="flex justify-between items-center px-4 py-3 mx-4 border border-black mb-0 bg-white" style={{borderRightWidth: '1px'}}>
      <Link to="/" className="text-black font-bold">pol crosas</Link>
      {isHome && (
        <button
          onClick={onBioToggle}
          className={`font-bold bg-transparent border-0 cursor-pointer p-0 ${bioOpen ? 'opacity-50' : ''}`}
        >
          bio
        </button>
      )}
    </div>
  );
};
