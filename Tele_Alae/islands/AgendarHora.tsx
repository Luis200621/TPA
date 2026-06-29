import { useState, useEffect } from "preact/hooks";

export default function AgendarHora() {
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
    <div class="min-h-screen bg-[#211C84] flex flex-col">

      {/* Header */}
    <header class="bg-[#7a73d1] flex items-center justify-between px-6 py-3">
      
        {/* IZQUIERDA */}
        <div class="flex items-center gap-4">
          <img
            src="/Logo_a_color.png"
            class="w-20 h-20 object-contain"
          />
          <h1 class="text-white text-[42px] font-light">
            TeleAlae
          </h1>
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

      {/* Contenido */}
      <main class="flex-1 px-12 py-10">

        <h2 class="text-center text-white text-5xl mb-12">
          Agendando Hora
        </h2>

        <div class="bg-[#8B84DD] rounded-[40px] p-10">

          <h3 class="text-center text-white text-3xl mb-8">
            Síntomas Actuales
          </h3>

          <textarea
            placeholder="Describa sus síntomas..."
            class="
              w-full
              h-52
              rounded-[50px]
              bg-[#5156CC]
              text-white
              p-8
              resize-none
              outline-none
              text-xl
            "
          />

        </div>

      </main>

      {/* Footer */}
      <footer class="bg-[#7D76D8] h-16" />

    </div>
  );
}
    