import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const LogoHeader = () => {
  const location = useLocation();
  const isPolcrosas = location.pathname === '/pol';

  return (
    <div className="bg-transparent top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-2">
      <div>
        <Link to="/pol" className={`text-${isPolcrosas ? 'white' : 'black'} font-bold mr-4`}>pol crosas</Link>
      </div>
      <div>
        <Link to="/bio" className={`text-${isPolcrosas ? 'white' : 'black'} font-bold mr-4`}>bio</Link>
        <a href="mailto:pol.crosas@gmail.com" className={`text-${isPolcrosas ? 'white' : 'black'} font-bold mr-4`}>contact</a>
      </div>
    </div>
  );
};
