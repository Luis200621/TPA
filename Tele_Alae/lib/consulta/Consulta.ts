// lib/consulta/Consulta.ts
//
// PATRON: STATE (continuacion)
//
// Esta es la clase "CONTEXTO" del patron State.

import type { Consulta as ConsultaDatos, NivelTriage } from "../types.ts";
import {
  crearEstadoDesdeNombre,
  EstadoConsultaBase,
  EstadoEnEspera,
} from "./EstadosConsulta.ts";

export class ConsultaContexto {
  private datos: ConsultaDatos;
  private estadoActual: EstadoConsultaBase;

  private constructor(datos: ConsultaDatos, estado: EstadoConsultaBase) {
    this.datos = datos;
    this.estadoActual = estado;
  }

  public static crearNueva(
    id: string,
    paciente: ConsultaDatos["paciente"],
    nivelTriage: NivelTriage,
  ): ConsultaContexto {
    const datos: ConsultaDatos = {
      id,
      paciente,
      nivelTriage,
      estado: "EnEspera",
      horaIngreso: new Date().toISOString(),
    };
    return new ConsultaContexto(datos, new EstadoEnEspera());
  }

  public static desdeDatos(datos: ConsultaDatos): ConsultaContexto {
    const estado = crearEstadoDesdeNombre(datos.estado);
    return new ConsultaContexto(datos, estado);
  }

  public avanzar(): void {
    this.estadoActual = this.estadoActual.avanzar();
    this.sincronizarDatosConEstado();
  }

  public finalizar(): void {
    this.estadoActual = this.estadoActual.finalizar();
    this.sincronizarDatosConEstado();
  }

  private sincronizarDatosConEstado(): void {
    const nombreNuevoEstado = this.estadoActual.obtenerNombre();
    this.datos.estado = nombreNuevoEstado;

    if (nombreNuevoEstado === "EnAtencion" && !this.datos.horaInicioAtencion) {
      this.datos.horaInicioAtencion = new Date().toISOString();
    }

    if (nombreNuevoEstado === "Finalizada" && !this.datos.horaFin) {
      this.datos.horaFin = new Date().toISOString();
    }
  }

  public asignarMedico(medicoId: string): void {
    this.datos.medicoId = medicoId;
  }

  public obtenerDatos(): ConsultaDatos {
    return this.datos;
  }

  public obtenerNombreEstado(): ConsultaDatos["estado"] {
    return this.estadoActual.obtenerNombre();
  }
}