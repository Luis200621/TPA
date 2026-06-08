# models/

Propósito

- Contiene las definiciones de los modelos de dominio (interfaces y clases) que representan las entidades principales del sistema (por ejemplo `Paciente`, `Medico`).

Qué poner aquí

- Tipos e interfaces (`.ts`) que describen la forma de los datos que maneja la aplicación.
- Clases o helpers relacionados con la representación de datos del dominio.

Buenas prácticas

- Mantén los modelos simples y con responsabilidad única.
- Añade validación o esquemas (por ejemplo con `zod`) cuando los datos provengan de entradas externas.
- Documenta los campos importantes con comentarios JSDoc.

Ejemplo

- `models/Paciente.ts` podría exportar una interface `Paciente` y funciones auxiliares para mapear o validar datos.

Notas

- Evita lógica de negocio compleja en los modelos; esa lógica debe ir en servicios o en `routes/api`.
