//src/components/AnimatedPage.jsx

import React from 'react';
import { motion } from 'framer-motion';

//Variantes de animación (entrada, visible, salida)
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

//Transición suave
const pageTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  duration: 0.4,
};

const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

export default AnimatedPage;
