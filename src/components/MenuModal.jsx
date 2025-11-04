//src/components/MealDetailModal.jsx
//Modal con detalles del plato seleccionado.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const MealDetailModal = ({ isOpen, onClose, meal }) => {
  if (!meal) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-lg border border-gray-700 bg-gray-900/95 text-white shadow-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-2 z-10 text-3xl text-gray-400 hover:text-white"
            >
              &times;
            </button>

            <img
              src={meal.imageSrc}
              alt={meal.dish}
              className="h-48 w-full rounded-t-lg object-cover"
            />

            <div className="p-6">
              <h2 className="mb-2 text-3xl font-bold">{meal.day}</h2>
              <p className="mb-4 text-xl text-gray-300">{meal.dish}</p>

              <div className="space-y-2 border-t border-gray-700 pt-4 text-left">
                <p>
                  <span className="font-semibold text-gray-400">Ensalada:</span>{' '}
                  {meal.details.salad}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">Fruta:</span>{' '}
                  {meal.details.fruit}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">Postre:</span>{' '}
                  {meal.details.dessert}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">
                    Calorías Totales:
                  </span>{' '}
                  ≈ {meal.details.calories} kcal
                </p>
              </div>

              <div className="mt-6 text-right">
                <p className="text-2xl font-bold text-green-400">
                  $
                  {new Intl.NumberFormat('es-CL').format(meal.details.price)}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MealDetailModal;
