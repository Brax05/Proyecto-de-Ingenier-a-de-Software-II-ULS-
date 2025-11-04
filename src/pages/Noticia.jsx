//src/pages/Noticias.jsx
//Página de noticias con listado dinámico, ordenado por fecha.

import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import ConjuntoNoticia from '../components/NoticiaCard';

import junaeb from '../assets/junaeb.jpg';
import heroBg3 from '../assets/hero-background-3.jpg';
import sellos from '../assets/sellos.jpg';

const datosNoticias = [
  {
    nombre: '¿QUÉ NO PUEDO COMPRAR, CON MI TARJETA JUNAEB EDENRED?',
    fecha: '23-06-2020',
    descripcion:
      'Solo puedes comprar productos alimenticios de consumo humano, con restricción de los productos que en su rotulado contengan más de 2 sellos “Altos en”, según la definición de la Ley N°20.606 y su reglamento.',
    imagen: sellos,
  },
  {
    nombre: 'Inaugurada ampliación y remodelación del Casino del Campus Andrés Bello',
    fecha: '10-02-2021',
    descripcion: 'Conoce nuestro nuevo casino renovado y futuros proyectos.',
    imagen: heroBg3,
  },
  {
    nombre: 'Cómo usar Ticket Junaeb',
    fecha: '14-09-2025',
    descripcion: 'Aprende cómo instalar y utilizar la app en el casino.',
    imagen: junaeb,
  },
];

const Noticias = () => {
  const sortedNoticias = [...datosNoticias].sort((a, b) => {
    const dateA = new Date(a.fecha.split('-').reverse().join('-'));
    const dateB = new Date(b.fecha.split('-').reverse().join('-'));
    return dateB - dateA;
  });

  return (
    <AnimatedPage>
      <main className="container mx-auto px-6 pt-28 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white">Panel de Noticias</h1>
          <p className="mt-2 text-gray-300">
            Aquí encontrarás todas las noticias sobre eventos realizados en el casino y más.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {sortedNoticias.map((noticia, index) => (
            <div
              key={noticia.nombre}
              className={
                index === sortedNoticias.length - 1 &&
                sortedNoticias.length % 2 !== 0
                  ? 'md:col-span-2'
                  : ''
              }
            >
              <ConjuntoNoticia noticia={noticia} />
            </div>
          ))}
        </div>
      </main>
    </AnimatedPage>
  );
};

export default Noticias;
