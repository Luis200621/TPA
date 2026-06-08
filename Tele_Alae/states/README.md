# states/

Propósito

- Agrupar lógica de estado compartido y máquinas/objetos que representan estados de la aplicación (por ejemplo: `ConsultaState`, `EsperaState`).

Qué poner aquí

- Estados globales o singletons usados por varias partes de la app.
- Máquinas de estado, store simples, o helpers para sincronizar estado entre componentes.

Buenas prácticas

- Documenta cada archivo con su propósito y cómo suscribirse o usar el estado.
- Mantén el estado independiente de la UI; los componentes deben consumir el estado pero la lógica debe residir en estos módulos.
- Evita incluir lógica de renderizado aquí; céntrate en la lógica de negocio/estado.

Ejemplo

- `states/ConsultaState.ts` — podría exportar funciones para encolar/atender pacientes.

Notas

- Si el proyecto crece, considera usar soluciones más estructuradas (p. ej. stores basados en señales o librerías adecuadas).
