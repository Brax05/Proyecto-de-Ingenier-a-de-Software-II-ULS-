# Guía de Deployment en Vercel - Casino ULS

## Cambios Realizados

### 1. Eliminación del apartado de Noticias
- ✅ Eliminada la ruta `/noticia` de `App.jsx`
- ✅ Eliminado el componente `Noticia.jsx`
- ✅ Eliminado el componente `NoticiaCard.jsx`
- ✅ Eliminados los enlaces de "Noticias" del Header (versión escritorio y móvil)

### 2. Configuración de MongoDB Atlas

Se ha creado el archivo `backend/database.py` con la configuración correcta para conectar con MongoDB Atlas, incluyendo:
- Timeouts optimizados para entornos serverless
- Manejo de errores robusto
- Carga de variables de entorno con `python-dotenv`

## Configuración de Variables de Entorno en Vercel

Para que la conexión con MongoDB Atlas funcione en Vercel, debes configurar las siguientes variables de entorno:

### Paso 1: Acceder a tu proyecto en Vercel
1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Selecciona tu proyecto

### Paso 2: Configurar Variables de Entorno
1. Ve a **Settings** → **Environment Variables**
2. Agrega las siguientes variables:

| Variable | Valor | Entornos |
|----------|-------|----------|
| `MONGO_URI` | `mongodb+srv://cristhianmontenegro_db_user:12345@cluster0.92wfdod.mongodb.net/?appName=Cluster0` | Production, Preview, Development |
| `DB_NAME` | `CasinoDB` | Production, Preview, Development |

### Paso 3: Redeploy
Después de agregar las variables de entorno:
1. Ve a la pestaña **Deployments**
2. Haz clic en los tres puntos del último deployment
3. Selecciona **Redeploy**

## Problemas Comunes y Soluciones

### Problema: "MONGO_URI no está configurada"
**Solución:** Verifica que las variables de entorno estén configuradas correctamente en Vercel y que hayas hecho un redeploy después de agregarlas.

### Problema: "Connection timeout"
**Solución:** 
1. Verifica que la IP de Vercel esté en la lista blanca de MongoDB Atlas
2. En MongoDB Atlas, ve a **Network Access** y agrega `0.0.0.0/0` para permitir todas las IPs (o específicamente las IPs de Vercel)

### Problema: "Authentication failed"
**Solución:** 
1. Verifica que el usuario y contraseña en `MONGO_URI` sean correctos
2. Asegúrate de que el usuario tenga permisos de lectura/escritura en la base de datos `CasinoDB`

## Recomendaciones de Seguridad

⚠️ **IMPORTANTE:** La contraseña actual (`12345`) es muy débil. Se recomienda:

1. **Cambiar la contraseña en MongoDB Atlas:**
   - Ve a **Database Access** en MongoDB Atlas
   - Edita el usuario `cristhianmontenegro_db_user`
   - Establece una contraseña fuerte (mínimo 16 caracteres con letras, números y símbolos)

2. **Actualizar la variable de entorno en Vercel:**
   - Actualiza `MONGO_URI` con la nueva contraseña
   - Haz un redeploy

3. **Restringir acceso por IP (opcional pero recomendado):**
   - En lugar de `0.0.0.0/0`, agrega solo las IPs de Vercel
   - Lista de IPs de Vercel: https://vercel.com/docs/concepts/edge-network/regions

## Estructura del Proyecto

```
proyecto-modificado/
├── backend/
│   ├── app.py              # Aplicación Flask principal
│   ├── database.py         # ✨ NUEVO: Configuración de MongoDB
│   ├── requirements.txt    # Dependencias Python
│   ├── .env               # Variables de entorno (NO subir a Git)
│   └── routes/            # Rutas de la API
├── src/
│   ├── components/        # Componentes React
│   ├── pages/            # Páginas React
│   └── ...
├── vercel.json           # ✨ NUEVO: Configuración de Vercel
├── .env                  # Variables de entorno raíz
└── .gitignore           # Archivos a ignorar en Git
```

## Comandos Útiles

### Desarrollo Local
```bash
# Backend
cd backend
pip install -r requirements.txt
python app.py

# Frontend
npm install
npm run dev
```

### Verificar Conexión a MongoDB
```bash
cd backend
python -c "from database import db; print('✅ Conexión exitosa')"
```

## Soporte

Si encuentras problemas durante el deployment, verifica:
1. ✅ Variables de entorno configuradas en Vercel
2. ✅ Lista blanca de IPs en MongoDB Atlas
3. ✅ Credenciales correctas en `MONGO_URI`
4. ✅ Base de datos `CasinoDB` existe en MongoDB Atlas
