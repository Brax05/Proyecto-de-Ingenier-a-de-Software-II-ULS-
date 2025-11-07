# tests/test_menus.py

def crear_sede(app_client):
    # Crea una sede válida para usar en Menús
    sede = {
        "Nombre": "Sede Central",
        "Direccion": "Av. ULS 123",
        "Horarios": "L-V 8:00-18:00"   
    }
    resp = app_client.post("/api/sedes/", json=sede)
    assert resp.status_code == 201, resp.get_json()
    return resp.get_json()["_id"]

def crear_item(app_client):
    # Crea un ítem válido para usar en Menús
    item = {"Nombre": "Empanada", "Tipo": "plato_fondo", "Clasificacion": "tradicional"}
    resp = app_client.post("/api/items/", json=item)
    assert resp.status_code == 201
    return resp.get_json()["_id"]


def test_menus_create_list_get_update_delete(app_client):
    # Crear dependencias
    sede_id = crear_sede(app_client)
    item1 = crear_item(app_client)
    item2 = crear_item(app_client)

    # CREATE
    nuevo_menu = {
        "Fecha": "2025-11-06",
        "IDSede": sede_id,
        "Items": [
            {"Tipo": "plato_fondo", "ID": item1},
            {"Tipo": "postre", "ID": item2}
        ]
    }
    resp = app_client.post("/api/menus/", json=nuevo_menu)
    assert resp.status_code == 201
    menu_id = resp.get_json()["_id"]

    # LIST
    resp = app_client.get("/api/menus/")
    assert resp.status_code == 200
    data = resp.get_json()
    assert any(m.get("_id") == menu_id for m in data)

    # GET by id
    resp = app_client.get(f"/api/menus/{menu_id}")
    assert resp.status_code == 200
    detalle = resp.get_json()
    assert detalle["IDSede"] == sede_id
    assert isinstance(detalle["Items"], list)
    assert len(detalle["Items"]) == 2

    # UPDATE (cambiar la fecha)
    resp = app_client.put(f"/api/menus/{menu_id}", json={"Fecha": "2025-12-01"})
    assert resp.status_code == 200

    # Verificar que se actualizó
    resp = app_client.get(f"/api/menus/{menu_id}")
    assert resp.status_code == 200
    detalle2 = resp.get_json()
    assert detalle2["Fecha"] == "2025-12-01"

    # DELETE
    resp = app_client.delete(f"/api/menus/{menu_id}")
    assert resp.status_code == 200

    # GET luego de borrar → 404
    resp = app_client.get(f"/api/menus/{menu_id}")
    assert resp.status_code == 404


def test_menus_missing_fields(app_client):
    # Falta Fecha → 400
    sede_id = crear_sede(app_client)
    resp = app_client.post("/api/menus/", json={
        "IDSede": sede_id,
        "Items": [{"Tipo": "plato_fondo", "ID": "66a9f9f9f9f9f9f9f9f9f9f9"}]
    })
    assert resp.status_code == 400
    assert "Faltan" in resp.get_json()["error"]


def test_menus_invalid_item_and_sede_ids(app_client):
    # IDSede no válido
    bad_menu = {
        "Fecha": "2025-11-06",
        "IDSede": "not-an-id",
        "Items": [{"Tipo": "plato_fondo", "ID": "not-an-id"}]
    }
    resp = app_client.post("/api/menus/", json=bad_menu)
    assert resp.status_code == 400

    # Crear sede válida
    sede_id = crear_sede(app_client)

    # Item ID no válido
    bad_menu2 = {
        "Fecha": "2025-11-06",
        "IDSede": sede_id,
        "Items": [{"Tipo": "plato_fondo", "ID": "not-an-id"}]
    }
    resp = app_client.post("/api/menus/", json=bad_menu2)
    assert resp.status_code == 400


def test_menus_update_invalid_and_not_found(app_client):
    # ID inválido
    resp = app_client.put("/api/menus/not-an-id", json={"Fecha": "2025-11-10"})
    assert resp.status_code == 400

    # ID válido pero no existe
    fake_id = "66a9f9f9f9f9f9f9f9f9f9f9"
    resp = app_client.put(f"/api/menus/{fake_id}", json={"Fecha": "2025-11-10"})
    assert resp.status_code == 404


def test_menus_delete_invalid_and_not_found(app_client):
    # ID inválido
    resp = app_client.delete("/api/menus/not-an-id")
    assert resp.status_code == 400

    # ID válido pero inexistente
    fake_id = "66a9f9f9f9f9f9f9f9f9f9f9"
    resp = app_client.delete(f"/api/menus/{fake_id}")
    assert resp.status_code == 404


#SE CUELA UN INSERT CON UN ID QUE NO EXISTE, EN EL FUTURO -> DATOS HUERFANOS
def test_menus_ids_not_found(app_client):
    # ObjectIds validos pero no existen
    sede_fake = "66a9f9f9f9f9f9f9f9f9f9f9"
    item_fake = "77b8e8e8e8e8e8e8e8e8e8e8"

    resp = app_client.post("/api/menus/", json={
        "Fecha": "2025-01-01",
        "IDSede": sede_fake,
        "Items": [
            {"Tipo": "plato_fondo", "ID": item_fake}
        ]
    })
    assert resp.status_code in (400, 422), f"Se espera error, pero retorna {resp.status_code}"