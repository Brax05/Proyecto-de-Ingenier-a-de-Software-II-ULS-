from flask import Blueprint, request, jsonify
from bson import ObjectId
from database import db

menu_bp = Blueprint("menu_bp", __name__)

# === Obtener todos los menús ===
@menu_bp.route("/", methods=["GET"])
def obtener_menus():
    menus = list(db.Menus.find())
    for m in menus:
        m["_id"] = str(m["_id"])
        if "Items" in m:
            for item in m["Items"]:
                if "ID" in item:
                    item["ID"] = str(item["ID"])
        if "IDSede" in m:
            m["IDSede"] = str(m["IDSede"])
    return jsonify(menus), 200


# === Obtener un menú por ID ===
@menu_bp.route("/<id>", methods=["GET"])
def obtener_menu(id):
    try:
        menu = db.Menus.find_one({"_id": ObjectId(id)})
        if not menu:
            return jsonify({"error": "Menú no encontrado"}), 404
        menu["_id"] = str(menu["_id"])
        if "Items" in menu:
            for item in menu["Items"]:
                if "ID" in item:
                    item["ID"] = str(item["ID"])
        if "IDSede" in menu:
            menu["IDSede"] = str(menu["IDSede"])
        return jsonify(menu), 200
    except:
        return jsonify({"error": "ID no válido"}), 400


# === Crear un nuevo menú ===
@menu_bp.route("/", methods=["POST"])
def crear_menu():
    data = request.json
    if not data.get("Fecha") or not data.get("IDSede") or not data.get("Items"):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    # Validar estructura del array de items
    items_validados = []
    for item in data["Items"]:
        if "Tipo" in item and "ID" in item:
            try:
                items_validados.append({
                    "Tipo": item["Tipo"],
                    "ID": ObjectId(item["ID"])
                })
            except:
                return jsonify({"error": f"El ID del ítem '{item}' no es válido"}), 400

    nuevo_menu = {
        "Fecha": data["Fecha"],
        "IDSede": ObjectId(data["IDSede"]),
        "Items": items_validados
    }

    result = db.Menus.insert_one(nuevo_menu)
    return jsonify({"_id": str(result.inserted_id)}), 201


# === Actualizar un menú ===
@menu_bp.route("/<id>", methods=["PUT"])
def actualizar_menu(id):
    try:
        data = request.json
        actualizacion = {}

        if "Fecha" in data:
            actualizacion["Fecha"] = data["Fecha"]

        if "IDSede" in data:
            try:
                actualizacion["IDSede"] = ObjectId(data["IDSede"])
            except:
                return jsonify({"error": "IDSede no válido"}), 400

        if "Items" in data:
            items_validados = []
            for item in data["Items"]:
                if "Tipo" in item and "ID" in item:
                    try:
                        items_validados.append({
                            "Tipo": item["Tipo"],
                            "ID": ObjectId(item["ID"])
                        })
                    except:
                        return jsonify({"error": f"El ID del ítem '{item}' no es válido"}), 400
            actualizacion["Items"] = items_validados

        result = db.Menus.update_one({"_id": ObjectId(id)}, {"$set": actualizacion})
        if result.matched_count == 0:
            return jsonify({"error": "Menú no encontrado"}), 404
        return jsonify({"mensaje": "Menú actualizado correctamente"}), 200

    except:
        return jsonify({"error": "ID no válido"}), 400


# === Eliminar un menú ===
@menu_bp.route("/<id>", methods=["DELETE"])
def eliminar_menu(id):
    try:
        result = db.Menus.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Menú no encontrado"}), 404
        return jsonify({"mensaje": "Menú eliminado correctamente"}), 200
    except:
        return jsonify({"error": "ID no válido"}), 400
