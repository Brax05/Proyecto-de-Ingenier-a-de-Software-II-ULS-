from flask import Blueprint, request, jsonify
from bson import ObjectId
from database import db
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os

auth_bp = Blueprint("auth_bp", __name__)

SECRET_KEY = os.getenv("SECRET_KEY", "superclave")

# === Registrar usuario ===
@auth_bp.route("/register", methods=["POST"])
def registrar_usuario():
    data = request.json
    if not data.get("Nombre") or not data.get("Correo") or not data.get("Password"):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    # Evitar usuarios duplicados
    if db.Usuarios.find_one({"Correo": data["Correo"]}):
        return jsonify({"error": "El correo ya está registrado"}), 409

    # Encriptar la contraseña
    hashed_password = generate_password_hash(data["Password"])

    nuevo_usuario = {
        "Nombre": data["Nombre"],
        "Apellido": data.get("Apellido", ""),
        "Correo": data["Correo"],
        "Password": hashed_password,
        "Rol": data.get("Rol", "admin"),  # Por defecto admin
        "SedeID": data.get("SedeID", None)
    }

    result = db.Usuarios.insert_one(nuevo_usuario)
    return jsonify({"_id": str(result.inserted_id)}), 201


# === Login ===
@auth_bp.route("/login", methods=["POST"])
def login_usuario():
    data = request.json
    if not data.get("Correo") or not data.get("Password"):
        return jsonify({"error": "Correo y contraseña son obligatorios"}), 400

    usuario = db.Usuarios.find_one({"Correo": data["Correo"]})
    if not usuario or not check_password_hash(usuario["Password"], data["Password"]):
        return jsonify({"error": "Credenciales inválidas"}), 401

    token = jwt.encode(
        {
            "user_id": str(usuario["_id"]),
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=3)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "mensaje": "Login exitoso",
        "token": token,
        "usuario": {
            "Nombre": usuario["Nombre"],
            "Correo": usuario["Correo"],
            "Rol": usuario["Rol"]
        }
    }), 200


# === Obtener todos los usuarios (solo para admin) ===
@auth_bp.route("/usuarios", methods=["GET"])
def obtener_usuarios():
    usuarios = list(db.Usuarios.find())
    for u in usuarios:
        u["_id"] = str(u["_id"])
        del u["Password"]
    return jsonify(usuarios), 200


# === Eliminar usuario ===
@auth_bp.route("/usuarios/<id>", methods=["DELETE"])
def eliminar_usuario(id):
    try:
        result = db.Usuarios.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Usuario no encontrado"}), 404
        return jsonify({"mensaje": "Usuario eliminado correctamente"}), 200
    except:
        return jsonify({"error": "ID no válido"}), 400
