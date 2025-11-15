//src/components/MapPanel.jsx
//Panel para mostrar el mapa de ubicación

import React from 'react';

const MapPanel = ({ ubicacion }) => {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
      <h3 className="mb-3 text-lg font-bold text-white">Ubicación</h3>
      <div className="aspect-video overflow-hidden rounded-lg">
        <iframe
          src={ubicacion}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default MapPanel;
