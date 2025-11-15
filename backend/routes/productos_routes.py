from flask import Blueprint, request, jsonify
from bson import ObjectId
from database import db

# Blueprint para los productos
productos_bp = Blueprint("productos_bp", __name__)

# === Obtener todos los productos ===
@productos_bp.route("/", methods=["GET"])
def obtener_productos():
    productos = list(db.Productos.find())
    for p in productos:
        p["_id"] = str(p["_id"])
    return jsonify(productos), 200

# === Obtener un producto por ID ===
@productos_bp.route("/<id>", methods=["GET"])
def obtener_producto(id):
    producto = db.Productos.find_one({"_id": ObjectId(id)})
    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404
    producto["_id"] = str(producto["_id"])
    return jsonify(producto), 200

# === Crear un nuevo producto ===
@productos_bp.route("/", methods=["POST"])
def crear_producto():
    data = request.json
    if not data.get("Nombre") or not data.get("Categoria") or not data.get("Precio"):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    nuevo_producto = {
        "Nombre": data["Nombre"],
        "Categoria": data["Categoria"],
        "Precio": float(data["Precio"])
    }
    result = db.Productos.insert_one(nuevo_producto)
    return jsonify({"_id": str(result.inserted_id)}), 201

# === Actualizar un producto ===
@productos_bp.route("/<id>", methods=["PUT"])
def actualizar_producto(id):
    data = request.json
    actualizacion = {}
    if "Nombre" in data: actualizacion["Nombre"] = data["Nombre"]
    if "Categoria" in data: actualizacion["Categoria"] = data["Categoria"]
    if "Precio" in data: actualizacion["Precio"] = float(data["Precio"])

    result = db.Productos.update_one({"_id": ObjectId(id)}, {"$set": actualizacion})
    if result.matched_count == 0:
        return jsonify({"error": "Producto no encontrado"}), 404
    return jsonify({"mensaje": "Producto actualizado correctamente"}), 200

# === Eliminar un producto ===
@productos_bp.route("/<id>", methods=["DELETE"])
def eliminar_producto(id):
    result = db.Productos.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Producto no encontrado"}), 404
    return jsonify({"mensaje": "Producto eliminado correctamente"}), 200
