//src/data/menu.js
//Datos del menú del día disponible en los casinos

import polloArroz from '../assets/pollo-arroz.jpg';
import pureLomo from '../assets/pure-lomo.jpg';
import strogonoff from '../assets/strogonoff.jpg';
import carneFideos from '../assets/carne-fideos.jpg';
import chuletaArroz from '../assets/chuleta-arroz.jpg';

export const menuDelDia = [
  {
    day: 'Lunes',
    title: 'Pollo con Arroz',
    description: 'Delicioso pollo asado acompañado de arroz graneado y ensalada fresca de la estación.',
    price: 3500,
    image: polloArroz,
    details: {
      entrada: 'Ensalada mixta',
      principal: 'Pollo al horno con arroz',
      postre: 'Fruta de estación',
      calorias: 650
    }
  },
  {
    day: 'Martes',
    title: 'Puré con Lomo',
    description: 'Suave puré de papas casero con jugoso lomo a la plancha y salsa de champiñones.',
    price: 4200,
    image: pureLomo,
    details: {
      entrada: 'Sopa de verduras',
      principal: 'Lomo con puré de papas',
      postre: 'Gelatina',
      calorias: 720
    }
  },
  {
    day: 'Miércoles',
    title: 'Strogonoff',
    description: 'Cremoso strogonoff de carne con champiñones frescos, acompañado de arroz o fideos.',
    price: 4500,
    image: strogonoff,
    details: {
      entrada: 'Ensalada César',
      principal: 'Strogonoff de carne con arroz',
      postre: 'Flan',
      calorias: 780
    }
  },
  {
    day: 'Jueves',
    title: 'Carne con Fideos',
    description: 'Carne mechada en salsa de tomate casera con fideos al dente y queso rallado.',
    price: 4000,
    image: carneFideos,
    details: {
      entrada: 'Crema de zapallo',
      principal: 'Carne mechada con fideos',
      postre: 'Fruta de estación',
      calorias: 700
    }
  },
  {
    day: 'Viernes',
    title: 'Chuleta con Arroz',
    description: 'Jugosa chuleta de cerdo a la plancha con arroz primavera y vegetales salteados.',
    price: 4300,
    image: chuletaArroz,
    details: {
      entrada: 'Ensalada verde',
      principal: 'Chuleta de cerdo con arroz',
      postre: 'Mousse de chocolate',
      calorias: 750
    }
  }
];
