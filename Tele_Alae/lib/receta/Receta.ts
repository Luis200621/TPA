// lib/receta/Receta.ts
//
// PATRON: TEMPLATE METHOD
//
// Metodos ajustados para calzar con el diagrama UML:
// generarPDF(), validarTipo(), enviar()

import type {
  ISODateTime,
  Medicamento,
  Receta as RecetaDatos,
  UUID,
} from "../types.ts";

export abstract class RecetaBase {
  protected consultaId: UUID;
  protected medicoId: UUID;
  protected pacienteId: UUID;
  protected medicamentos: Medicamento[] = [];
  protected indicaciones?: string;
  protected datosFinales?: RecetaDatos;

  constructor(consultaId: UUID, medicoId: UUID, pacienteId: UUID) {
    this.consultaId = consultaId;
    this.medicoId = medicoId;
    this.pacienteId = pacienteId;
  }

  // ---------------------------------------------------------
  // EL "TEMPLATE": orden fijo de pasos, renombrado a
  // generarPDF() para calzar con el diagrama UML.
  // ---------------------------------------------------------
  public generarPDF(id: UUID): RecetaDatos {
    if (!this.validarTipo()) {
      throw new Error(
        `No se pudo generar la receta: la validacion especifica del ` +
          `tipo "${this.obtenerTipo()}" fallo.`,
      );
    }

    this.prepararMedicamentos();

    if (this.medicamentos.length === 0) {
      throw new Error(
        "No se puede generar una receta sin al menos un medicamento.",
      );
    }

    this.datosFinales = {
      id,
      consultaId: this.consultaId,
      medicoId: this.medicoId,
      pacienteId: this.pacienteId,
      medicamentos: this.medicamentos,
      indicaciones: this.indicaciones,
      fechaEmision: new Date().toISOString() as ISODateTime,
    };

    // Simulacion de la generacion del documento PDF. En una
    // version mas avanzada, aqui se usaria una libreria real de
    // generacion de PDF; para efectos de este proyecto, se deja
    // simulado con un mensaje en consola.
    console.log(
      `PDF de receta generado para el paciente ${this.pacienteId}.`,
    );

    return this.datosFinales;
  }

  // Nuevo metodo, agregado para calzar con el diagrama UML.
  // Simula el envio de la receta ya generada (por ejemplo, por
  // correo al paciente). Requiere que generarPDF() se haya
  // llamado antes.
  public enviar(): void {
    if (!this.datosFinales) {
      throw new Error(
        "No se puede enviar una receta que aun no ha sido generada. " +
          "Llama primero a generarPDF().",
      );
    }
    console.log(
      `Receta ${this.datosFinales.id} enviada al paciente ` +
        `${this.pacienteId}.`,
    );
  }

  // ---------------------------------------------------------
  // PASOS QUE CADA TIPO DE RECETA DEBE IMPLEMENTAR A SU MANERA
  // ---------------------------------------------------------

  protected abstract validarTipo(): boolean;
  protected abstract prepararMedicamentos(): void;
  public abstract obtenerTipo(): string;
}