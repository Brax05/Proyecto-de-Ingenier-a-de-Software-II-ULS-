//src/pages/Admin.jsx
//Panel de Administración: gestión de menús semanales

import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { Plus, Edit, Trash2, Save, X, Calendar, Shield } from 'lucide-react';

const Admin = () => {
  // Estado para autenticación simple
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  // Estado para menús
  const [menus, setMenus] = useState([
    {
      id: 1,
      day: 'Lunes',
      date: '2025-11-03',
      main: 'Cazuela de Vacuno',
      side: 'Ensalada Mixta',
      dessert: 'Fruta de Estación'
    },
    {
      id: 2,
      day: 'Martes',
      date: '2025-11-04',
      main: 'Pollo al Horno',
      side: 'Arroz Primavera',
      dessert: 'Jalea'
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Formulario para nuevo menú
  const [newMenu, setNewMenu] = useState({
    day: '',
    date: '',
    main: '',
    side: '',
    dessert: ''
  });

  // Manejo de login
  const handleLogin = (e) => {
    e.preventDefault();
    // En producción, esto debería validar contra un backend
    if (credentials.username === 'admin' && credentials.password === 'casino2024') {
      setIsAuthenticated(true);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  // Manejo de menús
  const handleEdit = (menu) => {
    setEditingMenu({ ...menu });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setMenus(menus.map(m => m.id === editingMenu.id ? editingMenu : m));
    setIsEditing(false);
    setEditingMenu(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingMenu(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este menú?')) {
      setMenus(menus.filter(m => m.id !== id));
    }
  };

  const handleAddMenu = () => {
    if (newMenu.day && newMenu.date && newMenu.main && newMenu.side && newMenu.dessert) {
      const menu = {
        id: Date.now(),
        ...newMenu
      };
      setMenus([...menus, menu]);
      setNewMenu({ day: '', date: '', main: '', side: '', dessert: '' });
      setIsAdding(false);
    } else {
      alert('Por favor completa todos los campos');
    }
  };

  // Pantalla de login
  if (!isAuthenticated) {
    return (
      <AnimatedPage>
        <div className="bg-gray-900 min-h-screen flex items-center justify-center px-6 pt-28">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <Shield className="mx-auto h-16 w-16 text-blue-500 mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">
                Panel de Administración
              </h1>
              <p className="text-gray-400">Ingresa tus credenciales para continuar</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-white font-semibold mb-2">
                  Usuario
                </label>
                <input
                  type="text"
                  id="username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="Ingresa tu usuario"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-white font-semibold mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="Ingresa tu contraseña"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Iniciar Sesión
              </button>

              <p className="text-gray-400 text-sm text-center mt-4">
                Demo: usuario: <span className="text-white">admin</span> / contraseña: <span className="text-white">casino2024</span>
              </p>
            </form>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  // Panel principal
  return (
    <AnimatedPage>
      <div className="bg-gray-900 min-h-screen">
        {/* Header */}
        <div className="bg-gray-800 py-12 pt-28">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Panel de Gestión
                </h1>
                <p className="text-gray-300">Gestión de Menús Semanales</p>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-12">
          {/* Add Button */}
          <div className="mb-8">
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" />
              Agregar Nuevo Menú
            </button>
          </div>

          {/* Add Form */}
          {isAdding && (
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h3 className="text-white text-xl font-bold mb-4">Nuevo Menú</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Día</label>
                  <select
                    value={newMenu.day}
                    onChange={(e) => setNewMenu({ ...newMenu, day: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar</option>
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Fecha</label>
                  <input
                    type="date"
                    value={newMenu.date}
                    onChange={(e) => setNewMenu({ ...newMenu, date: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Plato Principal</label>
                  <input
                    type="text"
                    value={newMenu.main}
                    onChange={(e) => setNewMenu({ ...newMenu, main: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Cazuela de Vacuno"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Acompañamiento</label>
                  <input
                    type="text"
                    value={newMenu.side}
                    onChange={(e) => setNewMenu({ ...newMenu, side: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Ensalada Mixta"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Postre</label>
                  <input
                    type="text"
                    value={newMenu.dessert}
                    onChange={(e) => setNewMenu({ ...newMenu, dessert: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Fruta de Estación"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddMenu}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition flex items-center"
                >
                  <Save className="mr-2 h-5 w-5" />
                  Guardar
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition flex items-center"
                >
                  <X className="mr-2 h-5 w-5" />
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Menu List */}
          <div className="space-y-6">
            {menus.map((menu) => (
              <div key={menu.id} className="bg-gray-800 rounded-lg p-6">
                {isEditing && editingMenu?.id === menu.id ? (
                  // Edit Mode
                  <div>
                    <h3 className="text-white text-xl font-bold mb-4">Editar Menú</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-semibold mb-2">Día</label>
                        <input
                          type="text"
                          value={editingMenu.day}
                          onChange={(e) => setEditingMenu({ ...editingMenu, day: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-semibold mb-2">Fecha</label>
                        <input
                          type="date"
                          value={editingMenu.date}
                          onChange={(e) => setEditingMenu({ ...editingMenu, date: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-semibold mb-2">Plato Principal</label>
                        <input
                          type="text"
                          value={editingMenu.main}
                          onChange={(e) => setEditingMenu({ ...editingMenu, main: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-semibold mb-2">Acompañamiento</label>
                        <input
                          type="text"
                          value={editingMenu.side}
                          onChange={(e) => setEditingMenu({ ...editingMenu, side: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-semibold mb-2">Postre</label>
                        <input
                          type="text"
                          value={editingMenu.dessert}
                          onChange={(e) => setEditingMenu({ ...editingMenu, dessert: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={handleSaveEdit}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition flex items-center"
                      >
                        <Save className="mr-2 h-5 w-5" />
                        Guardar Cambios
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition flex items-center"
                      >
                        <X className="mr-2 h-5 w-5" />
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-white text-2xl font-bold">{menu.day}</h3>
                        <div className="flex items-center text-gray-400 mt-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          {menu.date}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(menu)}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(menu.id)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 text-gray-300">
                      <p><span className="font-semibold text-white">Plato Principal:</span> {menu.main}</p>
                      <p><span className="font-semibold text-white">Acompañamiento:</span> {menu.side}</p>
                      <p><span className="font-semibold text-white">Postre:</span> {menu.dessert}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Admin;