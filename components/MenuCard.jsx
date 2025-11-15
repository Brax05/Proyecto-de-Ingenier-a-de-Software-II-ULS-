//src/components/MenuCard.jsx
//Tarjeta que muestra el menú de un día con imagen y detalle.

import React from 'react';

const MenuCard = ({ day, dish, imageSrc, onShowDetails }) => {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-green-900 p-6 text-center text-white shadow-lg transition-transform duration-300 hover:scale-105">
      <h3 className="mb-3 text-2xl font-semibold">{day}</h3>

      <div className="mb-4 text-gray-300">
        <p className="font-bold">Plato de fondo:</p>
        <p>{dish}</p>
      </div>

      <p className="mb-4 text-sm text-gray-400">Incluye ensalada, fruta y postre</p>

      <img
        src={imageSrc}
        alt={dish}
        className="mb-4 h-40 w-40 rounded-full border-4 border-blue-800 object-cover"
      />

      <button
        onClick={onShowDetails}
        className="underline text-gray-300 transition-colors duration-300 hover:text-white"
      >
        Haz click para más detalles
      </button>
    </div>
  );
};

export default MenuCard;
