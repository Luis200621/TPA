import { useState, useEffect } from "preact/hooks";

interface Consulta {
  id: number;
  nombre: string;
  sintomas: string;
  prioridad: string;
  tiempo: string;
  status: string;
}

export default function Medico() {
  const [open, setOpen] = useState(false);

  const [usuario, setUsuario] = useState<{ nombre: string } | null>(null);

  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    // Obtener médico que inició sesión
    const user = localStorage.getItem("usuario");

    if (user) {
      const parsedUser = JSON.parse(user);
      setUsuario(parsedUser);
    }

    // Obtener consultas desde el JSON
    fetch("/api/consultas")
      .then((res) => res.json())
      .then((data) => {
        setConsultas(data);
      })
      .catch((error) => {
        console.error("Error al cargar consultas:", error);
      });
  }, []);

  // Seleccionar paciente y abrir su consulta
  const abrirConsulta = (paciente: Consulta) => {
    localStorage.setItem(
      "pacienteSeleccionado",
      JSON.stringify(paciente)
    );

    globalThis.location.href = "/consulta";
  };

  return (
    <div class="min-h-screen relative bg-[#ffffff] text-white">

      {/* HEADER */}
      <header class="bg-[#4d55cc] flex items-center justify-between px-6 py-3">

        {/* IZQUIERDA */}
        <div class="flex items-center gap-4">
          <img
            src="/Logo_a_color.png"
            class="w-20 h-20 object-contain"
          />

          <h1 class="text-5xl font-light">
            TeleAlae
          </h1>
        </div>

        {/* CENTRO */}
        <div class="text-center">
          <h2 class="text-white text-[34px] font-semibold">
            Bienvenido {usuario ? usuario.nombre : "Medico"}
          </h2>

          <p class="text-[#D9D9FF] text-[22px]">
            Administra tus citas y expedientes de salud
          </p>
        </div>

        {/* DERECHA */}
        <div class="flex items-center gap-8">
          <button
            type="button"
            onClick={() => setOpen(!open)}
          >
            <img
              src="/menu.svg"
              class="w-14 h-14"
            />
          </button>
        </div>

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

      {/* CONTENIDO */}
      <main class="px-10 py-6">

        {/* TARJETAS */}
        <div class="flex justify-center gap-20 mb-14">

          {/* PACIENTES TOTALES */}
          <div class="bg-[#4d55cc] w-[220px] rounded-[30px] p-5 text-center">

            <h3 class="text-2xl mb-16">
              Pacientes Totales
            </h3>

            <div class="bg-[#39409d] rounded-full py-3">
              {consultas.length}
            </div>

          </div>

          {/* PACIENTES CRÍTICOS */}
          <div class="bg-[#4d55cc] w-[220px] rounded-[30px] p-5 text-center">

            <h3 class="text-2xl mb-8">
              Pacientes Críticos
            </h3>

            <div class="bg-[#39409d] rounded-full py-3">
              {
                consultas.filter(
                  (consulta) =>
                    consulta.prioridad.toLowerCase() === "alta"
                ).length
              }
            </div>

          </div>

          {/* CONSULTAS ACTIVAS */}
          <div class="bg-[#4d55cc] w-[220px] rounded-[30px] p-5 text-center">

            <h3 class="text-2xl mb-8">
              Consultas activas
            </h3>

            <div class="bg-[#39409d] rounded-full py-3">
              {consultas.length}
            </div>

          </div>

        </div>

        {/* TABLA */}
        <div class="max-w-[1400px] mx-auto overflow-hidden rounded-lg">

          {/* TÍTULO TABLA */}
          <div class="bg-[#4D55CC] text-center py-4 text-3xl">
            Lista De Espera
          </div>

          {/* ENCABEZADOS */}
          <div class="grid grid-cols-6 bg-[#5b64ff] px-6 py-5 text-2xl">

            <div>Nombre Paciente</div>

            <div>Síntomas</div>

            <div>Prioridad</div>

            <div>Tiempo</div>

            <div>Status</div>

            <div>Acción</div>

          </div>

          {/* FILAS */}
          {consultas.map((paciente) => (

            <div
              key={paciente.id}
              class="grid grid-cols-6 items-center bg-[#4D55CC] even:bg-[#5b64ff] px-6 py-4"
            >

              <div>
                {paciente.nombre}
              </div>

              <div>
                {paciente.sintomas}
              </div>

              <div>
                {paciente.prioridad}
              </div>

              <div>
                {paciente.tiempo}
              </div>

              <div>
                {paciente.status}
              </div>

              <div class="flex justify-center">

                <button
                  type="button"
                  onClick={() => abrirConsulta(paciente)}
                  class="bg-[#39409d] w-24 h-10 rounded-full hover:bg-[#2d327c]"
                >
                  Ver
                </button>

              </div>

            </div>

          ))}

          {/* MENSAJE SI NO HAY CONSULTAS */}
          {consultas.length === 0 && (

            <div class="bg-[#4D55CC] text-center py-8">
              No hay pacientes en la lista de espera
            </div>

          )}

        </div>

      </main>

    </div>
  );
}