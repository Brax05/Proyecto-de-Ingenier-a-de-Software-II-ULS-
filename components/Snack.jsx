//src/components/SnackTable.jsx
//Tabla con colaciones y bebidas.

import React from 'react';

export default function SnackTable() {
  const snacks = [
    { id: 1, name: 'Ave Palta', calories: 355, type: 'Sandwich' },
    { id: 2, name: 'Ave Mayo', calories: 431, type: 'Sandwich' },
    { id: 3, name: 'Barros Luco', calories: 376, type: 'Sandwich' },
    { id: 4, name: 'Completo', calories: '450 - 500', type: 'Comida rápida' },
    { id: 5, name: 'Hamburguesa Simple', calories: 550, type: 'Hamburguesa' },
    { id: 6, name: 'Hamburguesa Completa', calories: '800+', type: 'Hamburguesa' },
    { id: 7, name: 'Tostada con Mantequilla', calories: 70, type: 'Tostada' },
    { id: 8, name: 'Tostada con Palta', calories: 478, type: 'Tostada' },
    { id: 9, name: 'Alfajor', calories: 171, type: 'Colación' },
    { id: 10, name: 'Bebida en Lata (450cc)', calories: '140 - 180', type: 'Bebida' },
    { id: 11, name: 'Jugo en Caja (200cc)', calories: '60 - 100', type: 'Bebida' },
  ];

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold text-gray-700">Colaciones y Bebidas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-xl border border-gray-200 shadow-md">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Alimento/Bebida</th>
              <th className="border px-4 py-2">Calorías Relativas</th>
              <th className="border px-4 py-2">Categoría</th>
            </tr>
          </thead>
          <tbody>
            {snacks.map((snack) => (
              <tr
                key={snack.id}
                className="transition-colors duration-300 hover:bg-blue-50"
              >
                <td className="border px-4 py-2 text-center">{snack.id}</td>
                <td className="border px-4 py-2">{snack.name}</td>
                <td className="border px-4 py-2 text-center">{snack.calories}</td>
                <td className="border px-4 py-2 text-center">{snack.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
