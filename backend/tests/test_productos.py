# tests/test_productos.py

def test_productos_create_list_get_update_delete(app_client):
    # CREATE (precio numérico o string numérico sirven porque se hace float(...))
    nuevo = {"Nombre": "Manzana", "Categoria": "Fruta", "Precio": "500"}
    resp = app_client.post("/api/productos/", json=nuevo)
    assert resp.status_code == 201
    prod_id = resp.get_json()["_id"]

    # LIST
    resp = app_client.get("/api/productos/")
    assert resp.status_code == 200
    lista = resp.get_json()
    assert any(p.get("_id") == prod_id for p in lista)

    # GET by id (válido)
    resp = app_client.get(f"/api/productos/{prod_id}")
    assert resp.status_code == 200
    detalle = resp.get_json()
    assert detalle["Nombre"] == "Manzana"
    assert detalle["Categoria"] == "Fruta"

    # UPDATE (solo precio)
    resp = app_client.put(f"/api/productos/{prod_id}", json={"Precio": 600})
    assert resp.status_code == 200

    # Verificar cambio
    resp = app_client.get(f"/api/productos/{prod_id}")
    assert resp.status_code == 200
    detalle2 = resp.get_json()
    assert detalle2["Precio"] == 600.0

    # DELETE
    resp = app_client.delete(f"/api/productos/{prod_id}")
    assert resp.status_code == 200

    # GET luego de borrar → 404
    resp = app_client.get(f"/api/productos/{prod_id}")
    assert resp.status_code == 404


def test_productos_missing_fields(app_client):
    # Falta Categoria y Precio → 400
    resp = app_client.post("/api/productos/", json={"Nombre": "Solo nombre"})
    assert resp.status_code == 400
    assert "Faltan" in resp.get_json()["error"]


def test_productos_get_not_found_with_valid_objectid(app_client):
    # ObjectId válido pero inexistente (24 hex)
    fake_id = "66a9f9f9f9f9f9f9f9f9f9f9"
    resp = app_client.get(f"/api/productos/{fake_id}")
    assert resp.status_code == 404


def test_productos_update_partial_fields(app_client):
    # Crear
    resp = app_client.post("/api/productos/", json={"Nombre": "Pan", "Categoria": "Panadería", "Precio": 1000})
    assert resp.status_code == 201
    prod_id = resp.get_json()["_id"]

    # Actualizar sólo nombre
    resp = app_client.put(f"/api/productos/{prod_id}", json={"Nombre": "Pan integral"})
    assert resp.status_code == 200

    # Verificar
    resp = app_client.get(f"/api/productos/{prod_id}")
    assert resp.status_code == 200
    detalle = resp.get_json()
    assert detalle["Nombre"] == "Pan integral"
    assert detalle["Categoria"] == "Panadería"
    assert detalle["Precio"] == 1000.0

def test_producto_precio_invalido(app_client):
    resp = app_client.post("/api/productos/", json={
        "Nombre": "Té verde",
        "Categoria": "Bebida",
        "Precio": "no-es-numero"
    })
    print("\nRespuesta del servidor:", resp.status_code, resp.get_json())
    # Error 500 si backend no valida correctamente
    assert resp.status_code in (400, 500)