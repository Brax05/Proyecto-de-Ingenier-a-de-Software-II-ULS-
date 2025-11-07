# tests/test_sedes.py

def test_sedes_create_list_get_update_delete(app_client):
    # CREATE (Nombre, Direccion, Horarios son obligatorios)
    nueva = {"Nombre": "Sede Central", "Direccion": "Av. ULS 123", "Horarios": "L-V 8:00-18:00"}
    resp = app_client.post("/api/sedes/", json=nueva)
    assert resp.status_code == 201
    sede_id = resp.get_json()["_id"]

    # LIST
    resp = app_client.get("/api/sedes/")
    assert resp.status_code == 200
    sedes = resp.get_json()
    assert isinstance(sedes, list)
    assert any(s.get("_id") == sede_id for s in sedes)

    # GET by id
    resp = app_client.get(f"/api/sedes/{sede_id}")
    assert resp.status_code == 200
    detalle = resp.get_json()
    assert detalle["Nombre"] == "Sede Central"
    assert detalle["Direccion"] == "Av. ULS 123"
    assert detalle["Horarios"] == "L-V 8:00-18:00"

    # UPDATE (PUT parcial: cambia Dirección y Horarios)
    resp = app_client.put(f"/api/sedes/{sede_id}", json={"Direccion": "Av. ULS 456", "Horarios": "L-V 9:00-17:00"})
    assert resp.status_code == 200

    # Verificar cambios
    resp = app_client.get(f"/api/sedes/{sede_id}")
    assert resp.status_code == 200
    detalle2 = resp.get_json()
    assert detalle2["Direccion"] == "Av. ULS 456"
    assert detalle2["Horarios"] == "L-V 9:00-17:00"

    # DELETE
    resp = app_client.delete(f"/api/sedes/{sede_id}")
    assert resp.status_code == 200

    # GET después de borrar → 404
    resp = app_client.get(f"/api/sedes/{sede_id}")
    assert resp.status_code == 404


def test_sedes_missing_fields(app_client):
    # Falta Direccion y Horarios → 400
    resp = app_client.post("/api/sedes/", json={"Nombre": "Solo nombre"})
    assert resp.status_code == 400
    assert "Faltan" in resp.get_json()["error"]


def test_sedes_invalid_id_and_not_found(app_client):
    # ID inválido → 400 (tu ruta usa try/except)
    resp = app_client.get("/api/sedes/not-an-id")
    assert resp.status_code == 400

    # ID “válido” pero inexistente (24 hex) → 404
    fake_id = "66a9f9f9f9f9f9f9f9f9f9f9"
    resp = app_client.get(f"/api/sedes/{fake_id}")
    assert resp.status_code == 404

    # UPDATE con ID inválido → 400
    resp = app_client.put("/api/sedes/not-an-id", json={"Nombre": "X"})
    assert resp.status_code == 400

    # DELETE con ID inválido → 400
    resp = app_client.delete("/api/sedes/not-an-id")
    assert resp.status_code == 400

    # UPDATE con ID válido inexistente → 404
    resp = app_client.put(f"/api/sedes/{fake_id}", json={"Nombre": "X"})
    assert resp.status_code == 404

    # DELETE con ID válido inexistente → 404
    resp = app_client.delete(f"/api/sedes/{fake_id}")
    assert resp.status_code == 404
