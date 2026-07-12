 
// test_historial.ts
//
// SCRIPT DE PRUEBA TEMPORAL.
// Sirve solo para confirmar que HistorialMedico (Singleton) y
// Deno KV funcionan correctamente. Se puede borrar despues.
 
import { HistorialMedico } from "./lib/historial/HistorialMedico.ts";
import type { Consulta, ISODateTime, UUID } from "./lib/types.ts";
 
console.log("--- Probando el Singleton HistorialMedico ---");
 
// 1. Obtenemos la instancia (la primera vez, se crea)
const historial1 = await HistorialMedico.getInstance();
console.log("Instancia 1 obtenida.");
 
// 2. La volvemos a pedir (deberia ser EXACTAMENTE la misma instancia)
const historial2 = await HistorialMedico.getInstance();
console.log("Instancia 2 obtenida.");
 
console.log(
  "Son la misma instancia (Singleton funcionando):",
  historial1 === historial2,
);
 
// 3. Creamos una consulta de prueba, usando el mismo "idioma" de types.ts
const consultaId = crypto.randomUUID() as UUID;
const pacienteId = crypto.randomUUID() as UUID;
const consultaPrueba: Consulta = {
  id: consultaId,
  paciente: {
    id: pacienteId,
    nombre: "Juan Perez",
    email: "juan.perez@example.com",
    password: "secreto",
    rol: "paciente",
    createdAt: new Date().toISOString() as ISODateTime,
    updatedAt: new Date().toISOString() as ISODateTime,
    sintomas: "Dolor de cabeza y fiebre",
  },
  nivelTriage: "C3",
  estado: "EnEspera",
  horaIngreso: new Date().toISOString() as ISODateTime,
};
 
// 4. Guardamos la consulta en Deno KV
await historial1.guardarConsulta(consultaPrueba);
console.log("Consulta guardada con id:", consultaPrueba.id);
 
// 5. La volvemos a leer desde KV (usando la otra instancia, para
//    confirmar que ambas comparten la misma conexion y datos)
const consultaLeida = await historial2.obtenerConsulta(consultaId);
console.log("Consulta leida de vuelta:", consultaLeida);
 
// 6. Probamos obtener TODAS las consultas
const todas = await historial1.obtenerTodasLasConsultas();
console.log("Total de consultas en la base:", todas.length);
 
console.log("--- Prueba terminada ---");