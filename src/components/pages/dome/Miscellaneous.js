import React from 'react'
import { LogoHeader } from '../../image/LogoHeader'

export const Miscellaneous = () => {

  const links = [
    { name: 'THE PHENOMENOLOGY OF FRIENDS (JAVASCRIPT)', url: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/friend_phenomenology/friendship_phenomenology.zip' },
    { name: 'LA VOLUNTAD DE GONZO Y LA DUDA DEL MAGO MERLIÓN (BOOK)', url: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/miscellaneous/La+Voluntad+de+Gonzo+y+la+Duda+del+Mago+Merlio%CC%81n+Segunda+Edicion+5.pdf' },
    { name: 'ENTRA LA SERIEDAD EN UN RIZOMA DE COMEDIA PASTICHE (BOOK)', url: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/miscellaneous/Seriedad+en+el+Rizoma%2C+LIBRO+2.pdf' },
    { name: 'A MODEST RPG (HTML5)', url: 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/miscellaneous/a_modest_rpg.zip' },
  ];

  return (
    <div>
      <LogoHeader />
      <div className='text-white ml-8'>
        <ul>
          {links.map((link, index) => (
            <li key={index} style={{ marginBottom: '10px', marginRight: '20px' }}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-item"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
