// test_consulta.ts
//
// SCRIPT DE PRUEBA TEMPORAL.
// Sirve para confirmar que el patron State (ConsultaContexto)
// funciona: que las transiciones validas avanzan correctamente,
// y que las transiciones invalidas lanzan error como se espera.
// Se puede borrar despues.
 
import { ConsultaContexto } from "./lib/consulta/Consulta.ts";
import type { Paciente } from "./lib/types.ts";
 
console.log("--- Probando el patron State (ConsultaContexto) ---");
 
const pacientePrueba: Paciente = {
  id: "paciente-002",
  nombre: "Maria Lopez",
  sintomas: "Dolor abdominal intenso",
};
 
// 1. Crear una consulta nueva: debe arrancar en EnEspera
const consulta = ConsultaContexto.crearNueva(
  "consulta-002",
  pacientePrueba,
  "C2",
);
console.log("Estado inicial:", consulta.obtenerNombreEstado());
// Esperado: "EnEspera"
 
// 2. Asignar medico y avanzar a EnAtencion (transicion VALIDA)
consulta.asignarMedico("medico-001");
consulta.avanzar();
console.log("Despues de avanzar 1 vez:", consulta.obtenerNombreEstado());
// Esperado: "EnAtencion"
 
// 3. Avanzar de nuevo a Finalizada (transicion VALIDA)
consulta.avanzar();
console.log("Despues de avanzar 2 veces:", consulta.obtenerNombreEstado());
// Esperado: "Finalizada"
 
// 4. Intentar avanzar otra vez (transicion INVALIDA, debe lanzar error)
try {
  consulta.avanzar();
  console.log("ERROR: esto no deberia imprimirse, avanzar() debio fallar");
} catch (error) {
  console.log(
    "Como se esperaba, avanzar() fallo con el mensaje:",
    (error as Error).message,
  );
}
 
// 5. Revisar los datos completos (incluyendo horas registradas)
console.log("\nDatos completos de la consulta:");
console.log(consulta.obtenerDatos());
 
// 6. Probar tambien el caso de intentar finalizar una consulta
//    que recien esta EnEspera (tambien debe fallar)
console.log("\n--- Probando finalizar() en una consulta nueva ---");
const consultaDos = ConsultaContexto.crearNueva(
  "consulta-003",
  pacientePrueba,
  "C5",
);
try {
  consultaDos.finalizar();
  console.log("ERROR: esto no deberia imprimirse, finalizar() debio fallar");
} catch (error) {
  console.log(
    "Como se esperaba, finalizar() fallo con el mensaje:",
    (error as Error).message,
  );
}
 
console.log("\n--- Prueba terminada ---");