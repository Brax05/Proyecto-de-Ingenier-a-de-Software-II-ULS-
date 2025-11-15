//src/components/CasinoItem.jsx
//Componente para mostrar información de un casino individual

import React from 'react';

const CasinoItem = ({ casino }) => {
  const { nombre, direccion, horario } = casino;

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-lg transition-transform hover:scale-105">
      <h3 className="mb-3 text-xl font-bold text-white">{nombre}</h3>
      <div className="space-y-2 text-gray-300">
        <p>
          <span className="font-semibold text-gray-400">Dirección:</span> {direccion}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Horario:</span> {horario}
        </p>
      </div>
    </div>
  );
};

export default CasinoItem;
