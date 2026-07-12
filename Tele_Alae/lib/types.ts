// lib/types.ts
//
// Modelos canónicos de TeleAlae.
// Esta es la única fuente de verdad para los objetos del dominio:
// cualquier módulo debe consumir estos tipos en vez de declarar
// estructuras paralelas.

export type UUID = string & { readonly __brand: "UUID" };
export type ISODateTime = string & { readonly __brand: "ISODateTime" };

// ---------------------------------------------------------
// USUARIO Y ROLES
// ---------------------------------------------------------

export interface User {
  id: UUID;
  nombre: string;
  run?: string;
  email: string;
  telefono?: string;
  emergencia?: string;
  password: string;
  rol: "paciente" | "medico";
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface Paciente extends User {
  rol: "paciente";
  edad?: number;
  sintomas?: string;
}

export interface Medico extends User {
  rol: "medico";
  especialidad?: string;
}

// ---------------------------------------------------------
// TRIAGE (usado por el patrón Strategy)
// ---------------------------------------------------------

// C1 = más grave / atención inmediata
// C5 = menos grave / puede esperar
export type TriageLevel = "C1" | "C2" | "C3" | "C4" | "C5";
export type NivelTriage = TriageLevel;

// ---------------------------------------------------------
// ESTADO DE LA CONSULTA (usado por el patrón State)
// ---------------------------------------------------------

export type ConsultationStatus = "EnEspera" | "EnAtencion" | "Finalizada";
export type EstadoConsulta = ConsultationStatus;

// ---------------------------------------------------------
// CONSULTA (objeto central del sistema)
// ---------------------------------------------------------

export interface Consultation {
  id: UUID;
  paciente: Paciente;
  medicoId?: UUID;
  nivelTriage: TriageLevel;
  estado: ConsultationStatus;
  horaIngreso: ISODateTime;
  horaInicioAtencion?: ISODateTime;
  horaFin?: ISODateTime;
  recetaId?: UUID;
}

export type Consulta = Consultation;

// ---------------------------------------------------------
// RECETA (usado por el patrón Template Method)
// ---------------------------------------------------------

export interface Medication {
  nombre: string;
  dosis: string;
  frecuencia: string;
}

export interface Prescription {
  id: UUID;
  consultaId: UUID;
  medicoId: UUID;
  pacienteId: UUID;
  medicamentos: Medication[];
  indicaciones?: string;
  fechaEmision: ISODateTime;
}

export type Receta = Prescription;

// ---------------------------------------------------------
// LISTA DE ESPERA
// ---------------------------------------------------------

export interface WaitingList {
  id: UUID;
  consultas: Consultation[];
  actualizadoEn: ISODateTime;
}