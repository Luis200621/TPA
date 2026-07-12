import type { ISODateTime, Medicamento, Receta as RecetaDatos, UUID } from "../types.ts";
import { RecetaBase } from "./Receta.ts";

export type PrescriptionType = "Simple" | "Retenida" | "Cheque";

export class PrescriptionTemplate extends RecetaBase {
  constructor(
    consultaId: UUID,
    medicoId: UUID,
    pacienteId: UUID,
    private readonly medicamentosBase: Medicamento[],
    private readonly indicacionesBase?: string,
    private readonly tipo: PrescriptionType = "Simple",
  ) {
    super(consultaId, medicoId, pacienteId);
  }

  protected validarTipo(): boolean {
    if (this.medicamentosBase.length === 0) {
      return false;
    }

    if (this.tipo === "Retenida") {
      return Boolean(this.indicacionesBase?.trim());
    }

    if (this.tipo === "Cheque") {
      return this.medicamentosBase.every((medicamento) =>
        Boolean(medicamento.dosis?.trim() && medicamento.frecuencia?.trim())
      );
    }

    return true;
  }

  protected prepararMedicamentos(): void {
    this.medicamentos = [...this.medicamentosBase];
    this.indicaciones = this.indicacionesBase;
  }

  public obtenerTipo(): string {
    return this.tipo;
  }

  public generarPDF(id: UUID): RecetaDatos {
    const receta = super.generarPDF(id);
    return {
      ...receta,
      fechaEmision: new Date().toISOString() as ISODateTime,
    };
  }
}
