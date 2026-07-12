import { useEffect, useState } from "preact/hooks";

interface Paciente {
  id: number;
  nombre: string;
  sintomas: string;
  prioridad: string;
  tiempo: string;
  status: string;
}

export default function ConsultaMedica() {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [medico, setMedico] = useState<{ nombre: string } | null>(null);

  useEffect(() => {
    // Obtener paciente seleccionado
    const pacienteGuardado = localStorage.getItem(
      "pacienteSeleccionado"
    );

    if (pacienteGuardado) {
      setPaciente(JSON.parse(pacienteGuardado));
    }

    // Obtener médico que inició sesión
    const medicoGuardado = localStorage.getItem("usuario");

    if (medicoGuardado) {
      setMedico(JSON.parse(medicoGuardado));
    }
  }, []);

  // Si no hay paciente seleccionado
  if (!paciente) {
    return (
      <div class="min-h-screen flex items-center justify-center">
        <p class="text-2xl text-[#211C84]">
          No hay ningún paciente seleccionado
        </p>
      </div>
    );
  }

  return (
    <div class="min-h-screen bg-white">

      {/* HEADER */}
      <header class="bg-[#4D55CC] text-white flex items-center justify-between px-5 py-3">

        {/* LOGO Y NOMBRE */}
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
        <h2 class="text-2xl">
          {medico ? medico.nombre : "Nombre Doctor"}
        </h2>

        {/* MENÚ */}
        <button type="button">
          <img
            src="/menu.svg"
            class="w-14 h-14"
          />
        </button>

      </header>

      {/* NOMBRE DEL PACIENTE */}
      <h2 class="text-center text-[#211C84] text-4xl font-semibold mt-8">
        “{paciente.nombre}”
      </h2>

      {/* TABLA */}
      <div class="max-w-[1400px] mx-auto mt-10">

        {/* ENCABEZADOS */}
        <div class="grid grid-cols-5 bg-[#4D55CC] text-white px-8 py-5 text-xl">

          <div>Nombre Paciente</div>

          <div>Síntomas</div>

          <div>Prioridad</div>

          <div>Tiempo</div>

          <div>Status</div>

        </div>

        {/* DATOS DEL PACIENTE */}
        <div class="grid grid-cols-5 bg-[#5759D5] text-white px-8 py-8 min-h-[150px]">

          <div>{paciente.nombre}</div>

          <div>{paciente.sintomas}</div>

          <div>{paciente.prioridad}</div>

          <div>{paciente.tiempo}</div>

          <div>{paciente.status}</div>

        </div>

      </div>

      {/* BOTONES INFERIORES */}
      <div class="flex justify-around items-center mt-44">

        {/* GENERAR RECETA */}
        <button
          type="button"
          onClick={() => {
            globalThis.location.href = "/receta";
          }}
          class="bg-[#4D55CC] text-white w-56 h-28 rounded-[30px]"
        >
          <p class="text-xl mb-5">
            Generar Receta
          </p>
      
          <div class="bg-[#39409D] rounded-full py-2 mx-4">
            Crear
          </div>
        </button>

        {/* LLAMAR */}
        <button
          type="button"
          class="bg-[#4D55CC] text-white w-56 h-28 rounded-[30px] text-xl"
        >
          Llamar
        </button>

        {/* URGENCIAS */}
        <button
          type="button"
          class="bg-[#4D55CC] text-white w-56 h-28 rounded-[30px]"
        >
          <p class="text-xl mb-5">
            Urgencias
          </p>

          <div class="bg-[#39409D] rounded-full py-2 mx-4">
            Avisar!
          </div>
        </button>

      </div>

    </div>
  );
}