// routes/api/usuarios.ts
//
// Devuelve la lista completa de usuarios registrados, leyendo
// desde data/users.json. Usado por Auth.tsx (handleLogin) para
// buscar si el email/contraseña ingresados coinciden con
// alguien registrado.

import { Handlers } from "$fresh/server.ts";

const RUTA_USUARIOS = "./data/users.json";

export const handler: Handlers = {
  async GET(_req) {
    try {
      const contenido = await Deno.readTextFile(RUTA_USUARIOS);
      const usuarios = JSON.parse(contenido);

      return new Response(JSON.stringify(usuarios), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ mensaje: "Error al leer los usuarios." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};