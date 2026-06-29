// lib/consulta/EstadosConsulta.ts
//
// PATRON: STATE
//
// Aqui definimos los 3 estados posibles de una consulta como
// clases separadas. Cada clase sabe EXACTAMENTE que transiciones
// tiene permitidas desde ese estado. La clase Consulta (el
// "contexto", en otro archivo) simplemente le pregunta al estado
// actual que hacer, en lugar de tener un gran if/else.

import type { EstadoConsulta } from "../types.ts";

export interface EstadoConsultaBase {
  obtenerNombre(): EstadoConsulta;
  avanzar(): EstadoConsultaBase;
  finalizar(): EstadoConsultaBase;
}

export class EstadoEnEspera implements EstadoConsultaBase {
  obtenerNombre(): EstadoConsulta {
    return "EnEspera";
  }

  avanzar(): EstadoConsultaBase {
    return new EstadoEnAtencion();
  }

  finalizar(): EstadoConsultaBase {
    throw new Error(
      "No se puede finalizar una consulta que aun esta EnEspera. " +
        "Primero debe pasar a EnAtencion.",
    );
  }
}

export class EstadoEnAtencion implements EstadoConsultaBase {
  obtenerNombre(): EstadoConsulta {
    return "EnAtencion";
  }

  avanzar(): EstadoConsultaBase {
    return new EstadoFinalizada();
  }

  finalizar(): EstadoConsultaBase {
    return new EstadoFinalizada();
  }
}

export class EstadoFinalizada implements EstadoConsultaBase {
  obtenerNombre(): EstadoConsulta {
    return "Finalizada";
  }

  avanzar(): EstadoConsultaBase {
    throw new Error(
      "La consulta ya esta Finalizada, no hay ningun estado siguiente.",
    );
  }

  finalizar(): EstadoConsultaBase {
    throw new Error(
      "La consulta ya esta Finalizada, no se puede finalizar de nuevo.",
    );
  }
}

export function crearEstadoDesdeNombre(
  nombre: EstadoConsulta,
): EstadoConsultaBase {
  switch (nombre) {
    case "EnEspera":
      return new EstadoEnEspera();
    case "EnAtencion":
      return new EstadoEnAtencion();
    case "Finalizada":
      return new EstadoFinalizada();
  }
}