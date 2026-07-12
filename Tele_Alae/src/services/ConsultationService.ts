import type {
  Consultation,
  Paciente,
  TriageLevel,
  UUID,
} from "../../lib/types.ts";
import { ConsultaContexto } from "../../lib/consulta/Consulta.ts";
import { ConsultationRepository } from "../repositories/ConsultationRepository.ts";

export class ConsultationService {
  constructor(
    private readonly consultationRepository = new ConsultationRepository(),
  ) {}

  public async createConsultation(
    paciente: Paciente,
    nivelTriage: TriageLevel,
    id: UUID = crypto.randomUUID() as UUID,
  ): Promise<Consultation> {
    const context = ConsultaContexto.crearNueva(id, paciente, nivelTriage);
    const consultation = context.obtenerDatos();
    await this.consultationRepository.save(consultation);
    return consultation;
  }

  public async getById(id: UUID): Promise<Consultation | null> {
    return await this.consultationRepository.getById(id);
  }

  public async list(): Promise<Consultation[]> {
    return await this.consultationRepository.list();
  }

  public async assignDoctor(
    consultationId: UUID,
    medicoId: UUID,
  ): Promise<Consultation> {
    const existing = await this.consultationRepository.getById(consultationId);
    if (!existing) {
      throw new Error("Consulta no encontrada.");
    }

    const context = ConsultaContexto.desdeDatos(existing);
    context.asignarMedico(medicoId);

    const updated = context.obtenerDatos();
    await this.consultationRepository.update(updated);
    return updated;
  }

  public async advance(consultationId: UUID): Promise<Consultation> {
    const existing = await this.consultationRepository.getById(consultationId);
    if (!existing) {
      throw new Error("Consulta no encontrada.");
    }

    const context = ConsultaContexto.desdeDatos(existing);
    context.avanzar();

    const updated = context.obtenerDatos();
    await this.consultationRepository.update(updated);
    return updated;
  }

  public async finish(consultationId: UUID): Promise<Consultation> {
    const existing = await this.consultationRepository.getById(consultationId);
    if (!existing) {
      throw new Error("Consulta no encontrada.");
    }

    const context = ConsultaContexto.desdeDatos(existing);
    context.finalizar();

    const updated = context.obtenerDatos();
    await this.consultationRepository.update(updated);
    return updated;
  }

  public async getWaitingConsultations(): Promise<Consultation[]> {
    const consultations = await this.list();
    return consultations.filter((consultation) => consultation.estado === "EnEspera");
  }
}
