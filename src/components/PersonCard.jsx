//src/components/PersonCard.jsx
//Tarjeta para mostrar la información de una persona con imagen o placeholder.

import React from 'react';

const PlaceholderIcon = () => (
  <svg
    className="h-20 w-20 text-gray-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

const PersonCard = ({ person }) => {
  const { name, title, image } = person;

  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-700 bg-gray-800 p-6 text-center shadow-lg">
      <div className="mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gray-700">
        {image ? (
          <img
            src={image}
            alt={`Foto de ${name}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <PlaceholderIcon />
        )}
      </div>
      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="text-gray-400">{title}</p>
    </div>
  );
};

export default PersonCard;
