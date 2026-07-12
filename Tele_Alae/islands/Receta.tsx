import { useEffect, useState } from "preact/hooks";

interface Paciente {
  id: number;
  nombre: string;
  sintomas: string;
  prioridad: string;
  tiempo: string;
  status: string;
}

export default function Receta() {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [medico, setMedico] = useState<{ nombre: string } | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Obtener paciente seleccionado
    const pacienteGuardado = localStorage.getItem("pacienteSeleccionado");

    if (pacienteGuardado) {
      setPaciente(JSON.parse(pacienteGuardado));
    }

    // Obtener médico que inició sesión
    const medicoGuardado = localStorage.getItem("usuario");

    if (medicoGuardado) {
      setMedico(JSON.parse(medicoGuardado));
    }
  }, []);

  if (!paciente) {
    return (
      <div class="min-h-screen flex items-center justify-center bg-white">
        <p class="text-2xl text-[#211C84]">
          No hay ningún paciente seleccionado
        </p>
      </div>
    );
  }

  return (
    <div class="min-h-screen relative bg-white">

      {/* HEADER */}
      <header class="bg-[#4D55CC] text-white flex items-center justify-between px-5 py-3">

        {/* IZQUIERDA */}
        <div class="flex items-center gap-5">
          <img
            src="/Logo_a_color.png"
            class="w-20 h-20 object-contain"
          />

          <h1 class="text-5xl font-light">
            TeleAlae
          </h1>
        </div>

        {/* NOMBRE DEL MÉDICO */}
        <div class="text-center">
          <p class="text-xl">
            {medico ? medico.nombre : "Nombre Doctor"}
          </p>
        </div>

        {/* MENÚ */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
        >
          <img
            src="/menu.svg"
            class="w-14 h-14"
          />
        </button>

      </header>

      {/* MENÚ DESPLEGABLE */}
      {open && (
        <div class="absolute right-4 top-20 bg-[#4D55CC] w-52 rounded-2xl p-6 shadow-2xl z-50">

          <button
            type="button"
            onClick={() => {
              globalThis.location.href = "/medico";
            }}
            class="block w-full bg-[#39409D] text-white py-3 rounded-full mb-4"
          >
            Inicio
          </button>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("usuario");
              globalThis.location.href = "/";
            }}
            class="block w-full bg-[#39409D] text-white py-3 rounded-full"
          >
            Cerrar sesión
          </button>

        </div>
      )}

      {/* NOMBRE DEL PACIENTE */}
      <h2 class="text-center text-[#211C84] text-4xl font-semibold mt-8">
        “{paciente.nombre}”
      </h2>

      {/* TABLA DEL PACIENTE */}
      <div class="max-w-[1400px] mx-auto mt-8">

        {/* ENCABEZADOS */}
        <div class="grid grid-cols-6 bg-[#4D55CC] text-white px-8 py-5 text-xl">

          <div>Nombre Paciente</div>
          <div>Síntomas</div>
          <div>Prioridad</div>
          <div>Tiempo</div>
          <div>Status</div>
          <div>Acción</div>

        </div>

        {/* DATOS */}
        <div class="grid grid-cols-6 bg-[#39409D] text-white px-8 py-6">

          <div>{paciente.nombre}</div>
          <div>{paciente.sintomas}</div>
          <div>{paciente.prioridad}</div>
          <div>{paciente.tiempo}</div>
          <div>{paciente.status}</div>
          <div></div>

        </div>

      </div>

      {/* ESPECIALIDAD */}
      <section class="text-center mt-10">

        <h2 class="text-[#211C84] text-4xl mb-10">
          ¿Qué tipo de Especialidad?
        </h2>

        <button
          type="button"
          class="bg-[#4D55CC] text-white w-64 h-24 rounded-[30px]"
        >
          <div class="bg-[#39409D] rounded-full py-2 mx-6">
            Especialidad
          </div>
        </button>

      </section>

      {/* TIPO DE RECETA */}
      <section class="mt-16">

        <h2 class="text-center text-[#211C84] text-4xl mb-12">
          ¿Qué tipo de receta?
        </h2>

        <div class="flex justify-center gap-24">

          {/* RECETA RETENIDA */}
          <div class="w-64">

            <button
              type="button"
              class="bg-[#4D55CC] text-white w-full h-32 rounded-[30px]"
            >
              <p class="text-xl mb-6">
                Receta Retenida
              </p>

              <div class="bg-[#39409D] rounded-full py-2 mx-4">
                Crear
              </div>
            </button>

            <p class="text-[#4D55CC] text-sm mt-4">
              Para fármacos con mayor control, como ciertos antibióticos
              o medicamentos controlados.
            </p>

          </div>

          {/* RECETA SIMPLE */}
          <div class="w-64">

            <button
              type="button"
              class="bg-[#4D55CC] text-white w-full h-32 rounded-[30px]"
            >
              <p class="text-xl mb-6">
                Receta Simple
              </p>

              <div class="bg-[#39409D] rounded-full py-2 mx-4">
                Crear
              </div>
            </button>

            <p class="text-[#4D55CC] text-sm mt-4">
              Para la mayoría de los medicamentos de venta bajo receta.
            </p>

          </div>

          {/* RECETA CHEQUE */}
          <div class="w-64">

            <button
              type="button"
              class="bg-[#4D55CC] text-white w-full h-32 rounded-[30px]"
            >
              <p class="text-xl mb-6">
                Receta Cheque
              </p>

              <div class="bg-[#39409D] rounded-full py-2 mx-4">
                Crear
              </div>
            </button>

            <p class="text-[#4D55CC] text-sm mt-4">
              Documento oficial utilizado para medicamentos que requieren
              un alto nivel de control.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}