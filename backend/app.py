from flask import Flask
from flask_cors import CORS
from routes.menu_routes import menu_bp
from routes.sedes_routes import sedes_bp
from routes.auth_routes import auth_bp
from routes.productos_routes import productos_bp
from routes.items_routes import items_bp
from routes.sugerencias_routes import sugerencias_bp

app = Flask(__name__)

# ✅ CORS configurado para permitir peticiones desde cualquier origen
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# ✅ Registro de rutas (sin dobles prefijos)
app.register_blueprint(menu_bp, url_prefix="/api/menus")
app.register_blueprint(sedes_bp, url_prefix="/api/sedes")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(productos_bp, url_prefix="/api/productos")
app.register_blueprint(items_bp, url_prefix="/api/items")
app.register_blueprint(sugerencias_bp, url_prefix="/api/sugerencias")

@app.route('/')
def home():
    return {"mensaje": "Backend del Casino ULS funcionando correctamente 🍽️"}

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
