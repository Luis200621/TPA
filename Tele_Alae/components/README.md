# components/

Propósito

- Almacenar componentes reutilizables de la interfaz y utilidades compartidas.

Qué poner aquí

- Componentes UI: botones, tarjetas, formularios, menús, etc. (archivos `.tsx`).
- Utilidades ligadas a UI o lógica compartida (por ejemplo helpers o hooks en `.ts`).

Buenas prácticas

- Cada componente en su propio archivo y exportado por defecto o nombrado según convenga.
- Mantener componentes pequeños y con una sola responsabilidad.
- Documentar props con JSDoc o con un pequeño comentario encima del componente.

Ejemplo de uso

- `import Button from "../components/Button.tsx";`

Testing

- Si agregas tests, ponlos junto al componente (`Button.test.tsx`).
