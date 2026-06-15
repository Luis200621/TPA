import { Handlers } from "$fresh/server.ts";

interface Usuario {
    nombre: string;
    email: string;
    password: string;
}

export const handler: Handlers = {

    async POST(req) {

        const usuario: Usuario = await req.json();

        // Leer JSON actual
        const texto = await Deno.readTextFile("./data/users.json");
        const usuarios = JSON.parse(texto);

        // Agregar nuevo usuario
        usuarios.push(usuario);

        // Guardar nuevamente
        await Deno.writeTextFile(
            "./data/users.json",
            JSON.stringify(usuarios, null, 2)
        );

        return new Response(
            JSON.stringify({
            mensaje: "Usuario guardado"
            }),
            {
            status: 200,
            }
        );
    },
};