//src/pages/Personal.jsx
//Página de presentación del equipo y la historia del casino.

import React from 'react';
import PersonCard from '../components/PersonCard';
import AnimatedPage from '../components/AnimatedPage';
import victorImage from '../assets/victor_bermont_23.jpg';

const staffData = [
  {
    name: 'Victor Bermont',
    title: 'Encargado General',
    image: 'https://i.pravatar.cc/300?u=lalo',
  },
  {
    name: 'Mario García',
    title: 'Chef Principal',
    image: 'https://i.pravatar.cc/300?u=ana',
  },
  {
    name: 'Carlos Soto',
    title: 'Asistente de Cocina',
    image: 'https://i.pravatar.cc/300?u=oliver',
  },
  {
    name: 'Eduardo Rodriguez',
    title: 'Atención al Cliente',
    image: 'https://i.pravatar.cc/300?u=maria',
  },
];

const Personal = () => {
  return (
    <AnimatedPage>
      <main className="container mx-auto px-6 pt-28 py-8">
        {/*Encabezado*/}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white">Conoce a Nuestro Equipo</h1>
          <p className="mt-2 text-gray-300">
            El personal dedicado a brindarte el mejor servicio todos los días.
          </p>
        </div>

        {/*Staff*/}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {staffData.map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
        </div>

        {/*Historia*/}
        <div className="my-12 text-center">
          <section>
            <h2 className="m-10 text-4xl font-bold text-white">Nuestra historia</h2>
            <p className="rounded-2xl border border-gray-700 bg-gray-900/50 p-6 text-gray-200 shadow-lg backdrop-blur-sm">
              Detrás de cada producto hecho por el casino existe un gran esfuerzo
              por complacer a cada uno de nuestros clientes. Cada plato cumple
              con un control de calidad para que disfrutes de una alimentación
              rica y saludable.  
              Todos nuestros productos son preparados a mano cada día gracias al
              trabajo de nuestro equipo de cocina y limpieza, asegurando la mejor
              experiencia posible.  
              Nuestro objetivo es ofrecer un servicio apto para cualquier persona,
              sea un cliente frecuente o alguien que use nuestras instalaciones
              solo para almorzar. Nos esforzamos en mantener nuestros
              establecimientos limpios y ordenados.
            </p>
          </section>
        </div>
      </main>
    </AnimatedPage>
  );
};

export default Personal;
