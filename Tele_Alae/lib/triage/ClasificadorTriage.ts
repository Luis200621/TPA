// lib/triage/ClasificadorTriage.ts
//
// PATRON: STRATEGY (continuacion)
//
// Esta es la clase "CONTEXTO" del patron Strategy. No decide ella
// misma como clasificar a un paciente: le delega esa decision a
// la estrategia que tenga asignada en un momento dado. Se puede
// cambiar de estrategia en cualquier momento con cambiarEstrategia().

import type { DatosParaTriage, EstrategiaTriage } from "./EstrategiasTriage.ts";
import type { NivelTriage } from "../types.ts";

export class ClasificadorTriage {
  private estrategiaActual: EstrategiaTriage;

  // Al crear el clasificador, hay que indicarle con que estrategia
  // empezar (por ejemplo, EstrategiaPorPalabrasClave).
  constructor(estrategiaInicial: EstrategiaTriage) {
    this.estrategiaActual = estrategiaInicial;
  }

  // Permite cambiar de estrategia en cualquier momento, sin tener
  // que crear un ClasificadorTriage nuevo. Por ejemplo, si un
  // medico quiere anular la clasificacion automatica y decidir
  // manualmente, simplemente se cambia a EstrategiaManual.
  public cambiarEstrategia(nuevaEstrategia: EstrategiaTriage): void {
    this.estrategiaActual = nuevaEstrategia;
  }

  // Delega la clasificacion a la estrategia actual. El resto del
  // sistema solo llama a este metodo, sin saber (ni importarle)
  // cual estrategia esta activa por dentro.
  public clasificar(datos: DatosParaTriage): NivelTriage {
    return this.estrategiaActual.clasificar(datos);
  }

  // Util para mostrar en la UI que metodo de clasificacion se
  // esta usando actualmente.
  public obtenerNombreEstrategiaActual(): string {
    return this.estrategiaActual.obtenerNombre();
  }
}