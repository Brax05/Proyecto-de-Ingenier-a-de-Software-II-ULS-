//src/data/comidas.js
//Datos de ejemplo de comidas disponibles

import polloArroz from '../assets/pollo-arroz.jpg';
import pureLomo from '../assets/pure-lomo.jpg';
import strogonoff from '../assets/strogonoff.jpg';

export const comidas = [
  {
    id: 1,
    nombre: 'Pollo con Arroz',
    descripcion: 'Delicioso pollo asado acompañado de arroz y ensalada fresca',
    precio: 3500,
    imagen: polloArroz,
    categoria: 'Plato Principal'
  },
  {
    id: 2,
    nombre: 'Puré con Lomo',
    descripcion: 'Suave puré de papas con jugoso lomo a la plancha',
    precio: 4200,
    imagen: pureLomo,
    categoria: 'Plato Principal'
  },
  {
    id: 3,
    nombre: 'Strogonoff',
    descripcion: 'Cremoso strogonoff de carne con champiñones',
    precio: 4500,
    imagen: strogonoff,
    categoria: 'Plato Principal'
  }
];
