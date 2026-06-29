
# 🏥 Tele Alae - Sistema de Telemedicina Chiloé

Sistema de telemedicina desarrollado para el archipiélago de Chiloé, 
que permite la gestión de consultas médicas remotas entre pacientes y médicos.

## 👥 Vistas del Sistema

### 🔐 Auth - Autenticación
- **Iniciar Sesión** - Formulario con correo y contraseña
- **Crear Cuenta** - Registro con Nombre Completo, RUN, Email, 
  Número Telefónico y Contacto de Emergencia
- Verificación mediante código OTP

### 🏥 Médico - Panel del Doctor
- Resumen de **Pacientes Totales**, **Pacientes Críticos** y 
  **Consultas Activas**
- **Lista de Espera** con columnas: Nombre, Síntomas, Prioridad, 
  Tiempo, Status y Acción
- Vista detallada del paciente en consulta
- Acciones disponibles: **Llamar**, **Urgencias** y **Generar Receta**
- Generación de recetas: **Retenida**, **Simple** o **Cheque**
- Selección de tipo de especialidad médica

### 🧑‍⚕️ Paciente - Panel del Paciente  
- Bienvenida personalizada con nombre del paciente
- Resumen de **Estado Actual**, **Nivel de Prioridad** y 
  **Fecha de Consulta**
- Acceso a **Agendar Hora** e **Historial de Consultas Médicas**

### ⏳ Sala de Espera
- Vista en tiempo real del estado de la consulta
- Muestra síntomas, prioridad, tiempo de espera y status
- Se actualiza automáticamente cuando el médico llama al paciente


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
``
🧩 Patrones de Diseño en Tele Alae
El sistema aplica varios patrones de diseño para organizar la lógica de las consultas médicas y mantener el código limpio y extensible:

Singleton  
Centraliza la persistencia de consultas y recetas médicas en la clase HistoriaMédico.
Garantiza una sola instancia de conexión a Deno KV, evitando duplicaciones e inconsistencias.

State  
Gestiona los flujos y transiciones de la consulta médica (en espera, con médico, en exámenes).
Sin este patrón, el código estaría lleno de if/else o switch gigantes para controlar cada estado.

Strategy  
El módulo de Triage permite cambiar dinámicamente las reglas de clasificación de urgencia (C1 a C5) según los síntomas.
Se pueden intercambiar distintos algoritmos: por palabras clave, asignación manual o futuros modelos con signos vitales.

Template Method  
La clase Receta define los pasos y formato legal para emitir recetas médicas.
Asegura que todas las recetas cumplan con la estructura requerida (retenida, simple o cheque).

Observer  
La Lista de Espera se actualiza automáticamente cuando cambia el estado de un paciente dentro de la clase Consulta.
Esto permite que médicos y pacientes vean en tiempo real las actualizaciones.

🔧 Estado actual
Implementados pero requieren revisión: State, Strategy, Observer

Pendientes de implementación: Template Method, Singleton`

## 📝 Notas

- Abre tu navegador en `http://localhost:8000` para ver la aplicación
- Cualquier error de TypeScript aparecerá en la consola

## 👨‍💻 Equipo de Desarrollo
| Integrante | Rama |
|------------|------|
| Ana Jimena Villegas Morales | Rama-Ana |
| Samir Ivan Arana Atiya | Rama-Samir-Glitch |
| Luis Etiem Muñoz Saez | Rama-Luis |
