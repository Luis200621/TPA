import type { Consultation, UUID } from "../../lib/types.ts";

export class ConsultationRepository {
  private readonly storagePath = "./data/consultations.json";

  public async save(consultation: Consultation): Promise<void> {
    const consultations = await this.readAll();
    const existingIndex = consultations.findIndex((item) => item.id === consultation.id);
    if (existingIndex >= 0) {
      consultations[existingIndex] = consultation;
    } else {
      consultations.push(consultation);
    }

    await Deno.writeTextFile(this.storagePath, JSON.stringify(consultations, null, 2));
  }

  public async update(consultation: Consultation): Promise<void> {
    await this.save(consultation);
  }

  public async getById(id: UUID): Promise<Consultation | null> {
    const consultations = await this.readAll();
    return consultations.find((item) => item.id === id) ?? null;
  }

  public async list(): Promise<Consultation[]> {
    return await this.readAll();
  }

  private async readAll(): Promise<Consultation[]> {
    try {
      const text = await Deno.readTextFile(this.storagePath);
      return JSON.parse(text) as Consultation[];
    } catch {
      return [];
    }
  }
}
