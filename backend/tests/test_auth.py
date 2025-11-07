from bson import ObjectId
from werkzeug.security import check_password_hash
import jwt
import os
from freezegun import freeze_time
import datetime

# ---------- REGISTER ----------

def test_register_missing_fields(app_client):
    resp = app_client.post("/api/auth/register", json={"Correo":"a@a.cl"})
    assert resp.status_code == 400
    assert resp.get_json()["error"].lower().startswith("faltan")

def test_register_duplicate_email(app_client):
    # Crea usuario por API
    first = app_client.post("/api/auth/register", json={
        "Nombre": "X", "Correo": "dup@a.cl", "Password": "123"
    })
    assert first.status_code == 201

    # Intenta registrar el mismo correo
    resp = app_client.post("/api/auth/register", json={
        "Nombre": "X", "Correo": "dup@a.cl", "Password": "123"
    })
    assert resp.status_code == 409
    assert "registrado" in resp.get_json()["error"].lower()


def test_register_success_and_login_flow(app_client):
    # Registro
    reg = app_client.post("/api/auth/register", json={
        "Nombre":"Ana","Correo":"ana@a.cl","Password":"secreta"
    })
    assert reg.status_code == 201

    # Login OK (implica que se guardó con hash y se verifica correctamente)
    ok = app_client.post("/api/auth/login", json={
        "Correo":"ana@a.cl","Password":"secreta"
    })
    assert ok.status_code == 200
    assert "token" in ok.get_json()

    # Login con clave errónea
    bad = app_client.post("/api/auth/login", json={
        "Correo":"ana@a.cl","Password":"mala"
    })
    assert bad.status_code == 401


# ---------- LOGIN ----------

def test_login_missing_fields(app_client):
    resp = app_client.post("/api/auth/login", json={"Correo":"ana@a.cl"})
    assert resp.status_code == 400

def test_login_user_not_found(app_client):
    resp = app_client.post("/api/auth/login", json={"Correo":"no@existe.cl","Password":"x"})
    assert resp.status_code == 401

def test_login_wrong_password(app_client, mock_db):
    # precrear usuario con pass "ok"
    from werkzeug.security import generate_password_hash
    mock_db.Usuarios.insert_one({
        "Nombre":"Ana","Correo":"ana@a.cl",
        "Password": generate_password_hash("ok"),
        "Rol":"admin"
    })
    resp = app_client.post("/api/auth/login", json={"Correo":"ana@a.cl","Password":"mal"})
    assert resp.status_code == 401

def test_login_success_jwt(app_client):
    reg = app_client.post("/api/auth/register", json={
        "Nombre":"Ana","Correo":"ana@a.cl","Password":"ok"
    })
    assert reg.status_code == 201

    resp = app_client.post("/api/auth/login", json={
        "Correo":"ana@a.cl","Password":"ok"
    })
    assert resp.status_code == 200
    body = resp.get_json()
    assert body["mensaje"].lower().startswith("login")
    token = body["token"]
    decoded = jwt.decode(token, os.getenv("SECRET_KEY","test-secret"), algorithms=["HS256"])
    assert "user_id" in decoded and "exp" in decoded

from freezegun import freeze_time
import datetime

@freeze_time("2025-01-01 12:00:00")
def test_login_token_expiration_claim(app_client):
    reg = app_client.post("/api/auth/register", json={
        "Nombre":"Ana","Correo":"exp@a.cl","Password":"ok"
    })
    assert reg.status_code == 201

    resp = app_client.post("/api/auth/login", json={
        "Correo":"exp@a.cl","Password":"ok"
    })
    assert resp.status_code == 200

    token = resp.get_json()["token"]
    decoded = jwt.decode(token, os.getenv("SECRET_KEY","test-secret"), algorithms=["HS256"])
    exp = datetime.datetime.fromtimestamp(decoded["exp"], tz=datetime.timezone.utc)
    assert (exp - datetime.datetime(2025,1,1,12,0,0,tzinfo=datetime.timezone.utc)) == datetime.timedelta(hours=3)

# ---------- GET USUARIOS ----------

def test_get_usuarios_hides_password(app_client, mock_db):
    mock_db.Usuarios.insert_one({"Nombre":"A","Correo":"a@a.cl","Password":"hash","Rol":"admin"})
    mock_db.Usuarios.insert_one({"Nombre":"B","Correo":"b@b.cl","Password":"hash2","Rol":"user"})
    resp = app_client.get("/api/auth/usuarios")
    assert resp.status_code == 200
    usuarios = resp.get_json()
    assert len(usuarios) == 2
    assert all("Password" not in u for u in usuarios)
    assert all(isinstance(u["_id"], str) for u in usuarios)

# ---------- DELETE USUARIO ----------

def test_delete_usuario_invalid_id(app_client):
    resp = app_client.delete("/api/auth/usuarios/not-an-id")
    assert resp.status_code == 400

def test_delete_usuario_not_found(app_client):
    oid = "64b0f9f1b1b1b1b1b1b1b1b1"
    resp = app_client.delete(f"/api/auth/usuarios/{oid}")
    assert resp.status_code == 404

def test_delete_usuario_ok(app_client):
    reg = app_client.post("/api/auth/register", json={
        "Nombre":"X","Correo":"x@x.cl","Password":"h"
    })
    assert reg.status_code == 201
    user_id = reg.get_json()["_id"]

    resp = app_client.delete(f"/api/auth/usuarios/{user_id}")
    assert resp.status_code == 200

    # opcional: comprobar que ya no está
    again = app_client.delete(f"/api/auth/usuarios/{user_id}")
    assert again.status_code == 404

