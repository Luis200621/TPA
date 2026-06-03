import EstadoPaciente from "./EstadoPaciente.ts";
import Paciente from "../models/Paciente.ts";
import EsperaState from "./EsperaState.ts";

export default class RegistradoState implements EstadoPaciente {

  nombreEstado(): string {
    return "Registrado";
  }

  siguiente(paciente: Paciente): void {
    paciente.setEstado(new EsperaState());
  }
}