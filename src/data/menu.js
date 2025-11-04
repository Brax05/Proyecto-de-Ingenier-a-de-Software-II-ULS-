//src/data/menuDelDia.js
//Datos del menú semanal con imágenes y detalles nutricionales.

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
  },
];
