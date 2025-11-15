//src/components/Footer.jsx
//Pie de página institucional con logos y datos de la ULS.

import React from 'react';
import logoUls from '../assets/logo.png';
import logoDgae from '../assets/logo-dgae.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-950 text-gray-300 mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between text-center md:flex-row md:text-left">
          {/*Logo DGAE*/}
          <div className="mb-4 md:mb-0">
            <img src={logoDgae} alt="Logo DGAE ULS" className="h-16 mx-auto md:mx-0" />
          </div>

          {/*Información central*/}
          <div className="mx-4 flex max-w-lg flex-col items-center md:items-start">
            <h3 className="text-lg font-bold text-white">Universidad de La Serena</h3>
            <p className="text-sm">Dirección General de Asuntos Estudiantiles (DGAE)</p>
            <p className="mt-2 text-sm">
              <strong>Ubicación:</strong> Benavente 1085, 1720197 La Serena, Coquimbo
            </p>
          </div>

          {/*Logo ULS*/}
          <div className="mt-4 md:mt-0">
            <img src={logoUls} alt="Logo Universidad de La Serena" className="h-16 mx-auto md:mx-0" />
          </div>
        </div>

        <hr className="my-6 border-gray-600" />

        <div className="text-center">
          <p className="text-xs leading-relaxed text-gray-400">
            La Universidad de La Serena (ULS) tiene una política de derecho de autor que se enfoca en
            proteger la propiedad intelectual y fomentar el respeto por las obras ajenas en su
            comunidad académica, previniendo el plagio y promoviendo la ética en el uso de material
            de terceros.
          </p>
        </div>

        <hr className="my-6 border-gray-600" />

        <div className="text-center text-sm text-gray-500">
          <p>1981 - {currentYear}</p>
          <p>©{currentYear} Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
