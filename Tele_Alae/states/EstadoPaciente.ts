import Paciente from "../models/Paciente.ts";

export default interface EstadoPaciente {
  nombreEstado(): string;
  siguiente(paciente: Paciente): void;
}