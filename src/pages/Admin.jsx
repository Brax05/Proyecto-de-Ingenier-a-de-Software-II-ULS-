// src/pages/Admin.jsx
// Panel de Administración: Gestión de Menús (conectado a tu backend)
// DEMO login siempre disponible: admin / casino2024

import React, { useEffect, useMemo, useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { Plus, Edit, Trash2, Save, X, Calendar, Shield } from "lucide-react";

const API_URL = (import.meta.env.VITE_API_URL ?? "http://127.0.0.1:5000").replace(/\/$/, "");
const DEMO_USER = "admin";
const DEMO_PASS = "casino2024";

const Admin = () => {
  // ---- Auth DEMO (igual que antes) ----
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // ---- Datos ----
  const [sedes, setSedes] = useState([]);
  const [itemsCatalog, setItemsCatalog] = useState([]); // ItemsMenu
  const itemsMap = useMemo(() => {
    const m = new Map();
    itemsCatalog.forEach((i) => m.set(String(i._id), i.Nombre));
    return m;
  }, [itemsCatalog]);

  const [menus, setMenus] = useState([]);
  const [loadingMenus, setLoadingMenus] = useState(false);

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);

  // Form nuevo menú (misma UI)
  const [newMenu, setNewMenu] = useState({
    day: "",
    date: "",
    sedeId: "",
    main: "",
    side: "",
    dessert: "",
    vegan: true,
    vegetarian: false,
    glutenFree: false,
  });

  // ---------- LOGIN DEMO ----------
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    setTimeout(() => {
      if (credentials.username === DEMO_USER && credentials.password === DEMO_PASS) {
        setIsAuthenticated(true);
        setCredentials({ username: "", password: "" });
      } else {
        setAuthError("Credenciales inválidas. Usa admin / casino2024");
      }
      setAuthLoading(false);
    }, 250);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setMenus([]);
  };

  // ---------- HELPERS ----------
  const toYMD = (d) => {
    if (!d) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
    const [dd, mm, yy] = d.split("/");
    return `${yy}-${mm}-${dd}`;
  };

  const ensureItemExists = async (nombre, tipo) => {
    const found = itemsCatalog.find(
      (i) => i.Nombre.trim().toLowerCase() === nombre.trim().toLowerCase()
    );
    if (found) return String(found._id);

    const res = await fetch(`${API_URL}/api/items/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Nombre: nombre, Tipo: tipo, Clasificacion: "Diario" }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "No se pudo crear ítem");
    // refresca catálogo
    await fetchItemsMenu();
    return data._id;
  };

  const buildItemsArray = async (main, side, dessert) => {
    const principalId = await ensureItemExists(main, "Principal");
    const sideId = await ensureItemExists(side, "Acompañamiento");
    const dessertId = await ensureItemExists(dessert, "Postre");
    return [
      { Tipo: "Principal", ID: principalId },
      { Tipo: "Acompañamiento", ID: sideId },
      { Tipo: "Postre", ID: dessertId },
    ];
  };

  // ---------- FETCHS ----------
  const fetchSedes = async () => {
    const res = await fetch(`${API_URL}/api/sedes/`);
    const data = await res.json();
    if (!res.ok) throw new Error("No se pudieron cargar las sedes");
    setSedes(data);
  };

  const fetchItemsMenu = async () => {
    const res = await fetch(`${API_URL}/api/items/`);
    const data = await res.json();
    if (!res.ok) throw new Error("No se pudieron cargar los ítems");
    setItemsCatalog(data);
  };

  const fetchMenus = async () => {
    setLoadingMenus(true);
    try {
      const res = await fetch(`${API_URL}/api/menus/`);
      const data = await res.json();
      if (!res.ok) throw new Error("No se pudieron cargar los menús");
      setMenus(data); // [{ _id, Fecha, IDSede, Items: [{Tipo, ID}] }]
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMenus(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      Promise.all([fetchSedes(), fetchItemsMenu()]).then(fetchMenus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // ---------- ADD ----------
  const handleAddMenu = async () => {
    const { day, date, sedeId, main, side, dessert } = newMenu;
    if (!day || !date || !sedeId || !main || !side || !dessert) {
      alert("Completa día, fecha, sede y los tres campos del menú.");
      return;
    }
    try {
      const Items = await buildItemsArray(main, side, dessert);
      const payload = { Fecha: toYMD(date), IDSede: sedeId, Items };
      const res = await fetch(`${API_URL}/api/menus/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "No se pudo crear el menú");
      setIsAdding(false);
      setNewMenu({
        day: "",
        date: "",
        sedeId: "",
        main: "",
        side: "",
        dessert: "",
        vegan: true,
        vegetarian: false,
        glutenFree: false,
      });
      fetchMenus();
    } catch (err) {
      alert(err.message);
    }
  };

  // ---------- EDIT ----------
  const startEdit = (m) => {
    const mainId = m.Items?.find((i) => i.Tipo === "Principal")?.ID;
    const sideId = m.Items?.find((i) => i.Tipo === "Acompañamiento")?.ID;
    const dessertId = m.Items?.find((i) => i.Tipo === "Postre")?.ID;
    setEditingMenu({
      _id: m._id,
      Fecha: m.Fecha,
      IDSede: String(m.IDSede),
      mainName: mainId ? itemsMap.get(String(mainId)) || "" : "",
      sideName: sideId ? itemsMap.get(String(sideId)) || "" : "",
      dessertName: dessertId ? itemsMap.get(String(dessertId)) || "" : "",
    });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const Items = await buildItemsArray(
        editingMenu.mainName,
        editingMenu.sideName,
        editingMenu.dessertName
      );
      const payload = {
        Fecha: toYMD(editingMenu.Fecha),
        IDSede: editingMenu.IDSede,
        Items,
      };
      const res = await fetch(`${API_URL}/api/menus/${editingMenu._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "No se pudo actualizar");
      setIsEditing(false);
      setEditingMenu(null);
      fetchMenus();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingMenu(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este menú?")) return;
    const res = await fetch(`${API_URL}/api/menus/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data?.error || "No se pudo eliminar");
      return;
    }
    fetchMenus();
  };

  // ---------- UI: LOGIN ----------
  if (!isAuthenticated) {
    return (
      <AnimatedPage>
        <div className="bg-gray-900 min-h-screen flex items-center justify-center px-6 pt-28">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <Shield className="mx-auto h-16 w-16 text-blue-500 mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">Panel de Administración</h1>
              <p className="text-gray-400">Ingresa tus credenciales para continuar</p>
            </div>

            {authError && (
              <div className="mb-4 text-sm text-red-300 bg-red-900/30 border border-red-700 rounded p-3">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">Usuario</label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="admin"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Contraseña</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="********"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}  // <<-- siempre habilitado si no está cargando
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                {authLoading ? "Ingresando..." : "Iniciar Sesión"}
              </button>

              <p className="text-gray-400 text-sm text-center mt-4">
                Demo: usuario: <span className="text-white">admin</span> / contraseña:{" "}
                <span className="text-white">casino2024</span>
              </p>
            </form>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  // ---------- Panel principal ----------
  return (
    <AnimatedPage>
      <div className="bg-gray-900 min-h-screen">
        {/* Header */}
        <div className="bg-gray-800 py-12 pt-28">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Panel de Gestión</h1>
                <p className="text-gray-300">Gestión de Menús Semanales</p>
              </div>
              <button
                onClick={handleLogout}
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
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center"
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
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-gray-500"
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
                  <label className="block text-white font-semibold mb-2">Sede</label>
                  <select
                    value={newMenu.sedeId}
                    onChange={(e) => setNewMenu({ ...newMenu, sedeId: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">Seleccionar sede</option>
                    {sedes.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.Nombre}
                      </option>
                    ))}
                  </select>
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

              {/* Etiquetas Dietéticas (UI) */}
              <div className="mt-4">
                <label className="block text-white font-semibold mb-3">Opciones Dietéticas</label>
                <div className="space-y-2">
                  <label className="flex items-center text-gray-300">
                    <input type="checkbox" checked readOnly className="mr-2 h-4 w-4 rounded opacity-80" />
                    🌱 Vegano (siempre disponible)
                  </label>
                  <label className="flex items-center text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newMenu.vegetarian}
                      onChange={(e) => setNewMenu({ ...newMenu, vegetarian: e.target.checked })}
                      className="mr-2 h-4 w-4 rounded"
                    />
                    🥗 Vegetariano
                  </label>
                  <label className="flex items-center text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newMenu.glutenFree}
                      onChange={(e) => setNewMenu({ ...newMenu, glutenFree: e.target.checked })}
                      className="mr-2 h-4 w-4 rounded"
                    />
                    🌾 Sin Gluten
                  </label>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddMenu}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition flex items-center"
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

          {/* Lista de menús */}
          {loadingMenus && <div className="text-gray-300 mb-6">Cargando menús...</div>}

          <div className="space-y-6">
            {menus.map((m) => {
              const mainId = m.Items?.find((i) => i.Tipo === "Principal")?.ID;
              const sideId = m.Items?.find((i) => i.Tipo === "Acompañamiento")?.ID;
              const dessertId = m.Items?.find((i) => i.Tipo === "Postre")?.ID;

              const mainName = mainId ? itemsMap.get(String(mainId)) : "";
              const sideName = sideId ? itemsMap.get(String(sideId)) : "";
              const dessertName = dessertId ? itemsMap.get(String(dessertId)) : "";

              const sedeName = sedes.find((s) => s._id === String(m.IDSede))?.Nombre || "Sede";

              return (
                <div key={m._id} className="bg-gray-800 rounded-lg p-6">
                  {isEditing && editingMenu?._id === m._id ? (
                    // Editar
                    <div>
                      <h3 className="text-white text-xl font-bold mb-4">Editar Menú</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white font-semibold mb-2">Fecha</label>
                          <input
                            type="date"
                            value={editingMenu.Fecha}
                            onChange={(e) => setEditingMenu({ ...editingMenu, Fecha: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-semibold mb-2">Sede</label>
                          <select
                            value={editingMenu.IDSede}
                            onChange={(e) => setEditingMenu({ ...editingMenu, IDSede: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                          >
                            {sedes.map((s) => (
                              <option key={s._id} value={s._id}>
                                {s.Nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-white font-semibold mb-2">Plato Principal</label>
                          <input
                            type="text"
                            value={editingMenu.mainName}
                            onChange={(e) => setEditingMenu({ ...editingMenu, mainName: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-semibold mb-2">Acompañamiento</label>
                          <input
                            type="text"
                            value={editingMenu.sideName}
                            onChange={(e) => setEditingMenu({ ...editingMenu, sideName: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-semibold mb-2">Postre</label>
                          <input
                            type="text"
                            value={editingMenu.dessertName}
                            onChange={(e) => setEditingMenu({ ...editingMenu, dessertName: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 mt-6">
                        <button
                          onClick={handleSaveEdit}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition flex items-center"
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
                    // Ver
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-white text-2xl font-bold">{sedeName}</h3>
                          <div className="flex items-center text-gray-400 mt-1">
                            <Calendar className="h-4 w-4 mr-2" />
                            {m.Fecha}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit({ ...m, IDSede: String(m.IDSede) })}
                            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(m._id)}
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-gray-300">
                        <p><span className="font-semibold text-white">Plato Principal:</span> {mainName || "—"}</p>
                        <p><span className="font-semibold text-white">Acompañamiento:</span> {sideName || "—"}</p>
                        <p><span className="font-semibold text-white">Postre:</span> {dessertName || "—"}</p>

                        <div className="mt-3">
                          <span className="font-semibold text-white">Opciones Dietéticas: </span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                              🌱 Vegano
                            </span>
                            {newMenu.vegetarian && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                                🥗 Vegetariano
                              </span>
                            )}
                            {newMenu.glutenFree && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-600 text-white">
                                🌾 Sin Gluten
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {!loadingMenus && !menus.length && (
              <div className="text-gray-400">No hay menús cargados.</div>
            )}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Admin;