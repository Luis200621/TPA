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


      {/* MENÚ */}
      {open && (
        <div class="absolute right-4 top-20 bg-[#4d55cc] w-52 rounded-2xl p-6 shadow-2xl z-50">

          <button class="block w-full bg-[#39409d] text-white py-3 rounded-full mb-6">
            Opciones
          </button>

          <button class="block w-full bg-[#39409d] text-white py-3 rounded-full mb-6">
            Ayuda
          </button>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("usuario");
              globalThis.location.href = "/";
            }}
            class="block w-full bg-[#39409d] text-white py-3 rounded-full"
          >
            Cerrar sesión
          </button>

        </div>
      )}


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