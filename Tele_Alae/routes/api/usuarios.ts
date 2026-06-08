import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {

  async GET(_req) {

    // Leer archivo JSON
    const texto = await Deno.readTextFile("./data/users.json");

    // Convertir a array
    const usuarios = JSON.parse(texto);

    // Devolver usuarios
    return Response.json(usuarios);

  },
};