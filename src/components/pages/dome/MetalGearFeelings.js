import React from 'react'
import { LogoHeader } from '../../image/LogoHeader'
import { loadS3Image, loadS3Video } from '../../helpers/Functions'

export const MetalGearFeelings = () => {
  return (
    <div>
      <LogoHeader />
      <div className='grid  sm:grid-cols-1 lg:grid-cols-3 justify-center
        text-white text-justify'>
        <div className='ml-8 mr-8 mb-8'>
          metal_gear_feelings is a fictioning of movements. Two burner phones reproducing the story of Agent Sister’s tragic death, crafted out of synchronised videos: Blender, AI (Stable Diffusion), After Effects, 3d scanning/animating Wren. Exhibited in Goldsmiths, Copeland Gallery, and Gallery46, London.
          <img alt='phone_pic'
            src={loadS3Image('phones_pic2.jpg', 'metal_gear_feelings')}></img>
        </div>
        <div className='col-span-2 flex justify-center items-center '>
          <video
            className='w-11/12'
            src={loadS3Video('phones_video.mp4', 'metal_gear_feelings')}
            //autoPlay
            controls={true}
          //onClick={handleClick}
          ></video>
        </div>
      </div>
    </div>
  )
}
