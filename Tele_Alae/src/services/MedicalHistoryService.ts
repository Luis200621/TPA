import type { Prescription, UUID } from "../../lib/types.ts";
import { HistorialMedico } from "../../lib/historial/HistorialMedico.ts";

export class MedicalHistoryService {
  private historial: HistorialMedico | null = null;

  private async getHistorial(): Promise<HistorialMedico> {
    if (!this.historial) {
      this.historial = await HistorialMedico.getInstance();
    }
    return this.historial;
  }

  public async savePrescription(prescription: Prescription): Promise<void> {
    const historial = await this.getHistorial();
    await historial.guardarReceta(prescription);
  }

  public async getPrescriptionsByPatient(patientId: UUID): Promise<Prescription[]> {
    const historial = await this.getHistorial();
    return await historial.obtenerRecetasDePaciente(patientId);
  }
}
