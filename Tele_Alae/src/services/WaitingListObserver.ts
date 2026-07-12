import type { Consultation } from "../../lib/types.ts";
import { ListaEspera } from "../../lib/espera/ListaEspera.ts";
import type { ObservadorEspera } from "../../lib/espera/Observador.ts";

export class WaitingListObserver implements ObservadorEspera {
  private readonly listaEspera: ListaEspera;
  private ultimaLista: Consultation[] = [];

  constructor(listaEspera = new ListaEspera()) {
    this.listaEspera = listaEspera;
  }

  public actualizar(consultasEnEspera: Consultation[]): void {
    this.ultimaLista = consultasEnEspera;
  }

  public notificar(consulta: Consultation): void {
    this.listaEspera.agregarPaciente(consulta);
    this.actualizar(this.listaEspera.obtenerTodos());
  }

  public obtenerUltimaLista(): Consultation[] {
    return [...this.ultimaLista];
  }
}
