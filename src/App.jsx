import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Personal from './pages/Personal';
import Noticia from './pages/Noticia';
import Colaciones from "./pages/Colaciones";
import Contacto from "./pages/Contacto";  // NUEVO - Buzón de Sugerencias
import Admin from "./pages/Admin";        // NUEVO - Panel de Gestión


function App() {
  const location = useLocation();
  return (
    <div className="bg-slate-800 min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/Colaciones" element={<Colaciones />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/noticia" element={<Noticia />} />
            <Route path="/contacto" element={<Contacto />} />  {/* NUEVO */}
            <Route path="/admin" element={<Admin />} />        {/* NUEVO */}
          </Routes>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}

export default App;