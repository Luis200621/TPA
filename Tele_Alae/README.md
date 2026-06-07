
# 🏥 Tele Alae - Sistema de Telemedicina Chiloé

Sistema de telemedicina desarrollado para el archipiélago de Chiloé, 
que permite la gestión de consultas médicas remotas entre pacientes y médicos.

## 👥 Vistas del Sistema
- **Auth** - Autenticación y registro de usuarios mediante OTP
- **Médico** - Panel de gestión para médicos
- **Paciente** - Vista del paciente para seguimiento de consultas
- **Sala de Espera** - Cola de espera virtual para consultas

Tu nuevo proyecto Fresh está listo. Puedes seguir la guía de inicio de Fresh aquí: https://fresh.deno.dev/docs/getting-started

## 📋 Requisitos Previos

Asegúrate de tener instalado **Deno**. Si no lo tienes, descárgalo aquí: https://deno.land/manual/getting_started/installation

## 🚀 Cómo Iniciar el Proyecto

### 1. Navega a la carpeta del proyecto
```powershell
cd Tele_Alae
```

### 2. Inicia el servidor de desarrollo
```powershell
deno task start
```

Esto vigilará los cambios en el proyecto y se reiniciará automáticamente.

## 📦 Librerías Incluidas

- **Fresh** - Framework web moderno para Deno
- **Preact** - Alternativa ligera a React
- **Tailwind CSS** - Framework de CSS para estilos
- **Preact Signals** - Gestión de estado reactivo
- **Zod** - Validación de tipos en tiempo de ejecución
- **Jose** - Manejo de JWT tokens
- **Log** - Sistema de logging
- **Mongo/Postgres** - Drivers de base de datos
- **Oak** - Framework HTTP alternativo

## 🛠️ Comandos Disponibles

```powershell
deno task start      # Inicia el servidor de desarrollo
deno task build      # Construye la aplicación
deno task preview    # Vista previa de la aplicación compilada
deno task check      # Verifica formato, linting y tipos
deno task update     # Actualiza Fresh a la última versión
```

## 📝 Notas

- El servidor se reiniciará automáticamente cuando realices cambios
- Abre tu navegador en `http://localhost:8000` para ver la aplicación
- Cualquier error de TypeScript aparecerá en la consola
