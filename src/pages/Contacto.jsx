//src/pages/Contacto.jsx
//Página de Buzón de Sugerencias: formulario para que usuarios envíen feedback

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío - aquí integrarías con tu backend
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      
      // Limpiar formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          casino: '',
          tipoSugerencia: '',
          mensaje: ''
        });
        setSubmitStatus(null);
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatedPage>
      <div className="bg-gray-900 min-h-screen">
        {/* Header Section */}
        <div className="bg-gray-800 py-16 pt-28">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                Buzón de Sugerencias
              </h1>
              <p className="mt-2 text-gray-300">
                Tu opinión es importante para nosotros. Comparte tus sugerencias, 
                comentarios o inquietudes sobre nuestros servicios.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-800 rounded-lg shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="flex items-center text-white font-semibold mb-2">
                    <User className="mr-2 h-5 w-5" />
                    Nombre Completo *
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
                    <Mail className="mr-2 h-5 w-5" />
                    Correo Electrónico *
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
                    <Phone className="mr-2 h-5 w-5" />
                    Teléfono (opcional)
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
                  <label htmlFor="casino" className="block text-white font-semibold mb-2">
                    Casino *
                  </label>
                  <select
                    id="casino"
                    name="casino"
                    value={formData.casino}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
                  >
                    <option value="">Selecciona un casino</option>
                    <option value="central">Casino Central</option>
                    <option value="ignacio-domeyko">Casino Ignacio Domeyko</option>
                    <option value="limarí">Casino Limarí</option>
                    <option value="benavente">Casino Benavente</option>
                    <option value="isabel-bongard">Casino Isabel Bongard</option>
                  </select>
                </div>

                {/* Tipo de Sugerencia */}
                <div>
                  <label htmlFor="tipoSugerencia" className="block text-white font-semibold mb-2">
                    Tipo de Sugerencia *
                  </label>
                  <select
                    id="tipoSugerencia"
                    name="tipoSugerencia"
                    value={formData.tipoSugerencia}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="sugerencia">Sugerencia</option>
                    <option value="felicitacion">Felicitación</option>
                    <option value="reclamo">Reclamo</option>
                    <option value="consulta">Consulta</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="mensaje" className="block text-white font-semibold mb-2">
                    Mensaje *
                  </label>
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

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-600 text-white px-6 py-4 rounded-lg flex items-center">
                    <div className="mr-3">✓</div>
                    <div>
                      <p className="font-semibold">¡Mensaje enviado con éxito!</p>
                      <p className="text-sm">Gracias por tu feedback. Te contactaremos pronto.</p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-white font-bold text-lg mb-2">📧 Correo directo</h3>
                <p className="text-gray-300">casinouls@userena.cl</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-white font-bold text-lg mb-2">⏰ Horario de atención</h3>
                <p className="text-gray-300">Lunes a Viernes: 8:00 - 18:00 hrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Contacto;