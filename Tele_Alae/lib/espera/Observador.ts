// lib/espera/Observador.ts
//
// PATRON: OBSERVER

import type { Consulta } from "../types.ts";

export interface ObservadorEspera {
  actualizar(consultasEnEspera: Consulta[]): void;
}