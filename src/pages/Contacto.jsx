// src/pages/Contacto.jsx
// Página de Buzón de Sugerencias: conecta con backend Flask y guarda en MongoDB

import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { Send, Mail, User, Phone } from 'lucide-react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    casino: '',
    tipoSugerencia: '',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 🔹 NUEVO handleSubmit: envía datos reales al backend Flask
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Cambia la URL si estás en producción (por ejemplo, en Render o Railway)
    const response = await fetch("http://127.0.0.1:5000/api/sugerencias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        correo: formData.email,
        telefono: formData.telefono,
        casino: formData.casino,
        tipo: formData.tipoSugerencia,
        mensaje: formData.mensaje,
      }),
    });


    if (response.status === 201) {
      const data = await response.json();
      console.log("✅ Sugerencia guardada con ID:", data._id);
      setSubmitStatus('success');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        casino: '',
        tipoSugerencia: '',
        mensaje: ''
      });
    } else {
      console.error("❌ Error del servidor:", await response.text());
      setSubmitStatus('error');
    }

    } catch (error) {
      console.error('Error al enviar sugerencia:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedPage>
      <div className="bg-gray-900 min-h-screen">
        {/* Header Section */}
        <div className="bg-gray-800 py-16 pt-28">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Buzón de Sugerencias</h1>
            <p className="mt-2 text-gray-300">
              Tu opinión es importante para nosotros. Comparte tus sugerencias, comentarios o inquietudes sobre nuestros servicios.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="flex items-center text-white font-semibold mb-2">
                  <User className="mr-2 h-5 w-5" /> Nombre Completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
                  placeholder="Ingresa tu nombre completo"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="flex items-center text-white font-semibold mb-2">
                  <Mail className="mr-2 h-5 w-5" /> Correo Electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="telefono" className="flex items-center text-white font-semibold mb-2">
                  <Phone className="mr-2 h-5 w-5" /> Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
                  placeholder="+56 9 1234 5678"
                />
              </div>

              {/* Casino */}
              <div>
                <label htmlFor="casino" className="block text-white font-semibold mb-2">Casino *</label>
                <select
                  id="casino"
                  name="casino"
                  value={formData.casino}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
                >
                  <option value="">Selecciona un casino</option>
                  <option value="Casino Central">Casino Central</option>
                  <option value="Casino Ignacio Domeyko">Casino Ignacio Domeyko</option>
                  <option value="Casino Limarí">Casino Limarí</option>
                  <option value="Casino Benavente">Casino Benavente</option>
                  <option value="Casino Isabel Bongard">Casino Isabel Bongard</option>
                </select>
              </div>

              {/* Tipo de Sugerencia */}
              <div>
                <label htmlFor="tipoSugerencia" className="block text-white font-semibold mb-2">Tipo de Sugerencia *</label>
                <select
                  id="tipoSugerencia"
                  name="tipoSugerencia"
                  value={formData.tipoSugerencia}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Sugerencia">Sugerencia</option>
                  <option value="Felicitación">Felicitación</option>
                  <option value="Reclamo">Reclamo</option>
                  <option value="Consulta">Consulta</option>
                </select>
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="mensaje" className="block text-white font-semibold mb-2">Mensaje *</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition resize-none"
                  placeholder="Cuéntanos tu experiencia, sugerencia o inquietud..."
                ></textarea>
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-lg transition duration-300 flex items-center justify-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Enviar Sugerencia
                  </>
                )}
              </button>

              {/* Mensajes de estado */}
              {submitStatus === 'success' && (
                <div className="bg-green-600 text-white px-6 py-4 rounded-lg mt-4">
                  ¡Sugerencia enviada con éxito! 🎉
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-600 text-white px-6 py-4 rounded-lg mt-4">
                  Error al enviar la sugerencia. Inténtalo de nuevo.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Contacto;
