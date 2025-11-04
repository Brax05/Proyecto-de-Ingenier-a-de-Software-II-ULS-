//src/components/TablasSearch.jsx
//Tabla filtrable para mostrar alimentos o bebestibles según la sección.

import React from 'react';
import { Bebestibles, Alimentos } from '../data/comidas';

export default function TablasSearch({ section, search }) {
  const searchFilter = (data) => {
    if (!search) return data;
    const q = search.trim().toLowerCase();
    return data.filter((item) => item.name.toLowerCase().includes(q));
  };

  const currentData = section === 'bebestibles' ? Bebestibles : Alimentos;
  const headerBgColor =
    section === 'bebestibles' ? 'bg-blue-800/50' : 'bg-green-800/50';

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-xl border border-gray-700 shadow-md">
        <thead className={`${headerBgColor} text-gray-200`}>
          <tr>
            <th className="border-b border-gray-700 px-4 py-3">Producto</th>
            <th className="border-b border-gray-700 px-4 py-3">Calorías</th>
            <th className="border-b border-gray-700 px-4 py-3">Precio ($)</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900/50 text-gray-300">
          {searchFilter(currentData).map((item) => (
            <tr key={item.id} className="hover:bg-gray-700/50">
              <td className="border-t border-gray-700 px-4 py-2">{item.name}</td>
              <td className="border-t border-gray-700 px-4 py-2 text-center">
                {item.calories}
              </td>
              <td className="border-t border-gray-700 px-4 py-2 text-right">
                {item.price.toLocaleString('es-CL')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
