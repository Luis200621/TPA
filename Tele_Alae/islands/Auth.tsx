import { useState } from "preact/hooks";

export default function Auth() {
  const [tab, setTab] = useState("login");

  return (
    <div class="min-h-screen bg-[#211C84] flex flex-col items-center justify-center">

      {/* 🔹 TÍTULO AFUERA */}
      <div class="bg-[#7473d1] border border-white/30 rounded-3xl p-2 mb-1" >
      <h1 class="text-7xl text-white font-bold mb-2">
        Tele Alae
      </h1>
      </div>
      <div class="bg-[#7473d1] border border-white/30 rounded-3xl p-0.5 mb-12" >
      <p class="text-white/70 mb-2">
        Sistema de Telemedicina Chiloe
      </p>
      </div>
      {/* 🔹 CUADRO */}
      <div class="bg-[#7473D1] border border-white/30 rounded-3xl p-10 w-full max-w-[1000px] shadow-2xl backdrop-blur-lg">

        {/* Tabs */}
        <div class="flex mb-6">
          <button 
            onClick={() => setTab("login")}
            class={`flex-1 py-2 text-white border-b-2 ${
              tab === "login" ? "border-white" : "border-transparent text-white/60"
            }`}
          >
            Iniciar
          </button>

          <button 
            onClick={() => setTab("register")}
            class={`flex-1 py-2 text-white border-b-2 ${
              tab === "register" ? "border-white" : "border-transparent text-white/60"
            }`}
          >
            Crear Cuenta
          </button>
        </div>

        {/* LOGIN */}
        {tab === "login" && (
          <form class="flex flex-col gap-4">
            <div>
              <label class="text-white">Email</label>
              <input 
                type="email"
                placeholder="correo@algo.com"
                class="w-full mt-1 p-3 rounded-full bg-[#4D55CC] text-white outline-none placeholder-white/60"
              />
              <button class="text-white">
              E̲n̲v̲i̲a̲r̲ C̲o̲r̲r̲e̲o̲
              </button>
            </div>

            <div>
              <label class="text-white">Contraseña</label>
              <input 
                type="password"
                placeholder="********"
                class="w-full mt-1 p-3 rounded-full bg-[#4D55CC] text-white outline-none placeholder-white/60"
              />
            </div>

            <button class="mt-4 bg-[#4D55CC] hover:bg-indigo-800 text-white py-3 rounded-full">
              Iniciar sesión
            </button>
          </form>
        )}

        {/* REGISTER */}
        {tab === "register" && (
          <form class="flex flex-col gap-4">

            <div class="flex gap-4">
              <div class="flex-1">
                <label class="text-white">Nombre completo</label>
                <input 
                  type="text"
                  placeholder="Victor Arcides Saldivia Vera"
                  class="w-full mt-1 p-3 rounded-full bg-[#4D55CC] text-white outline-none"
                />
              </div>

              <div class="flex-1">
                <label class="text-white">RUN</label>
                <input 
                  type="text"
                  placeholder="12345678-9"
                  class="w-full mt-1 p-3 rounded-full bg-[#4D55CC] text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label class="text-white">Email</label>
              <input 
                type="email"
                placeholder="correo@algo.com"
                class="w-full mt-1 p-3 rounded-full bg-[#4D55CC] text-white outline-none"
              />
            </div>

            <div>
              <label class="text-white">Número Telefónico</label>
              <input 
                type="text"
                placeholder="+56 9 1234 5678"
                class="w-full mt-1 p-3 rounded-full bg-[#4D55CC] text-white outline-none"
              />
            </div>

            <div>
              <label class="text-white">Contacto de emergencia</label>
              <input 
                type="text"
                placeholder="+56 9 1234 5678"
                class="w-full mt-1 p-3 rounded-full bg-[#4D55CC] text-white outline-none"
              />
            </div>

            <button class="mt-4 bg-[#4D55CC] hover:bg-indigo-800 text-white py-3 rounded-full">
              Crear cuenta
            </button>

          </form>
        )}

      </div>
    </div>
  );
}