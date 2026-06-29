// lib/triage/EstrategiasTriage.ts
//
// PATRON: STRATEGY
//
// Definimos varias formas de clasificar a un paciente en un nivel
// de triage (C1 a C5). Cada forma es una "estrategia" distinta,
// pero todas cumplen la misma interfaz, asi que el resto del
// sistema (ClasificadorTriage) puede usar cualquiera de ellas sin
// saber los detalles internos de como decide cada una.

import type { NivelTriage } from "../types.ts";

// Datos que cualquier estrategia puede necesitar para decidir.
// No todas las estrategias usan todos los campos.
export interface DatosParaTriage {
  sintomas: string;
  edad?: number;
  nivelManual?: NivelTriage; // usado solo por EstrategiaManual
}

// Interfaz comun que TODAS las estrategias deben cumplir.
export interface EstrategiaTriage {
  // Recibe los datos del paciente y devuelve el nivel de triage
  // que corresponde, segun la logica propia de esa estrategia.
  clasificar(datos: DatosParaTriage): NivelTriage;

  // Nombre legible de la estrategia (util para mostrar en la UI
  // o en logs, ej: "Clasificacion automatica por palabras clave").
  obtenerNombre(): string;
}

// -----------------------------------------------------------
// ESTRATEGIA 1: Por palabras clave en los sintomas
// -----------------------------------------------------------
// Busca palabras de alarma en el texto de sintomas. Si encuentra
// alguna palabra muy grave, asigna C1. Si no encuentra ninguna
// palabra de la lista, asigna el nivel mas leve (C5) por defecto.
export class EstrategiaPorPalabrasClave implements EstrategiaTriage {
  // Cada nivel tiene su propia lista de palabras de alarma.
  // Se revisan en orden de gravedad: primero C1, luego C2, etc.
  private palabrasPorNivel: Record<NivelTriage, string[]> = {
    C1: ["paro cardiaco", "no respira", "convulsion", "hemorragia severa"],
    C2: ["dolor de pecho", "dificultad para respirar", "perdida de conciencia"],
    C3: ["fiebre alta", "dolor abdominal intenso", "fractura"],
    C4: ["dolor moderado", "vomitos", "mareo"],
    C5: ["dolor leve", "tos", "molestia"],
  };

  clasificar(datos: DatosParaTriage): NivelTriage {
    const textoEnMinusculas = datos.sintomas.toLowerCase();

    // Revisamos los niveles en orden de gravedad (C1 es lo mas grave)
    const ordenDeNiveles: NivelTriage[] = ["C1", "C2", "C3", "C4", "C5"];

    for (const nivel of ordenDeNiveles) {
      const palabras = this.palabrasPorNivel[nivel];
      const coincide = palabras.some((palabra) =>
        textoEnMinusculas.includes(palabra)
      );
      if (coincide) {
        return nivel;
      }
    }

    // Si no encontramos ninguna palabra clave conocida, asignamos
    // el nivel menos urgente por defecto, para que un medico lo
    // revise manualmente despues si es necesario.
    return "C5";
  }

  obtenerNombre(): string {
    return "Clasificacion automatica por palabras clave";
  }
}

// -----------------------------------------------------------
// ESTRATEGIA 2: Manual (decidida por personal medico)
// -----------------------------------------------------------
// Esta estrategia no "calcula" nada: simplemente usa el nivel
// que un enfermero o medico ya decidio y puso en datos.nivelManual.
// Sirve para los casos donde el criterio humano debe prevalecer
// sobre cualquier automatizacion.
export class EstrategiaManual implements EstrategiaTriage {
  clasificar(datos: DatosParaTriage): NivelTriage {
    if (!datos.nivelManual) {
      throw new Error(
        "EstrategiaManual requiere que se indique 'nivelManual' en los datos.",
      );
    }
    return datos.nivelManual;
  }

  obtenerNombre(): string {
    return "Clasificacion manual (decidida por personal medico)";
  }
}
