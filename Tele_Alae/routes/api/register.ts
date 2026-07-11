// routes/api/register.ts
//
// Recibe los datos del formulario de registro (desde Auth.tsx)
// y los guarda en data/users.json. Cada usuario nuevo se agrega
// al array existente, sin borrar los que ya estaban.

import { Handlers } from "$fresh/server.ts";

const RUTA_USUARIOS = "./data/users.json";

export const handler: Handlers = {
  async POST(req) {
    try {
      const nuevoUsuario = await req.json();

      // Validacion basica: nos aseguramos de que vengan los
      // campos minimos necesarios antes de guardar nada.
      if (!nuevoUsuario.email || !nuevoUsuario.password) {
        return new Response(
          JSON.stringify({ mensaje: "Faltan datos obligatorios (email o contraseña)." }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      // Leemos los usuarios que ya existen
      const contenidoActual = await Deno.readTextFile(RUTA_USUARIOS);
      const usuarios = JSON.parse(contenidoActual);

      // Revisamos que no exista ya alguien con ese email
      const yaExiste = usuarios.some((u: any) => u.email === nuevoUsuario.email);
      if (yaExiste) {
        return new Response(
          JSON.stringify({ mensaje: "Ya existe una cuenta con ese correo." }),
          { status: 409, headers: { "Content-Type": "application/json" } },
        );
      }

      // Agregamos el usuario nuevo, con un id simple basado en
      // la fecha actual (suficiente para un proyecto academico).
      usuarios.push({
        id: crypto.randomUUID(),
        ...nuevoUsuario,
      });

      // Guardamos el array actualizado de vuelta en el archivo
      await Deno.writeTextFile(
        RUTA_USUARIOS,
        JSON.stringify(usuarios, null, 2),
      );

      return new Response(
        JSON.stringify({ mensaje: "Cuenta creada con éxito." }),
        { status: 201, headers: { "Content-Type": "application/json" } },
      );
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ mensaje: "Error al crear la cuenta." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};