//src/components/Hero.jsx
//Carrusel de portada con auto-rotación, controles e indicadores.

import React, { useState, useEffect } from 'react';
import heroBg1 from '../assets/hero-background-1.jpg';
import heroBg2 from '../assets/hero-background-2.jpg';
import heroBg3 from '../assets/hero-background-3.jpg';

const Hero = () => {
  const images = [heroBg1, heroBg2, heroBg3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  //Rotación automática cada 5 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  const goToPrev = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % images.length,
    );
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}

      {/*Overlay*/}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/*Texto principal*/}
      <div className="absolute inset-0 z-10 flex items-center justify-center text-white">
        <h1 className="px-4 text-center text-3xl font-light tracking-wider sm:text-4xl md:text-5xl">
          BIENVENIDO al casino ULS
        </h1>
      </div>

      {/*Controles*/}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-r-lg bg-black bg-opacity-50 p-2 text-white transition-all hover:bg-opacity-75"
        aria-label="Imagen anterior"
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-l-lg bg-black bg-opacity-50 p-2 text-white transition-all hover:bg-opacity-75"
        aria-label="Imagen siguiente"
      >
        &#10095;
      </button>

      {/*Indicadores*/}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-3 w-3 rounded-full bg-white transition-all ${
              index === currentImageIndex ? 'scale-125 bg-opacity-100' : 'bg-opacity-50'
            }`}
            aria-label={`Ir a la imagen ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
