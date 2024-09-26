import React from 'react'
import { LogoHeader } from '../../image/LogoHeader'

export const SavingVhuVhu = () => {
  return (
    <div>
      <LogoHeader />
      <div className='ml-8 mr-8 text-white mt-8'>
        <div className='mt-8 flex items-center justify-center flex-col'>
          <div>
            <em>Interact: J //
              Spikes: K //
              Move: WASD or ←↑→↓ //
              Menu: ESC </em>
          </div>
          <iframe
            frameborder="0" src="https://itch.io/embed-upload/8475365?color=333333" allowfullscreen="" width="960" height="570"><a href="https://domenecmiralles.itch.io/saving-vh-vh">Play Saving Vhu-vhu on itch.io</a></iframe>
        </div>
      </div>



      {/* <div className='grid grid-cols-2 w-2/3'>
          <img src={loadS3Image('TheFourBeastsOfPhin.png', 'saving_vhuvhu')} alt='1'></img>
          <img src={loadS3Image('TheFourBeatsOfPhin2.png', 'saving_vhuvhu')} alt='2'></img>
          </div> */}

    </div>
  )
}
