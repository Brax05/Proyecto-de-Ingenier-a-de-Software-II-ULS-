//src/data/menu.js
//Datos del menú semanal con imágenes, detalles nutricionales y etiquetas dietéticas.

import pollo from '../assets/pollo-arroz.jpg';
import pure from '../assets/pure-lomo.jpg';
import carne from '../assets/carne-fideos.jpg';
import strogonoff from '../assets/strogonoff.jpg';
import chuleta from '../assets/chuleta-arroz.jpg';

export const menuDelDia = [
  {
    day: 'LUNES',
    dish: 'Pollo al horno con arroz',
    imageSrc: pollo,
    details: {
      salad: 'Ensalada de lechuga y tomate',
      fruit: 'Manzana',
      dessert: 'Jalea de frambuesa',
      calories: 750,
      price: 2500,
    },
    // Etiquetas dietéticas
    dietaryTags: {
      vegan: true,        // Siempre disponible por reglamento
      vegetarian: false,  // No siempre disponible
      glutenFree: true,   // Ejemplo: este plato sí tiene opción sin gluten
    },
  },
  {
    day: 'MARTES',
    dish: 'Puré con lomo de cerdo',
    imageSrc: pure,
    details: {
      salad: 'Ensalada de repollo',
      fruit: 'Pera',
      dessert: 'Flan de vainilla',
      calories: 820,
      price: 2500,
    },
    dietaryTags: {
      vegan: true,
      vegetarian: true,   // Este sí tiene opción vegetariana
      glutenFree: false,  // Este no tiene opción sin gluten
    },
  },
  {
    day: 'MIÉRCOLES',
    dish: 'Carne molida con fideos',
    imageSrc: carne,
    details: {
      salad: 'Ensalada chilena',
      fruit: 'Naranja',
      dessert: 'Sémola con leche',
      calories: 780,
      price: 2500,
    },
    dietaryTags: {
      vegan: true,
      vegetarian: false,
      glutenFree: false,  // Los fideos normales contienen gluten
    },
  },
  {
    day: 'JUEVES',
    dish: 'Strogonoff de vacuno con papas al romero',
    imageSrc: strogonoff,
    details: {
      salad: 'Ensalada de betarraga',
      fruit: 'Plátano',
      dessert: 'Macedonia',
      calories: 850,
      price: 2500,
    },
    dietaryTags: {
      vegan: true,
      vegetarian: true,
      glutenFree: true,
    },
  },
  {
    day: 'VIERNES',
    dish: 'Chuleta de cerdo con arroz',
    imageSrc: chuleta,
    details: {
      salad: 'Ensalada de apio palta',
      fruit: 'Uva',
      dessert: 'Leche asada',
      calories: 800,
      price: 2500,
    },
    dietaryTags: {
      vegan: true,
      vegetarian: false,
      glutenFree: true,
    },
  },
];

// ============================================
// ESTRUCTURA PARA BASE DE DATOS (Referencia)
// ============================================
/*
En base de datos, cada menú debería tener una estructura similar:

CREATE TABLE menus (
  id INT PRIMARY KEY AUTO_INCREMENT,
  day VARCHAR(20) NOT NULL,
  dish VARCHAR(255) NOT NULL,
  image_url VARCHAR(500),
  salad VARCHAR(255),
  fruit VARCHAR(100),
  dessert VARCHAR(100),
  calories INT,
  price INT,
  vegan BOOLEAN DEFAULT TRUE,      -- Siempre TRUE por reglamento
  vegetarian BOOLEAN DEFAULT FALSE,
  gluten_free BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

Ejemplo de INSERT:
INSERT INTO menus (day, dish, salad, fruit, dessert, calories, price, vegan, vegetarian, gluten_free)
VALUES ('LUNES', 'Pollo al horno con arroz', 'Ensalada de lechuga y tomate', 'Manzana', 'Jalea de frambuesa', 750, 2500, TRUE, FALSE, TRUE);

*/
