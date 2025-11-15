#!/bin/bash

# Script de build para Vercel
echo "🔨 Iniciando build del frontend..."

# Instalar dependencias
npm install

# Build del frontend
npm run build

echo "✅ Build completado exitosamente"
