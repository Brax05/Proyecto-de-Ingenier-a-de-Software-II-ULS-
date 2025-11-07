import os, sys, pathlib, importlib.util, pytest, mongomock
from uuid import uuid4

ROOT = pathlib.Path(__file__).resolve().parents[1]
APP_FILE = ROOT / "app.py"
DATABASE_FILE = ROOT / "database.py"

def _load_module_from_path(mod_name: str, file_path: pathlib.Path):
    spec = importlib.util.spec_from_file_location(mod_name, str(file_path))
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)  # type: ignore
    sys.modules[mod_name] = module
    return module

@pytest.fixture(autouse=True)
def _env(monkeypatch):
    monkeypatch.setenv("SECRET_KEY", "test-secret")
    monkeypatch.setenv("MONGO_URI", "mongodb://localhost:27017")
    monkeypatch.setenv("DB_NAME", "testdb")  # no importa, lo sobreescribimos

@pytest.fixture
def mock_db():
    client = mongomock.MongoClient()
    # DB única por test
    db = client[f"testdb_{uuid4().hex}"]

    # Carga y registra 'database' y apunta al db único
    database = _load_module_from_path("database", DATABASE_FILE)
    database.db = db
    return db

@pytest.fixture
def app_client(mock_db):
    # Forzar recarga de módulos que podrían cachear la app o el db
    for mod in ["app", "routes.auth_routes", "routes.items_routes",
                "routes.productos_routes", "routes.menu_routes",
                "routes.sedes_routes"]:
        if mod in sys.modules:
            del sys.modules[mod]

    app_module = _load_module_from_path("app", APP_FILE)
    app_module.app.config.update(TESTING=True)
    with app_module.app.test_client() as client:
        yield client
