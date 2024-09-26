import React from 'react';
import { LogoHeader } from '../../image/LogoHeader';
import { loadS3Image } from '../../helpers/Functions';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const TapetumLucidum = () => {
  const pdfUrl = 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/tapetum_lucidum/acabat_alta.pdf';

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw', // 100% of viewport width
  };

  const buttonStyle = {
    marginTop: '10px', // Adjust margin top as needed
  };

  return (
    <div className='bg-white text-black'>
      <LogoHeader />
      
      <div className=''>
        <div className=''>
          <div className='sm:w-full md:w-1/2 text-left mx-6 pt-16 '>
            <strong>A cluster of rats gnawing at the edges of six or seven undercrypts, <em>tapetum lucidum</em> is a text-to-image Stable Diffusion model trained out of pictures of shiny-eyed lurking mammals. Their results come to the surface with an aura of prejudices; camcorder .mp4 of a night-vision holy guinea pig, etc. Not the prompts but the implication of the model's basis: <em>tapetum lucidum</em> resembles a BDSM club plagued by the creatures of the night.</strong>
          </div>
          <div className='mt-12 mx-6 md:w-1/2'>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={`https://www.youtube.com/embed/hcHudWPNR5Y`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className='mt-12 mb-12 mx-6 md:w-1/2'>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={`https://www.youtube.com/embed/grVdAwhsiVg`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className='sm:w-full md:w-1/2 text-left mx-6'>
            <strong>The model was created by Domenec Miralles. The videos, images, and forms of exhibition are an ongoing effort enacted by majin don patch (Domenec Miralles + Pol Crosas). Different variations of tapetum lucidum have been reified into physical existence in exhibitions and concerts, presented as site-specific holographic fans, metal sculptures of dogs or cats, small TFT screens, and others.</strong>
          </div>
        </div>
      </div>

      <div className='mt-10 pb-10 mx-6'>
        <CarouselContainer />
        <div className="mb-2" />
      </div>

      <div className='sm:w-full md:w-1/2 text-left mx-6'>
        <strong>1st of June of 2023, Elías Querejeta Zine Eskola. While showing him <em>tapetum lucidum</em>, Pol Crosas interviews Pedro Costa about the nature of artificial intelligence generated images and how they dialogue with contemporary cinema. Here's the zine:</strong>
      </div>

      <div style={containerStyle} className='pb-16 pt-16 pl-8 pr-8 relative'>
        {/* Button with anchor tag */}
        <a 
          href={pdfUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className='border-2 border-dashed border-black border-opacity-0 hover:border-opacity-100 px-2 py-1 rounded-xl transition-all ease-in-out duration-300 absolute left-4' // Animated hover
        >
          download pdf
        </a>
      </div>
    </div>
  );
};

const CarouselContainer = () => (
  <div className="md:w-1/2">
    <Carousel 
      showThumbs={false} 
      showStatus={false} 
      showIndicators={false}
      className="overflow-hidden"
      style={{ maxWidth: "calc(100% - 32px)", marginLeft: "-16px", width: "calc(100% + 32px)", maxHeight: "400px" }}
    >
      {Array.from({ length: 16 }, (_, index) => (
        <div key={index}>
          <img alt={`dog${index + 1}`} src={loadS3Image(`${index + 1}.jpg`, 'tapetum_lucidum/tapetum_pics')} />
        </div>
      ))}
      <div>
        <img alt='dog16' src={loadS3Image('16.jpg', 'tapetum_lucidum/tapetum_pics')} />
      </div>
    </Carousel>
  </div>
);

export default TapetumLucidum;
