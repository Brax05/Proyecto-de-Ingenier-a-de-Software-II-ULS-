//src/components/CartaNoticia.jsx
//Tarjeta para mostrar una noticia con imagen, fecha y descripción.

import React from 'react';

const CartaNoticia = ({ noticia }) => {
  const { nombre, fecha, descripcion, imagen } = noticia;

  const formattedDate = new Date(fecha.split('-').reverse().join('-')).toLocaleDateString(
    'es-ES',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  );

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-lg">
      <div className="aspect-w-4 aspect-h-3 bg-gray-700">
        {imagen ? (
          <img
            src={imagen}
            alt={`Imagen para ${nombre}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-700"></div>
        )}
      </div>

      <div className="flex flex-grow flex-col p-6">
        <p className="mb-2 text-sm text-gray-400">{formattedDate}</p>
        <h3 className="mb-2 text-xl font-bold text-white">{nombre}</h3>
        <p className="flex-grow text-gray-300">{descripcion}</p>
      </div>
    </div>
  );
};

export default CartaNoticia;
