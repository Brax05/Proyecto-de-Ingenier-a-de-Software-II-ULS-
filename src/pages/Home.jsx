//src/pages/Home.jsx
//Página principal: incluye Hero, menú del día, detalle de comidas y sección de casinos.

import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import Hero from '../components/Hero';
import MenuCard from '../components/MenuCard';
import CasinosSection from '../components/CasinosSection';
import MealDetailModal from '../components/MenuModal';
import { menuDelDia } from '../data/menu';

const Home = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleShowDetails = (meal) => {
    setSelectedMeal(meal);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailModalOpen(false);
  };

  return (
    <AnimatedPage>
      <Hero />

      <div className="bg-gray-900">
        <main className="container mx-auto px-6 py-12">
          <section>
            {/*Menú del día*/}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white">Menú disponible</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
              {menuDelDia.map((item) => (
                <MenuCard
                  key={item.day}
                  {...item}
                  onShowDetails={() => handleShowDetails(item)}
                />
              ))}
            </div>

            {/*Sección Casinos*/}
            <div className="mb-8 text-center">
              <h3 className="m-10 text-3xl font-bold text-white">
                Conoce Nuestros Casinos
              </h3>
            </div>
            <CasinosSection />
          </section>
        </main>
      </div>

      {/*Modal con detalle del plato*/}
      <MealDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetails}
        meal={selectedMeal}
      />
    </AnimatedPage>
  );
};

export default Home;
