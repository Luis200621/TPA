// lib/espera/ListaEspera.ts
//
// PATRON: OBSERVER
//
// Metodos ajustados para calzar con el diagrama UML:
// agregarPaciente(), actualizarPosicion(), notificarPaciente(),
// obtenerSiguiente()

import type { Consulta, NivelTriage } from "../types.ts";
import type { ObservadorEspera } from "./Observador.ts";

const ORDEN_GRAVEDAD: Record<NivelTriage, number> = {
  C1: 1,
  C2: 2,
  C3: 3,
  C4: 4,
  C5: 5,
};

export class ListaEspera {
  private consultasEnEspera: Consulta[] = [];
  private observadores: ObservadorEspera[] = [];

  public suscribir(observador: ObservadorEspera): void {
    this.observadores.push(observador);
  }

  public desuscribir(observador: ObservadorEspera): void {
    this.observadores = this.observadores.filter((o) => o !== observador);
  }

  // Renombrado desde "notificarATodos" para calzar con el
  // diagrama UML (notificarPaciente). Avisa a todos los
  // observadores suscritos que la lista cambio.
  public notificarPaciente(): void {
    for (const observador of this.observadores) {
      observador.actualizar(this.consultasEnEspera);
    }
  }

  public agregarPaciente(consulta: Consulta): void {
    this.consultasEnEspera.push(consulta);
    this.actualizarPosicion();
    this.notificarPaciente();
  }

  public quitarPaciente(consultaId: string): void {
    this.consultasEnEspera = this.consultasEnEspera.filter(
      (c) => c.id !== consultaId,
    );
    this.notificarPaciente();
  }

  // Renombrado desde "reordenarPorPrioridad" para calzar con el
  // diagrama UML (actualizarPosicion). Reordena la fila segun
  // gravedad y orden de llegada.
  public actualizarPosicion(): void {
    this.consultasEnEspera.sort((a, b) => {
      const gravedadA = ORDEN_GRAVEDAD[a.nivelTriage];
      const gravedadB = ORDEN_GRAVEDAD[b.nivelTriage];
      if (gravedadA !== gravedadB) {
        return gravedadA - gravedadB;
      }
      return a.horaIngreso.localeCompare(b.horaIngreso);
    });
  }

  public obtenerSiguiente(): Consulta | null {
    return this.consultasEnEspera[0] ?? null;
  }

  public obtenerTodos(): Consulta[] {
    return [...this.consultasEnEspera];
  }

  public obtenerPosicion(consultaId: string): number | null {
    const indice = this.consultasEnEspera.findIndex(
      (c) => c.id === consultaId,
    );
    return indice === -1 ? null : indice + 1;
  }
}