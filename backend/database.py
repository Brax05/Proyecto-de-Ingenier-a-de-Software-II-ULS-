from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Obtener la URI de MongoDB desde las variables de entorno
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "CasinoDB")

# Verificar que la URI esté configurada
if not MONGO_URI:
    raise ValueError("❌ MONGO_URI no está configurada en las variables de entorno")

try:
    # Crear cliente de MongoDB con configuraciones optimizadas para Vercel
    client = MongoClient(
        MONGO_URI,
        serverSelectionTimeoutMS=5000,  # Timeout de 5 segundos
        connectTimeoutMS=10000,         # Timeout de conexión de 10 segundos
        socketTimeoutMS=10000,          # Timeout de socket de 10 segundos
        retryWrites=True,               # Reintentar escrituras automáticamente
        w='majority'                    # Nivel de escritura seguro
    )
    
    # Verificar la conexión
    client.admin.command('ping')
    print(f"✅ Conexión exitosa a MongoDB Atlas - Base de datos: {DB_NAME}")
    
    # Obtener la base de datos
    db = client[DB_NAME]
    
except Exception as e:
    print(f"❌ Error al conectar con MongoDB Atlas: {e}")
    raise
