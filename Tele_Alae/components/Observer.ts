export interface Observer {
  update(mensaje: string): void;
}

export class PacienteObserver implements Observer {
  update(mensaje: string) {
    console.log("Paciente:", mensaje);
  }
}

export class MedicoObserver implements Observer {
  update(mensaje: string) {
    console.log("Médico:", mensaje);
  }
}

export class ConsultaSubject {
  private observers: Observer[] = [];

  agregarObserver(observer: Observer) {
    this.observers.push(observer);
  }

  notificar(mensaje: string) {
    this.observers.forEach((observer) => {
      observer.update(mensaje);
    });
  }
}