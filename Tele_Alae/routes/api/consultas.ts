import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET() {
    try {
      // Leer el archivo JSON
      const texto = await Deno.readTextFile("./data/consultas.json");

      // Convertir el texto a JSON
      const consultas = JSON.parse(texto);

      // Enviar las consultas
      return new Response(
        JSON.stringify(consultas),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error al leer las consultas:", error);

      return new Response(
        JSON.stringify({
          mensaje: "Error al obtener las consultas",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  },
};