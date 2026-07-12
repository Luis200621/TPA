import type { Prescription, UUID } from "../../lib/types.ts";

export class PrescriptionRepository {
  private readonly storagePath = "./data/prescriptions.json";

  public async save(prescription: Prescription): Promise<void> {
    const prescriptions = await this.readAll();
    const existingIndex = prescriptions.findIndex((item) => item.id === prescription.id);
    if (existingIndex >= 0) {
      prescriptions[existingIndex] = prescription;
    } else {
      prescriptions.push(prescription);
    }

    await Deno.writeTextFile(this.storagePath, JSON.stringify(prescriptions, null, 2));
  }

  public async getById(id: UUID): Promise<Prescription | null> {
    const prescriptions = await this.readAll();
    return prescriptions.find((item) => item.id === id) ?? null;
  }

  public async listByPatient(patientId: UUID): Promise<Prescription[]> {
    const prescriptions = await this.readAll();
    return prescriptions.filter((item) => item.pacienteId === patientId);
  }

  private async readAll(): Promise<Prescription[]> {
    try {
      const text = await Deno.readTextFile(this.storagePath);
      return JSON.parse(text) as Prescription[];
    } catch {
      return [];
    }
  }
}
