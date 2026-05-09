import { defineConfig } from "$fresh/server.ts";
// Importa la función para configurar el servidor Fresh
// El "$fresh/" es un alias especial de Deno, no una carpeta local
import tailwind from "$fresh/plugins/tailwind.ts";
// Importa el plugin de Tailwind CSS para que los estilos funcionen

export default defineConfig({
  plugins: [tailwind()],
});
// Le dice a Fresh: "usa Tailwind como plugin de estilos"