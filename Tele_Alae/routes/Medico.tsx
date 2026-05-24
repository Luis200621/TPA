export default function Medico() {
  return (
    <div class="min-h-screen bg-[#211c84] text-white">

      {/* HEADER */}
      <header class="bg-[#7a73d1] flex items-center justify-between px-6 py-3">

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

        {/* DERECHA */}
        <div class="flex items-center gap-8">
          <p class="text-2xl">
            Nombre Doctor
          </p>

          <button class="bg-[#4D55CC] px-8 py-2 rounded-full">
            Cerrar Sesion
          </button>
        </div>

      </header>

      {/* CONTENIDO */}
      <main class="px-10 py-6">

        {/* TITULO */}
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold">
            Bienvenido “Nombre Doctor”
          </h2>

          <p class="text-base text-white/80 mt-2">
            Administra tus citas y Consultas de TeleAlae
          </p>
        </div>

        {/* TARJETAS */}
        <div class="flex justify-center gap-20 mb-14">

          {/* CARD 1 */}
          <div class="bg-[#7a73d1] w-[220px] rounded-[30px] p-5 text-center">

            <h3 class="text-2xl mb-16">
              Pacientes Totales
            </h3>

            <div class="bg-[#4D55CC] rounded-full py-3">
              “Cantidad”
            </div>
          </div>

          {/* CARD 2 */}
          <div class="bg-[#7a73d1] w-[220px] rounded-[30px] p-5 text-center">

            <h3 class="text-2xl mb-8">
              Pacientes Criticos
            </h3>

            <div class="bg-[#4D55CC] rounded-full py-3">
              “Numero”
            </div>
          </div>

          {/* CARD 3 */}
          <div class="bg-[#7a73d1] w-[220px] rounded-[30px] p-5 text-center">

            <h3 class="text-2xl mb-8">
              Consultas activas
            </h3>

            <div class="bg-[#4D55CC] rounded-full py-3">
              “Numero”
            </div>
          </div>

        </div>

        {/* TABLA */}
        {/*forma alternativa (<div class="max-w-[1400px] mx-auto rounded-lg overflow-y-auto max-h-[400px]">)*/}
        <div class="max-w-[1400px] mx-auto overflow-hidden rounded-lg">

          {/* TITULO TABLA */}
          <div class="bg-[#4D55CC] text-center py-4 text-3xl">
            Lista De Espera
          </div>

          {/* ENCABEZADOS */}
          <div class="grid grid-cols-6 bg-[#7a73d1] px-6 py-5 text-2xl">

            <div>Nombre Paciente</div>
            <div>sintomas</div>
            <div>Prioridad</div>
            <div>Tiempo</div>
            <div>Status</div>
            <div>Accion</div>

          </div>

          {/* FILAS */}
          {[1,2,3,4,5,6].map(() => (
            <div class="grid grid-cols-6 items-center bg-[#4D55CC] even:bg-[#7a73d1] px-6 py-4">

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