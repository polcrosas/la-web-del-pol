import React from 'react'
import { LogoHeader } from '../image/LogoHeader'
import { AnimatedAscii } from '../image/asciis/AnimatedAscii'

export const MajinDonPatchInfo = () => {

  const links = [
    { name: 'MAJIN', url: '/polcrosas' },
    { name: 'DOMENEC', url: '/domenecmiralles' },
    { name: 'POL', url: '/polcrosas' },
  ]

  return (
    <div>
      <LogoHeader />
      <div className='grid sm:grid-cols-1 lg:grid-cols-2 mr-8'>
        <div className='text-white ml-8 mr-8 text-justify w-1/2 lg:w-full'>
          <ul className='ml-8 justify-end' style={{ display: 'flex', flexDirection: '' }}>
            {links.map((link, index) => (
              <li key={index} style={{ marginBottom: '10px', marginRight: '20px' }}>
                <a
                  href={link.url}
                  className="link-item"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <h1 className='mb-4'>About</h1>
          <p><em>"You may look cute, Pinky, but there's only one guy here who really brings in the viewers, and that's me!"</em></p><br></br>
          <p>Following Don Patch's death came its evil reincarnation, aka Majin Don Patch, an expert in digital art, entrusted with a deep knowledge of capital's nature and an exquisite understanding of the syntheses and limits of contemporary aesthetics. At the moment it is a collective of two, engaged with the dream to make the world a better place (uncovering aesthetic biases, playing the undead game, fitting the quota and tingling it from within...).</p>

          <h1 className='mt-4 mb-4'>Contact</h1>
          <p>@domenecmirallestagliabue</p>
          <p>@polcrosas</p>
          <h1 className='mt-4'>Artists Bio</h1>
          <br></br>
          <p className='font-bold mb-3'>Pol Crosas</p>
          <p className='mb-8'>Pol Crosas (b. 1999, Barcelona, Spain) is an artist and curator whose practice encompasses film, publishing, artificial intelligence, and the visual and digital arts. He holds a Bachelor's degree in Fine Arts from the University of Barcelona and is currently studying Curatorship and Creation at Elías Querejeta Zine Eskola. Pol has curated and exhibited in various spaces in Barcelona, San Sebastián, and London. He has created and installed publications, video pieces, and sculptures in venues such as Tabakalera, Colour Factory London, Arts Libris, Gallery46, among others. He has curated film cycles, collaborative publications, and concert series at Arts Santa Mònica, Tabakalera, Rocío Santa Cruz, Galeria dels Àngels, Dabadaba, and Pumarejo, among others.</p>
          <p className='font-bold mb-3'>Domenec Miralles</p>
          <p>my categories of mind are: time, divisibility, cod, one piece, hermit mode after finitude... Domenec's themes are a wholesome fetiche and the philosopher's stone. (The will to become a blendergod.) I am lying, from Barcelona, 1997: BA in Film (Central Film School), MA in Philosophy (UPF), BA in Fine Art & History of Art (Goldsmiths), exhibitions in London and Barcelona (•̃ ͜ʖ•̃).</p>
          <br></br>


        </div>

        <div>
          <div className='flex justify-end mt-8'>
            <AnimatedAscii />
          </div>
          {/* <AsciiText/> */}

        </div>
      </div>
    </div>
  )
}
