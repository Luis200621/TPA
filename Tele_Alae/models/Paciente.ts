import EstadoPaciente from "../states/EstadoPaciente.ts";
import RegistradoState from "../states/RegistradoState.ts";

export default class Paciente {

  nombre: string;
  prioridad: string;
  estado: EstadoPaciente;

  constructor(nombre: string, prioridad: string) {
    this.nombre = nombre;
    this.prioridad = prioridad;
    this.estado = new RegistradoState();
  }

  setEstado(estado: EstadoPaciente) {
    this.estado = estado;
  }

  avanzarEstado() {
    this.estado.siguiente(this);
  }

  obtenerEstado(): string {
    return this.estado.nombreEstado();
  }
}