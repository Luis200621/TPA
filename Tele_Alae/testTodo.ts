// testTodo.ts
import {
  EstrategiaPorPalabrasClave,
  EstrategiaManual,
  DatosParaTriage,
} from "./lib/triage/EstrategiasTriage.ts";
import { ClasificadorTriage } from "./lib/triage/ClasificadorTriage.ts";

// Función auxiliar para mostrar resultados
function probar(clasificador: ClasificadorTriage, datos: DatosParaTriage) {
  console.log(`--- Estrategia actual: ${clasificador.obtenerNombreEstrategiaActual()} ---`);
  console.log(`Síntomas: ${datos.sintomas}`);
  try {
    const nivel = clasificador.clasificar(datos);
    console.log(`Nivel asignado: ${nivel}`);
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
  }
  console.log();
}

// Crear clasificador con estrategia inicial por palabras clave
const clasificador = new ClasificadorTriage(new EstrategiaPorPalabrasClave());

// Casos de prueba con estrategia automática
probar(clasificador, { sintomas: "El paciente presenta paro cardiaco" });
probar(clasificador, { sintomas: "Dolor de pecho y dificultad para respirar" });
probar(clasificador, { sintomas: "Síntomas no reconocidos" });

// Cambiar a estrategia manual
clasificador.cambiarEstrategia(new EstrategiaManual());

// Casos de prueba con estrategia manual
probar(clasificador, { sintomas: "Paciente estable", nivelManual: "C3" });
probar(clasificador, { sintomas: "Paciente sin nivel manual" }); // debería lanzar error