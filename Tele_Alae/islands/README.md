# islands/

En Fresh, las "islands" son componentes interactivos que se renderizan en el cliente y reciben hidratación (client-side hydration) solo cuando es necesario.

Propósito

- Alojar componentes que necesitan JavaScript en el cliente (formularios interactivos, widgets en tiempo real, controles con estado local, etc.).

Características principales

- Renderizado en el servidor (Server-Side Rendering) por defecto, y "island hydration" para los componentes que necesitan interactividad.
- Las islas suelen ser ligeras y enfocadas en una sola responsabilidad.

Buenas prácticas

- Mantén cada isla pequeña y especializada: una isla = una unidad de interactividad.
- Evita poner lógica pesada o dependencias grandes dentro de una isla; si necesitas lógica compartida, extráela a utilidades en `components/` o `states/`.
- Documenta las props y efectos secundarios de cada isla.

Cómo usar

- Crear una isla: añade un archivo `.tsx` en `islands/`, por ejemplo `islands/Auth.tsx`, y exporta un componente por defecto.
- Importarla desde `routes/` (ej: `routes/index.tsx`) para que Fresh la incluya en el `manifest` y la hidrate en el cliente cuando sea necesario.

Ejemplo rápido

1. `islands/Counter.tsx` — componente con `useState` que incrementa un contador en cliente.
2. `routes/index.tsx` — importa `Counter` y lo renderiza como parte de la página.

Notas

- `fresh.gen.ts` se actualiza automáticamente para listar islas; no edites ese archivo manualmente.
- Mantén la separación entre vistas (páginas) en `routes/` y componentes interactivos en `islands/`.
