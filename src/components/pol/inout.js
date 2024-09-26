import React from 'react';
import { LogoHeader } from "../image/LogoHeader";

const Inout = () => {
  const videoIds = ['gRGq4XQya_A', 'UeFHuBp10QM'];

  const imageUrls = [
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-2.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-3.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-8.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-13.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-11.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-18.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-21.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-23.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-26.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-35.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-41.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-42.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-58.jpg',


    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-75.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-84.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-86.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-95.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-136.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-142.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-152.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-168.jpg',

    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-177.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-184.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/selected/fotos_expo_pol-225.jpg',

  ];


  return (
    <div className='bg-white'>
      <LogoHeader className=''/>
      
      {/* Video Grid */}
      <div className='grid grid-cols-1 mt-16 ml-4 mr-4 md:grid-cols-2 gap-4'>
        {videoIds.map((videoId, index) => (
          <iframe className=' w-full h-screen' 
            key={index}
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
       
          ></iframe>
        ))}
      </div>
      
      {/* Image Grid */}
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 p-4'>
        {imageUrls.map((url, index) => (
          <div key={index} className="image-item">
            <img src={url} alt={`Image ${index}`} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inout;
