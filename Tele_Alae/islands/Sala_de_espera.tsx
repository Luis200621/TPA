import { useState } from "preact/hooks";

export default function SalaDeEspera() {
  const [open, setOpen] = useState(false);
  const usuario = JSON.parse(
    localStorage.getItem("usuario") || "null"
  );
  return (
    <div class="min-h-screen bg-[#211b8f] text-white">

      {/* HEADER */}
      <header class="bg-[#7a73d1] flex items-center justify-between px-6 py-3">

        {/* LOGO + NOMBRE */}
        <div class="flex items-center gap-3">

          <img
            src="/Logo_a_color.png"
            alt="Logo"
            class="w-20 h-20 object-cover"
          />

          <h1 class="text-white text-[42px] font-light">
            TeleAlae
          </h1>
        </div>

        {/* TEXTO CENTRAL */}
        <div class="text-center">

          <h2 class="text-white text-[34px] font-semibold">
            Bienvenido {usuario ? usuario.nombre : "Paciente"}
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
      <main class="flex gap-8 p-8">

        {/* IZQUIERDA */}
        <section class="w-[40%]">

          <h2 class="text-5xl text-center font-serif mb-10">
            Sala De Espera
          </h2>

          {/* ESTADO */}
          <div class="bg-[#7d73d9] rounded-3xl p-6 mb-10">

            <h3 class="text-3xl text-center font-serif">
              Estado Actual
            </h3>

            <p class="text-center mt-2 text-sm">
              "Posición en fila"
            </p>

            <div class="bg-[#5353d8] rounded-full mt-4 py-2 text-center">
              No registrado / Registrado
            </div>

          </div>

          {/* FECHA + PRIORIDAD */}
          <div class="flex gap-4">

            {/* FECHA */}
            <div class="bg-[#7d73d9] rounded-3xl p-6 w-1/2">

              <h3 class="text-2xl text-center font-serif">
                Fecha Consulta
              </h3>

              <div class="bg-[#5353d8] rounded-full mt-6 py-2 text-center">
                "Fecha"
              </div>

            </div>

            {/* PRIORIDAD */}
            <div class="bg-[#7d73d9] rounded-3xl p-6 w-1/2">

              <h3 class="text-2xl text-center font-serif">
                Nivel De Prioridad
              </h3>

              <div class="bg-[#5353d8] rounded-full mt-6 py-2 text-center">
                "Nivel"
              </div>

            </div>

          </div>

        </section>

        {/* DERECHA */}
        <section class="w-[60%] bg-[#7d73d9] rounded-3xl overflow-hidden">

          <div class="text-center text-4xl py-6 font-serif">
            Lista De Espera
          </div>

          <table class="w-full">

            <thead class="bg-[#9187eb]">

              <tr class="text-lg">

                <th class="py-4">Nombre Paciente</th>
                <th>Tiempo Estimado</th>
                <th>Estado</th>
                <th>Prioridad</th>

              </tr>

            </thead>

            <tbody>

              <tr class="bg-[#4d4dcc] h-16">
                <td class="text-center">Juan Pérez</td>
                <td class="text-center">15 min</td>
                <td class="text-center">En espera</td>
                <td class="text-center">Alta</td>
              </tr>

              <tr class="bg-[#7d73d9] h-16">
                <td class="text-center">Ana Soto</td>
                <td class="text-center">25 min</td>
                <td class="text-center">Registrado</td>
                <td class="text-center">Media</td>
              </tr>

              <tr class="bg-[#4d4dcc] h-16">
                <td class="text-center">Carlos Díaz</td>
                <td class="text-center">10 min</td>
                <td class="text-center">Consulta</td>
                <td class="text-center">Urgente</td>
              </tr>

            </tbody>

          </table>

        </section>

      </main>

      {/* FOOTER */}
      <footer class="bg-[#7d73d9] h-10 mt-10"></footer>

    </div>
  );
}