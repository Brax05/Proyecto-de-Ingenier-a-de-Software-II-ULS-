//src/pages/ColacionesPage.jsx
//Página con buscador y tablas de alimentos y bebestibles.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TablasSearch from '../components/TablasSearch';

export default function ColacionesPage() {
  const [openSection, setOpenSection] = useState('alimentos');
  const [search, setSearch] = useState('');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <motion.div
      className="container mx-auto space-y-6 p-6 pt-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="mb-6 py-3 text-center text-3xl font-bold text-white">
        Menú: Bebestibles y Alimentos
      </h1>

      {/*Barra de búsqueda*/}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar producto..."
          className="w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white shadow-sm focus:ring focus:ring-blue-500"
        />
      </div>

      {/*Vista móvil*/}
      <div className="space-y-4 md:hidden">
        <button
          onClick={() => toggleSection('alimentos')}
          className="w-full rounded-lg bg-green-800/50 px-4 py-3 text-left text-white shadow transition hover:bg-green-700/50"
        >
          Alimentos
        </button>
        <AnimatePresence>
          {openSection === 'alimentos' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <TablasSearch section="alimentos" search={search} />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => toggleSection('bebestibles')}
          className="w-full rounded-lg bg-blue-800/50 px-4 py-3 text-left text-white shadow transition hover:bg-blue-700/50"
        >
          Bebestibles
        </button>
        <AnimatePresence>
          {openSection === 'bebestibles' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <TablasSearch section="bebestibles" search={search} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/*Vista escritorio*/}
      <div className="hidden grid-cols-2 gap-6 md:grid">
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-green-400">Alimentos</h2>
          <TablasSearch section="alimentos" search={search} />
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-blue-400">Bebestibles</h2>
          <TablasSearch section="bebestibles" search={search} />
        </div>
      </div>
    </motion.div>
  );
}
