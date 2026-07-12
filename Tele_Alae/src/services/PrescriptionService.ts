import type { Medication, Prescription, UUID } from "../../lib/types.ts";
import { RecetaBase } from "../../lib/receta/Receta.ts";
import { PrescriptionRepository } from "../repositories/PrescriptionRepository.ts";

class RecetaSimple extends RecetaBase {
  constructor(
    consultaId: UUID,
    medicoId: UUID,
    pacienteId: UUID,
    private readonly medicamentosBase: Medication[],
    private readonly indicacionesBase?: string,
  ) {
    super(consultaId, medicoId, pacienteId);
  }

  protected validarTipo(): boolean {
    return this.medicamentosBase.length > 0;
  }

  protected prepararMedicamentos(): void {
    this.medicamentos = [...this.medicamentosBase];
    this.indicaciones = this.indicacionesBase;
  }

  public obtenerTipo(): string {
    return "simple";
  }
}

export interface CreatePrescriptionInput {
  consultationId: UUID;
  doctorId: UUID;
  patientId: UUID;
  medicamentos: Medication[];
  indicaciones?: string;
  id?: UUID;
}

export class PrescriptionService {
  constructor(
    private readonly prescriptionRepository = new PrescriptionRepository(),
  ) {}

  public async createPrescription(
    input: CreatePrescriptionInput,
  ): Promise<Prescription> {
    const receta = new RecetaSimple(
      input.consultationId,
      input.doctorId,
      input.patientId,
      input.medicamentos,
      input.indicaciones,
    );

    const prescriptionId = input.id ?? (crypto.randomUUID() as UUID);
    const prescription = receta.generarPDF(prescriptionId);
    await this.prescriptionRepository.save(prescription);
    return prescription;
  }

  public async generate(input: CreatePrescriptionInput): Promise<Prescription> {
    return await this.createPrescription(input);
  }

  public async getById(id: UUID): Promise<Prescription | null> {
    return await this.prescriptionRepository.getById(id);
  }

  public async listByPatient(patientId: UUID): Promise<Prescription[]> {
    return await this.prescriptionRepository.listByPatient(patientId);
  }
}
