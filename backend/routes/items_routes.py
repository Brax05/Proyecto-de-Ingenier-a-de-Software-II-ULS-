from flask import Blueprint, request, jsonify
from bson import ObjectId
from database import db

# Blueprint para los ítems del menú
items_bp = Blueprint("items_bp", __name__)

# === Obtener todos los ítems ===
@items_bp.route("/", methods=["GET"])
def obtener_items():
    items = list(db.ItemsMenu.find())
    for i in items:
        i["_id"] = str(i["_id"])
    return jsonify(items), 200

# === Obtener un ítem por ID ===
@items_bp.route("/<id>", methods=["GET"])
def obtener_item(id):
    try:
        item = db.ItemsMenu.find_one({"_id": ObjectId(id)})
        if not item:
            return jsonify({"error": "Ítem no encontrado"}), 404
        item["_id"] = str(item["_id"])
        return jsonify(item), 200
    except:
        return jsonify({"error": "ID no válido"}), 400

# === Crear un nuevo ítem ===
@items_bp.route("/", methods=["POST"])
def crear_item():
    data = request.json
    if not data.get("Nombre") or not data.get("Tipo") or not data.get("Clasificacion"):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    nuevo_item = {
        "Nombre": data["Nombre"],
        "Tipo": data["Tipo"],
        "Clasificacion": data["Clasificacion"]
    }
    result = db.ItemsMenu.insert_one(nuevo_item)
    return jsonify({"_id": str(result.inserted_id)}), 201

# === Actualizar un ítem ===
@items_bp.route("/<id>", methods=["PUT"])
def actualizar_item(id):
    try:
        data = request.json
        actualizacion = {}
        if "Nombre" in data: actualizacion["Nombre"] = data["Nombre"]
        if "Tipo" in data: actualizacion["Tipo"] = data["Tipo"]
        if "Clasificacion" in data: actualizacion["Clasificacion"] = data["Clasificacion"]

        result = db.ItemsMenu.update_one({"_id": ObjectId(id)}, {"$set": actualizacion})
        if result.matched_count == 0:
            return jsonify({"error": "Ítem no encontrado"}), 404
        return jsonify({"mensaje": "Ítem actualizado correctamente"}), 200
    except:
        return jsonify({"error": "ID no válido"}), 400

# === Eliminar un ítem ===
@items_bp.route("/<id>", methods=["DELETE"])
def eliminar_item(id):
    try:
        result = db.ItemsMenu.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Ítem no encontrado"}), 404
        return jsonify({"mensaje": "Ítem eliminado correctamente"}), 200
    except:
        return jsonify({"error": "ID no válido"}), 400
