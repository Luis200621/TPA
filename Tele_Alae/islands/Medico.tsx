import { useState, useEffect } from "preact/hooks";

export default function Medico() {
  const [open, setOpen] = useState(false);
  const [usuario, setUsuario] = useState<{ nombre: string } | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUsuario(parsedUser);
    }
  }, []);

  return (
    <div class="min-h-screen relative bg-[#211c84] text-white">
      {/* HEADER */}
      <header class="bg-[#7a73d1] flex items-center justify-between px-6 py-3">
      
        {/* IZQUIERDA */}
        <div class="flex items-center gap-4">
          <img
            src="/Logo_a_color.png"
            class="w-20 h-20 object-contain"
          />
          <h1 class="text-5xl font-light">TeleAlae</h1>
        </div>
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

      {open && (
        <div class="absolute right-4 top-20 bg-[#b5a8d5] w-52 rounded-2xl p-6 shadow-2xl">
          <button class="block w-full bg-[#4D55CC] text-white py-3 rounded-full mb-6">
            Opciones
          </button>
          <button class="block w-full bg-[#4D55CC] text-white py-3 rounded-full mb-6">
            Ayuda
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("usuario");
              globalThis.location.href = "/";
            }}
            class="block w-full bg-[#4D55CC] text-white py-3 rounded-full"
          >
            Cerrar sesión
          </button>
        </div>
      )}

      {/* CONTENIDO */}
      <main class="px-10 py-6">
        {/* TITULO */}
        

        {/* TARJETAS */}
        <div class="flex justify-center gap-20 mb-14">
          {/* CARD 1 */}
          <div class="bg-[#7a73d1] w-[220px] rounded-[30px] p-5 text-center">
            <h3 class="text-2xl mb-16">Pacientes Totales</h3>
            <div class="bg-[#4D55CC] rounded-full py-3">
              “Cantidad”
            </div>
          </div>

          {/* CARD 2 */}
          <div class="bg-[#7a73d1] w-[220px] rounded-[30px] p-5 text-center">
            <h3 class="text-2xl mb-8">Pacientes Críticos</h3>
            <div class="bg-[#4D55CC] rounded-full py-3">
              “Número”
            </div>
          </div>

          {/* CARD 3 */}
          <div class="bg-[#7a73d1] w-[220px] rounded-[30px] p-5 text-center">
            <h3 class="text-2xl mb-8">Consultas activas</h3>
            <div class="bg-[#4D55CC] rounded-full py-3">
              “Número”
            </div>
          </div>
        </div>

        {/* TABLA */}
        <div class="max-w-[1400px] mx-auto overflow-hidden rounded-lg">
          {/* TITULO TABLA */}
          <div class="bg-[#4D55CC] text-center py-4 text-3xl">
            Lista De Espera
          </div>

          {/* ENCABEZADOS */}
          <div class="grid grid-cols-6 bg-[#7a73d1] px-6 py-5 text-2xl">
            <div>Nombre Paciente</div>
            <div>Síntomas</div>
            <div>Prioridad</div>
            <div>Tiempo</div>
            <div>Status</div>
            <div>Acción</div>
          </div>

          {/* FILAS */}
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div
              key={index}
              class="grid grid-cols-6 items-center bg-[#4D55CC] even:bg-[#7a73d1] px-6 py-4"
            >
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div class="flex justify-center">
                <button class="bg-[#5b64ff] w-24 h-10 rounded-full"></button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}