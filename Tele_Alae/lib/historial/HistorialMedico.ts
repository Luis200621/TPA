
//
// PATRON: SINGLETON
//
// Esta clase garantiza que exista UNA SOLA conexion a Deno KV
// en toda la aplicacion, y centraliza todas las operaciones de
// persistencia de Consultas y Recetas.
//
// Nadie debe hacer "new HistorialMedico()" directamente.
// Siempre se usa: HistorialMedico.getInstance()

import type { Consulta, Receta } from "../types.ts";

export class HistorialMedico {
  // Unica instancia de la clase (privada, estatica)
  private static instancia: HistorialMedico | null = null;

  // Conexion a Deno KV (se abre una sola vez)
  private kv: Deno.Kv;

  // Constructor PRIVADO: nadie de fuera puede hacer "new HistorialMedico()"
  private constructor(kv: Deno.Kv) {
    this.kv = kv;
  }

  // Punto de entrada unico para obtener la instancia.
  // Es async porque Deno.openKv() es una operacion asincrona.
  public static async getInstance(): Promise<HistorialMedico> {
    if (HistorialMedico.instancia === null) {
      const kv = await Deno.openKv();
      HistorialMedico.instancia = new HistorialMedico(kv);
    }
    return HistorialMedico.instancia;
  }

  // -----------------------------------------------------
  // CONSULTAS
  // -----------------------------------------------------

  // Guarda o actualiza una consulta (la clave es su id)
  public async guardarConsulta(consulta: Consulta): Promise<void> {
    await this.kv.set(["consultas", consulta.id], consulta);
  }

  // Obtiene una consulta especifica por su id
  public async obtenerConsulta(id: string): Promise<Consulta | null> {
    const resultado = await this.kv.get<Consulta>(["consultas", id]);
    return resultado.value;
  }

  // Obtiene TODAS las consultas guardadas (para la lista de espera)
  public async obtenerTodasLasConsultas(): Promise<Consulta[]> {
    const consultas: Consulta[] = [];
    const iter = this.kv.list<Consulta>({ prefix: ["consultas"] });
    for await (const entrada of iter) {
      consultas.push(entrada.value);
    }
    return consultas;
  }

  // Elimina una consulta (por ejemplo, al cancelarla)
  public async eliminarConsulta(id: string): Promise<void> {
    await this.kv.delete(["consultas", id]);
  }

  // -----------------------------------------------------
  // RECETAS
  // -----------------------------------------------------

  // Guarda una receta. Ademas la indexa por pacienteId para
  // poder consultar el historial de un paciente facilmente.
  public async guardarReceta(receta: Receta): Promise<void> {
    await this.kv.set(["recetas", receta.id], receta);
    await this.kv.set(
      ["recetas_por_paciente", receta.pacienteId, receta.id],
      receta,
    );
  }

  // Obtiene una receta especifica por su id
  public async obtenerReceta(id: string): Promise<Receta | null> {
    const resultado = await this.kv.get<Receta>(["recetas", id]);
    return resultado.value;
  }

  // Obtiene todas las recetas de un paciente (su "historial medico")
  public async obtenerRecetasDePaciente(
    pacienteId: string,
  ): Promise<Receta[]> {
    const recetas: Receta[] = [];
    const iter = this.kv.list<Receta>({
      prefix: ["recetas_por_paciente", pacienteId],
    });
    for await (const entrada of iter) {
      recetas.push(entrada.value);
    }
    return recetas;
  }
}