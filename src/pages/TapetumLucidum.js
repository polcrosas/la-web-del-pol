import React from 'react';
import { Link } from 'react-router-dom';

const TapetumLucidum = () => {
  const images = Array.from({ length: 16 }, (_, i) => 
    `https://majindonpatch-public.s3.eu-west-2.amazonaws.com/tapetum_lucidum/tapetum_pics/${i + 1}.jpg`
  );

  return (
    <div className="container">
      <header className="header">
        <Link to="/">
          <h1>pol crosas</h1>
        </Link>
      </header>
      
      <div className="detail-page">
        <Link to="/" className="back-link">← back to home</Link>
        
        <div className="detail-content">
          <h2>tapetum lucidum</h2>
          <p>custom dreambooth dog model with dome (2023)</p>
          
          <div style={{ maxWidth: '800px', margin: '20px 0' }}>
            <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
              <strong>A cluster of rats gnawing at the edges of six or seven undercrypts, <em>tapetum lucidum</em> is a text-to-image Stable Diffusion model trained out of pictures of shiny-eyed lurking mammals. Their results come to the surface with an aura of prejudices; camcorder .mp4 of a night-vision holy guinea pig, etc. Not the prompts but the implication of the model's basis: <em>tapetum lucidum</em> resembles a BDSM club plagued by the creatures of the night.</strong>
            </p>
          </div>
          
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/hcHudWPNR5Y"
              title="Tapetum Lucidum Video 1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/grVdAwhsiVg"
              title="Tapetum Lucidum Video 2"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div style={{ maxWidth: '800px', margin: '30px 0' }}>
            <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
              <strong>The model was created by Domenec Miralles. The videos, images, and forms of exhibition are an ongoing effort enacted by majin don patch (Domenec Miralles + Pol Crosas). Different variations of tapetum lucidum have been reified into physical existence in exhibitions and concerts, presented as site-specific holographic fans, metal sculptures of dogs or cats, small TFT screens, and others.</strong>
            </p>
          </div>
          
          <div className="image-gallery">
            {images.map((img, index) => (
              <img key={index} src={img} alt={`Tapetum Lucidum ${index + 1}`} />
            ))}
          </div>
          
          <div style={{ maxWidth: '800px', margin: '30px 0' }}>
            <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
              <strong>1st of June of 2023, Elías Querejeta Zine Eskola. While showing him <em>tapetum lucidum</em>, Pol Crosas interviews Pedro Costa about the nature of artificial intelligence generated images and how they dialogue with contemporary cinema.</strong>
            </p>
            <img
              src="https://cati-eclipse.s3.eu-west-2.amazonaws.com/WhatsApp+Image+2026-11-13+at+12.08.27.jpeg"
              alt="Pol Crosas interviews Pedro Costa at Elías Querejeta Zine Eskola"
              style={{ width: '100%', marginBottom: '20px' }}
            />
            <a
              href="https://majindonpatch-public.s3.eu-west-2.amazonaws.com/tapetum_lucidum/acabat_alta.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', padding: '10px 20px', border: '1px solid #000', marginTop: '10px' }}
            >
              download pdf
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TapetumLucidum;
