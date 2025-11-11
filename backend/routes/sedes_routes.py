from flask import Blueprint, request, jsonify
from bson import ObjectId
from database import db

# Blueprint para las sedes
sedes_bp = Blueprint("sedes_bp", __name__)

# === Obtener todas las sedes ===
@sedes_bp.route("/", methods=["GET"])
def obtener_sedes():
    sedes = list(db.Sedes.find())
    for s in sedes:
        s["_id"] = str(s["_id"])
    return jsonify(sedes), 200


# === Obtener una sede por ID ===
@sedes_bp.route("/<id>", methods=["GET"])
def obtener_sede(id):
    try:
        sede = db.Sedes.find_one({"_id": ObjectId(id)})
        if not sede:
            return jsonify({"error": "Sede no encontrada"}), 404
        sede["_id"] = str(sede["_id"])
        return jsonify(sede), 200
    except:
        return jsonify({"error": "ID no válido"}), 400


# === Crear una nueva sede ===
@sedes_bp.route("/", methods=["POST"])
def crear_sede():
    data = request.json
    if not data.get("Nombre") or not data.get("Direccion") or not data.get("Horarios"):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    nueva_sede = {
        "Nombre": data["Nombre"],
        "Direccion": data["Direccion"],
        "Horarios": data["Horarios"]
    }

    result = db.Sedes.insert_one(nueva_sede)
    return jsonify({"_id": str(result.inserted_id)}), 201


# === Actualizar una sede ===
@sedes_bp.route("/<id>", methods=["PUT"])
def actualizar_sede(id):
    try:
        data = request.json
        actualizacion = {}

        if "Nombre" in data:
            actualizacion["Nombre"] = data["Nombre"]
        if "Direccion" in data:
            actualizacion["Direccion"] = data["Direccion"]
        if "Horarios" in data:
            actualizacion["Horarios"] = data["Horarios"]

        result = db.Sedes.update_one({"_id": ObjectId(id)}, {"$set": actualizacion})
        if result.matched_count == 0:
            return jsonify({"error": "Sede no encontrada"}), 404
        return jsonify({"mensaje": "Sede actualizada correctamente"}), 200
    except:
        return jsonify({"error": "ID no válido"}), 400


# === Eliminar una sede ===
@sedes_bp.route("/<id>", methods=["DELETE"])
def eliminar_sede(id):
    try:
        result = db.Sedes.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Sede no encontrada"}), 404
        return jsonify({"mensaje": "Sede eliminada correctamente"}), 200
    except:
        return jsonify({"error": "ID no válido"}), 400
