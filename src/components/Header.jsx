//src/components/Header.jsx
//Encabezado principal con navegación, menú móvil y modal de contacto.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/uls_logo.png';
import Modal from './Modal';
import InstagramIcon from './InstagramIcon';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const instagramLink =
    'https://www.instagram.com/dgaeuls?igsh=MW83d2ZqNmpveTR6MQ==';

  const closeAllMenus = () => {
    setIsModalOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="absolute left-0 top-0 z-30 w-full bg-black/25 text-white backdrop-blur-sm">
        <nav className="container mx-auto flex items-center justify-between px-6 py-3">
          {/*Logo + texto*/}
          <Link to="/" onClick={closeAllMenus} className="flex items-center">
            <img src={logo} alt="Logo ULS" className="mr-4 h-12 w-12" />
            <div>
              <div className="text-xl font-bold [text-shadow:0_1px_3px_rgb(0_0_0_/_0.5)]">
                Universidad de La Serena
              </div>
              <div className="text-sm [text-shadow:0_1px_3px_rgb(0_0_0_/_0.5)]">
                Casinos y servicios de alimentación
              </div>
            </div>
          </Link>

          {/*Navegación escritorio*/}
          <div className="hidden items-center space-x-6 md:flex">
            <Link to="/" className="transition-colors hover:text-gray-300">
              Inicio
            </Link>
            <Link to="/Colaciones" className="transition-colors hover:text-gray-300">
              Productos
            </Link>
            <Link to="/personal" className="transition-colors hover:text-gray-300">
              Nuestra historia
            </Link>

            <button
              onClick={() => setIsModalOpen(true)}
              className="transition-colors hover:text-gray-300"
            >
              Contacto
            </button>
            {/* NUEVO - Enlace al Buzón de Sugerencias */}
            <Link to="/contacto" className="transition-colors hover:text-gray-300">
              Sugerencias
            </Link>
            {/* NUEVO - Enlace al Panel de Gestión */}
            <Link to="/admin" className="transition-colors hover:text-gray-300">
              Gestión
            </Link>
          </div>

          {/*Botón hamburguesa móvil*/}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/*Menú móvil desplegable*/}
        <div
          className={`md:hidden ${
            isMobileMenuOpen ? 'block' : 'hidden'
          } bg-gray-900/95 backdrop-blur-sm`}
        >
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link to="/" onClick={closeAllMenus} className="hover:text-gray-300">
              Inicio
            </Link>
            <Link
              to="Colaciones"
              onClick={closeAllMenus}
              className="hover:text-gray-300"
            >
              Productos
            </Link>
            <Link
              to="/personal"
              onClick={closeAllMenus}
              className="hover:text-gray-300"
            >
              Nuestra historia
            </Link>

            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="hover:text-gray-300"
            >
              Contacto
            </button>
            {/* NUEVO - Enlace al Buzón de Sugerencias (móvil) */}
            <Link
              to="/contacto"
              onClick={closeAllMenus}
              className="hover:text-gray-300"
            >
              Sugerencias
            </Link>
            {/* NUEVO - Enlace al Panel de Gestión (móvil) */}
            <Link
              to="/admin"
              onClick={closeAllMenus}
              className="hover:text-gray-300"
            >
              Gestión
            </Link>
          </div>
        </div>
      </header>

      {/*Modal de contacto*/}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center text-gray-200">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Información de Contacto
          </h2>

          <div className="mb-6 space-y-3 text-left">
            <p>
              <span className="font-semibold text-gray-300">E-mail: </span>
              <a
                href="mailto:casinouls@userena.cl"
                className="text-blue-400 hover:underline"
              >
                casinouls@userena.cl
              </a>
            </p>
            <p>
              <span className="font-semibold text-gray-300">Teléfono: </span>
              <a
                href="tel:+56512204464"
                className="text-blue-400 hover:underline"
              >
                (51) 2 204464
              </a>
            </p>
          </div>

          <hr className="my-4 border-gray-700" />

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Nuestras Redes Oficiales
            </h3>
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-4 text-white transition-transform duration-300 hover:scale-110"
              aria-label="Visita nuestro Instagram"
            >
              <InstagramIcon className="h-12 w-12" />
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
