import React from 'react';
import { Link } from 'react-router-dom';

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
    <div className="container">
      <header className="header">
        <Link to="/">
          <h1>pol crosas</h1>
        </Link>
      </header>
      
      <div className="detail-page">
        <Link to="/" className="back-link">← back to home</Link>
        
        <div className="detail-content">
          <h2>in/out</h2>
          <p>final degree ma thesis exhibited in tabakalera (2023)</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '30px 0' }}>
            {videoIds.map((videoId, index) => (
              <div key={index} className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`In/Out Video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
          
          <div className="image-gallery">
            {imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Exhibition ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inout;
