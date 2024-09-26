import React from 'react'
import { LogoHeader } from '../../image/LogoHeader'
import { loadS3Image, loadS3Video } from '../../helpers/Functions'

export const PeepingDeath = () => {
  return (
    <div className='text-white'>
      <LogoHeader />
      <p className='ml-16 mr-16 mb-8'>
        modified microphone stand, TFT screen, media player, magnifying lens, crocodile clips
      </p>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 mt-8'>

        <div className='mb-8'>
          <img alt='gif_bobobo'
            src={loadS3Image('bobobo_setup.gif', 'peeping_death')}>
          </img>

        </div>
        <video
          src={loadS3Video('PeepingDEATH.mp4', 'peeping_death')}
          controls>
        </video>
      </div>
    </div>
  )
}
