from flask import Blueprint, request, jsonify
from database import db

sugerencias_bp = Blueprint("sugerencias_bp", __name__, url_prefix="/api/sugerencias")
sugerencias_bp.strict_slashes = False

# ✅ Crear una nueva sugerencia
@sugerencias_bp.route("", methods=["POST"])
def crear_sugerencia():
    data = request.get_json()
    nueva = {
        "nombre": data.get("nombre"),
        "correo": data.get("correo"),
        "telefono": data.get("telefono"),
        "casino": data.get("casino"),
        "tipo": data.get("tipo"),
        "mensaje": data.get("mensaje")
    }
    result = db["Sugerencias"].insert_one(nueva)
    return jsonify({"_id": str(result.inserted_id)}), 201


# ✅ Obtener todas las sugerencias
@sugerencias_bp.route("", methods=["GET"])
def listar_sugerencias():
    sugerencias = list(db["Sugerencias"].find())
    for s in sugerencias:
        s["_id"] = str(s["_id"])
    return jsonify(sugerencias), 200
