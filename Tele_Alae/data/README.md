# data/

Propósito

- Contiene datos de ejemplo y archivos de fixtures que se usan durante el desarrollo y pruebas (por ejemplo `users.json`).

Qué incluir aquí

- Mocks y fixtures con datos no sensibles para pruebas locales.
- Scripts o JSON que permitan inicializar la base de datos en entorno de desarrollo.

Precauciones

- No pongas datos sensibles (contraseñas reales, tokens, información personal) en esta carpeta si el repositorio es público.
- Si en algún momento necesitas datos reales para pruebas, usa variables de entorno o un mecanismo de `seeds` que no suba información al repositorio.

Cómo usar estos archivos

1. Leer `users.json` o los fixtures directamente desde los scripts de desarrollo para poblar la DB de pruebas.
2. Cuando migres a una base de datos real (Mongo/Postgres), convierte estos mocks en scripts de `seed` y registra cómo ejecutarlos (p. ej. `deno run -A scripts/seed_users.ts`).

Ejemplo rápido

- Para poblar una Mongo local con `users.json`, podrías crear un script `scripts/seed_users.ts` que lea `data/users.json` y realice inserts.

Buenas prácticas

- Mantén los mocks pequeños y representativos.
- Documenta cambios importantes en los fixtures (por ejemplo, si cambias la estructura de usuario).
- Añade un archivo `data/README.md` (este) para explicar el propósito y cómo regenerarlos.
