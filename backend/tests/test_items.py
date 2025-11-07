# tests/test_items.py

def test_items_create_list_get_update_delete(app_client):
    # CREATE (usa /api/items/ con slash final)
    item = {"Nombre": "Pan con palta", "Tipo": "plato_fondo", "Clasificacion": "vegetariano"}
    resp = app_client.post("/api/items/", json=item)
    assert resp.status_code == 201
    item_id = resp.get_json()["_id"]

    # LIST
    resp = app_client.get("/api/items/")
    assert resp.status_code == 200
    data = resp.get_json()
    assert isinstance(data, list)
    assert any(d.get("_id") == item_id for d in data)

    # GET by id
    resp = app_client.get(f"/api/items/{item_id}")
    assert resp.status_code == 200
    detalle = resp.get_json()
    assert detalle.get("_id") == item_id
    assert detalle.get("Nombre") == "Pan con palta"

    # UPDATE (PUT)
    resp = app_client.put(f"/api/items/{item_id}", json={"Nombre": "Pan italiano", "Clasificacion": "vegano"})
    assert resp.status_code == 200

    # Verificar cambios
    resp = app_client.get(f"/api/items/{item_id}")
    assert resp.status_code == 200
    detalle2 = resp.get_json()
    assert detalle2.get("Nombre") == "Pan italiano"
    assert detalle2.get("Clasificacion") == "vegano"

    # DELETE
    resp = app_client.delete(f"/api/items/{item_id}")
    assert resp.status_code == 200

    # GET después de borrar → 404
    resp = app_client.get(f"/api/items/{item_id}")
    assert resp.status_code == 404


def test_items_missing_fields(app_client):
    # Falta Tipo y Clasificacion → 400
    resp = app_client.post("/api/items/", json={"Nombre": "Solo nombre"})
    assert resp.status_code == 400
    assert "Faltan" in resp.get_json()["error"]


def test_items_invalid_id_and_not_found(app_client):
    # ID inválido → 400
    resp = app_client.get("/api/items/not-an-id")
    assert resp.status_code == 400

    # ID válido pero inexistente → 404 (24 hex chars)
    oid = "66a9f9f9f9f9f9f9f9f9f9f9"
    resp = app_client.get(f"/api/items/{oid}")
    assert resp.status_code == 404

    # UPDATE con ID inválido → 400
    resp = app_client.put("/api/items/not-an-id", json={"Nombre": "X"})
    assert resp.status_code == 400

    # DELETE con ID inválido → 400
    resp = app_client.delete("/api/items/not-an-id")
    assert resp.status_code == 400

    # UPDATE con ID válido pero inexistente → 404
    resp = app_client.put(f"/api/items/{oid}", json={"Nombre": "X"})
    assert resp.status_code == 404

    # DELETE con ID válido pero inexistente → 404
    resp = app_client.delete(f"/api/items/{oid}")
    assert resp.status_code == 404
