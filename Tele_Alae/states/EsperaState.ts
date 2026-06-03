import EstadoPaciente from "./EstadoPaciente.ts";
import Paciente from "../models/Paciente.ts";
import ConsultaState from "./ConsultaState.ts";

export default class EsperaState implements EstadoPaciente {

  nombreEstado(): string {
    return "En Espera";
  }

  siguiente(paciente: Paciente): void {
    paciente.setEstado(new ConsultaState());
  }
}