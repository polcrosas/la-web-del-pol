import React from 'react';
import { LogoHeader } from '../image/LogoHeader';
import { Carousel } from '@mantine/carousel';

const Volum = () => {
  // Array of image URLs for the first carousel
  const firstCarouselImages = [
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/volum/recull_2.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/volum/recull_1.jpg',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/volum/recull.jpg',
  ];

  // Array of image URLs for the second carousel
  const secondCarouselImages = [
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/volum/1.JPG',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/volum/2.JPG',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/volum/3.JPG',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/volum/4.JPG',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/volum/5.JPG',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/volum/6.JPG',
    'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/follar_pol/volum/7.JPG',
  ];

  return (
    <div className="bg-yellow-300">
      <LogoHeader />
      <div  className='flex justify-center items-center  flex-col'>
        <div className='w-3/4 sm:5/6 mt-32'>
            <Carousel className="w-full">
            {firstCarouselImages.map((url, index) => (
                <Carousel.Slide key={index}>
                <img src={url} alt={`Image ${index}`} className="w-full" />
                </Carousel.Slide>
            ))}
            </Carousel>
        </div>

        <div className="w-3/4 mt-16 mb-32 sm:5/6 ">
            <Carousel className="">
            {secondCarouselImages.map((url, index) => (
                <Carousel.Slide key={index}>
                <img src={url} alt={`Image ${index}`} className="w-full" />
                </Carousel.Slide>
            ))}
            </Carousel>
        </div>
      </div>

    </div>
  );
};

export default Volum;
