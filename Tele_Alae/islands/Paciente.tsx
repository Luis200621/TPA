import { useState } from "preact/hooks";

export default function Paciente() {

  const [open, setOpen] = useState(false);

  const usuario = JSON.parse(
    localStorage.getItem("usuario") || "null"
  );

  return (
    <div class="min-h-screen bg-[#211C84] flex flex-col">

      {/* HEADER */}
      <header class="bg-[#7a73d1] flex items-center justify-between px-6 py-3">

        {/* LOGO + NOMBRE */}
        <div class="flex items-center gap-3">

          <img
            src="/Logo_a_color.png"
            alt="Logo"
            class="w-20 h-20 object-cover border-2 border-cyan-400"
          />

          <h1 class="text-white text-[42px] font-light">
            TeleAlae
          </h1>
        </div>

        {/* TEXTO CENTRAL */}
        <div class="text-center">

          <h2 class="text-white text-[34px] font-semibold">
            Bienvenido "{usuario ? usuario.nombre : "Paciente"}"
          </h2>

          <p class="text-[#D9D9FF] text-[22px]">
            Administra tus citas y expedientes de salud
          </p>
        </div>

        {/* MENU */}
        <div class="flex items-center gap-8">



          <button
            type="button"
            onClick={() => setOpen(!open)}
          >
            <img
              src="/menu.svg"
              alt="Menu"
              class="w-14 h-14"
            />
          </button>
        </div>
      </header>

      {/* MENU DESPLEGABLE */}
      {open && (
        <div class="absolute right-4 top-20 bg-[#b5a8d5] w-52 rounded-2xl p-6 shadow-2xl z-50">

          <button class="block w-full bg-[#4D55CC] text-white py-3 rounded-full mb-6 hover:bg-[#3b42b0] transition">
            Opciones
          </button>

          <button class="block w-full bg-[#4D55CC] text-white py-3 rounded-full mb-6 hover:bg-[#3b42b0] transition">
            Ayuda
          </button>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("usuario");
              globalThis.location.href = "/";
            }}
            class="block w-full bg-[#4D55CC] text-white py-3 rounded-full hover:bg-[#3b42b0] transition"
          >
            Cerrar sesión
          </button>
        </div>
      )}

      {/* CONTENIDO */}
      <main class="flex-1 flex items-center justify-center gap-28 px-10">

        {/* CARD 1 */}
        <div class="bg-[#8B84E6] w-[240px] rounded-[28px] py-5 px-4 flex flex-col items-center shadow-lg">

          <h3 class="text-white text-[30px] text-center leading-tight">
            Historial De Consultas Médicas
          </h3>

          <a href="/historial" class="w-full">
            <button class="mt-5 bg-[#5B5FEA] hover:bg-[#4b4fd6] transition-all w-full rounded-full py-2 text-white text-[24px]">
              Descargar
            </button>
          </a>
        </div>

        {/* CARD 2 */}
        <div class="bg-[#8B84E6] w-[240px] rounded-[28px] py-5 px-4 flex flex-col items-center shadow-lg">

          <h3 class="text-white text-[30px] text-center leading-tight">
            Agendar Hora
          </h3>

          <a href="/agendar" class="w-full">
            <button class="mt-5 bg-[#5B5FEA] hover:bg-[#4b4fd6] transition-all w-full rounded-full py-2 text-white text-[24px]">
              Agendar
            </button>
          </a>
        </div>

        {/* CARD 3 */}
        <div class="bg-[#8B84E6] w-[240px] rounded-[28px] py-5 px-4 flex flex-col items-center shadow-lg">

          <h3 class="text-white text-[30px] text-center leading-tight">
            Consulta Actual
          </h3>

          <a href="/sala_de_espera" class="w-full">
            <button class="mt-5 bg-[#5B5FEA] hover:bg-[#4b4fd6] transition-all w-full rounded-full py-2 text-white text-[24px]">
              Ver
            </button>
          </a>
        </div>

      </main>

      {/* FOOTER */}
      <footer class="h-[50px] bg-[#7C73D8]" />

    </div>
  );
}