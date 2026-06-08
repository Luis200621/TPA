import EstadoPaciente from "./EstadoPaciente.ts";
import Paciente from "../models/Paciente.ts";

export default class ConsultaState implements EstadoPaciente {

  nombreEstado(): string {
    return "En Consulta";
  }

  siguiente(_paciente: Paciente): void {
    console.log("Consulta finalizada");
  }
}