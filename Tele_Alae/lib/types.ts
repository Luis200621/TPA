// lib/types.ts
//
// Tipos compartidos por TODOS los patrones del sistema.
// Esta es la "fuente de verdad" sobre la forma de los datos:
// Singleton, State, Strategy, Observer y Template Method
// importan estos tipos en lugar de definir los suyos propios.

// ---------------------------------------------------------
// PERSONAS
// ---------------------------------------------------------

export interface Paciente {
  id: string;
  nombre: string;
  edad?: number;
  sintomas: string;
}

export interface Medico {
  id: string;
  nombre: string;
  especialidad?: string;
}

// ---------------------------------------------------------
// TRIAGE (usado por el patrón Strategy)
// ---------------------------------------------------------

// C1 = más grave / atención inmediata
// C5 = menos grave / puede esperar
export type NivelTriage = "C1" | "C2" | "C3" | "C4" | "C5";

// ---------------------------------------------------------
// ESTADO DE LA CONSULTA (usado por el patrón State)
// ---------------------------------------------------------

export type EstadoConsulta = "EnEspera" | "EnAtencion" | "Finalizada";

// ---------------------------------------------------------
// CONSULTA (objeto central del sistema)
// ---------------------------------------------------------

export interface Consulta {
  id: string;
  paciente: Paciente;
  medicoId?: string; // se asigna cuando pasa a EnAtencion
  nivelTriage: NivelTriage;
  estado: EstadoConsulta;
  horaIngreso: string; // ISO string, ej: new Date().toISOString()
  horaInicioAtencion?: string;
  horaFin?: string;
  recetaId?: string; // referencia a la receta generada, si existe
}

// ---------------------------------------------------------
// RECETA (usado por el patrón Template Method)
// ---------------------------------------------------------

export interface Medicamento {
  nombre: string;
  dosis: string;
  frecuencia: string;
}

export interface Receta {
  id: string;
  consultaId: string;
  medicoId: string;
  pacienteId: string;
  medicamentos: Medicamento[];
  indicaciones?: string;
  fechaEmision: string; // ISO string
}