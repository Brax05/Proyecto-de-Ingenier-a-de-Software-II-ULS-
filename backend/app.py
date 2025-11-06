from flask import Flask
from flask_cors import CORS
from routes.menu_routes import menu_bp
"""from routes.noticias_routes import noticias_bp"""
from routes.sedes_routes import sedes_bp
"""from routes.sugerencias_routes import sugerencias_bp"""
from routes.auth_routes import auth_bp
from routes.productos_routes import productos_bp
from routes.items_routes import items_bp


app = Flask(__name__)
CORS(app)

# Registrar las rutas (CRUDs)
app.register_blueprint(menu_bp, url_prefix="/api/menus")
"""app.register_blueprint(noticias_bp, url_prefix="/api/noticias")"""
app.register_blueprint(sedes_bp, url_prefix="/api/sedes")
"""app.register_blueprint(sugerencias_bp, url_prefix="/api/sugerencias")"""
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(productos_bp, url_prefix="/api/productos")
app.register_blueprint(items_bp, url_prefix="/api/items")


@app.route('/')
def home():
    return {"mensaje": "Backend del Casino ULS funcionando correctamente 🍽️"}

if __name__ == "__main__":
    app.run(debug=True)
