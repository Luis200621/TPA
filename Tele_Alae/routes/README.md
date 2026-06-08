# routes/

En este proyecto con Fresh, la carpeta `routes/` contiene las páginas (vistas) y los endpoints (APIs) del servidor.

Estructura

- `routes/_app.tsx`: layout global de la aplicación. Define `<head>`, `<body>` y aplica estilos comunes.
- `routes/index.tsx`: página principal (ejemplo — importa islas como `Auth`).
- `routes/*.tsx`: cada archivo `.tsx` en la raíz de `routes` corresponde a una ruta pública (página).
- `routes/api/`: carpeta dedicada a endpoints backend (por ejemplo `routes/api/Crear_otp.ts`). Los archivos aquí reciben y responden peticiones HTTP.

Páginas (client + SSR)

- Los archivos `.tsx` bajo `routes/` son renderizados por el servidor (SSR) y enviados al cliente.
- Si necesitas interactividad en la página, importa una `island` desde `islands/` (Fresh aplicará hydration solo donde se necesita).

Endpoints (API)

- Coloca endpoints en `routes/api/`. Ejemplo:
  - `routes/api/Crear_otp.ts` → expone rutas como `/api/Crear_otp`.
- Un handler típico en Fresh exporta funciones como `export async function POST(req: Request) { ... }` o `GET`, `PUT`, `DELETE` según corresponda.

Buenas prácticas

- Mantén la lógica de negocio fuera del render (usa servicios o funciones en `components/` o `models/`).
- Valida y sanitiza toda entrada que venga de `req` (usa `zod` u otra librería si quieres validación tipo-safe).
- Si un endpoint realiza operaciones con datos, separa la lógica en módulos (por ejemplo `services/userService.ts`) para facilitar pruebas.

Cómo añadir una nueva página

1. Crea `routes/mi_pagina.tsx` y exporta un componente por defecto.
2. Si necesitas interactividad, crea `islands/MiComponente.tsx` y úsalo en la página.

Cómo añadir un endpoint API

1. Crea `routes/api/mi_endpoint.ts`.
2. Exporta la función correspondiente a los métodos HTTP que necesites. Ejemplo mínimo:

```ts
export async function POST(req: Request) {
  const body = await req.json();
  // validar body
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
```

Nota sobre `fresh.gen.ts` y generación automática

- `fresh.gen.ts` se actualiza automáticamente cuando agregas o eliminas archivos en `routes/` o `islands/`.
- No edites `fresh.gen.ts` manualmente.

Pruebas y desarrollo

- Durante el desarrollo, usa `deno task start` (ya está definido en `deno.json`) para arrancar el servidor con watch.
- Revisa la consola para errores de TypeScript o linter.

Ejemplos útiles

- `routes/_app.tsx` — layout global.
- `routes/index.tsx` — página que importa `../islands/Auth.tsx`.
- `routes/api/Crear_otp.ts` — endpoint vacío ahora; aquí puedes implementar la lógica de generación/envío de OTP.

Si quieres, puedo:
- Implementar un ejemplo de endpoint `POST /api/Crear_otp` que genere un OTP (mock) y lo devuelva.
- Conectar un formulario en `islands/Auth.tsx` para consumir ese endpoint.
