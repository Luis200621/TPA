import type { NivelTriage } from "../../lib/types.ts";
import { ClasificadorTriage } from "../../lib/triage/ClasificadorTriage.ts";
import {
  EstrategiaManual,
  EstrategiaPorPalabrasClave,
  type DatosParaTriage,
} from "../../lib/triage/EstrategiasTriage.ts";
import { ModalService } from "./ModalService.ts";

export interface TriageInput {
  sintomas: string;
  edad?: number;
  nivelManual?: NivelTriage;
}

export class TriageService {
  private readonly modalService = ModalService.getInstance();

  public clasificar(input: TriageInput): NivelTriage {
    try {
      if (!input.sintomas?.trim()) {
        throw new Error("No hay síntomas para clasificar.");
      }

      const datos: DatosParaTriage = {
        sintomas: input.sintomas,
        edad: input.edad,
        nivelManual: input.nivelManual,
      };

      const estrategia = input.nivelManual
        ? new EstrategiaManual()
        : new EstrategiaPorPalabrasClave();

      const clasificador = new ClasificadorTriage(estrategia);
      return clasificador.clasificar(datos);
    } catch (error) {
      this.modalService.show("Error en la lógica de triaje");
      throw error;
    }
  }

  public obtenerNombreEstrategia(input: TriageInput): string {
    const estrategia = input.nivelManual
      ? new EstrategiaManual()
      : new EstrategiaPorPalabrasClave();

    const clasificador = new ClasificadorTriage(estrategia);
    return clasificador.obtenerNombreEstrategiaActual();
  }
}
