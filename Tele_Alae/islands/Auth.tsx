import { useState } from "preact/hooks";

export default function Auth() {

  const [tab, setTab] = useState("login");

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [run, setRun] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [emergencia, setEmergencia] = useState("");
  const [password, setPassword] = useState("");

  // Crear cuenta
  const handleRegister = async (e: Event) => {

    e.preventDefault();

    const usuario = {
      nombre,
      run,
      email,
      telefono,
      emergencia,
      password,
    };

    const res = await fetch("/api/register", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(usuario),

    });

    const data = await res.json();

    alert(data.mensaje);
  };

  // Login
  const handleLogin = (e: Event) => {

    e.preventDefault();

    // Si es médico
    if (email.endsWith("@telealae.com")) {

      globalThis.location.href = "/medico";

    } else {

      // Paciente
      globalThis.location.href = "/paciente";

    }
  };

  return (
    <div class="min-h-screen bg-[#211C84] flex flex-col items-center justify-center">

      {/* Logo */}
      <img
        src="/Logo_a_color.png"
        class="absolute top-6 left-6 w-44 h-44 object-contain"
      />

      {/* Título */}
      <h1 class="text-7xl text-white font-bold mb-2">
        Tele Alae
      </h1>

      {/* Subtítulo */}
      <div class="p-0.5 mb-12">
        <p class="text-white/70 mb-2">
          Sistema de Telemedicina Chiloe
        </p>
      </div>

      {/* Cuadro principal */}
      <div class="bg-[#7473D1] border border-white/30 rounded-3xl p-10 w-full max-w-[1000px] shadow-2xl backdrop-blur-lg">

        {/* Tabs */}
        <div class="flex mb-6">

          <button
            onClick={() => setTab("login")}
            class={`flex-1 py-2 text-white border-b-2 ${
              tab === "login"
                ? "border-white"
                : "border-transparent text-white/60"
            }`}
          >
            Iniciar Sesión
          </button>

          <button
            onClick={() => setTab("register")}
            class={`flex-1 py-2 text-white border-b-2 ${
              tab === "register"
                ? "border-white"
                : "border-transparent text-white/60"
            }`}
          >
            Crear Cuenta
          </button>

        </div>

        {/* LOGIN */}
        {tab === "login" && (

          <form class="flex flex-col gap-4">

            <div>

              <label class="text-white">
                Email
              </label>

              <input
                type="email"
                value={email}
                onInput={(e) => setEmail(e.currentTarget.value)}
                placeholder="correo@algo.com"
                class="w-full mt-1 p-3 rounded-full bg-[#4D55CC] text-white outline-none placeholder-white/60"
              />

              {/* Botón contraseña temporal */}
              <button
                type="button"
                class="text-white mt-2"
              >
                E̲n̲v̲i̲a̲r̲ C̲o̲n̲t̲r̲a̲s̲e̲ñ̲a̲
              </button>

            </div>

            <div>

              <label class="text-white">
                Contraseña
              </label>

              <input
                type="password"
                value={password}
                onInput={(e) => setPassword(e.currentTarget.value)}
                placeholder="********"
                class="w-full mt-1 p-3 rounded-full bg-[#4D55CC] text-white outline-none placeholder-white/60"
              />

            </div>

            {/* Botón login */}
            <button
              type="submit"
              onClick={handleLogin}
              class="mt-4 bg-indigo-800 hover:bg-[#B5A8D5] text-white py-3 rounded-full w-40 mx-auto"
            >
              Iniciar sesión
            </button>

          </form>
        )}

        {/* REGISTER */}
        {tab === "register" && (

          <form class="flex flex-col gap-4">

            {/* Nombre + RUN */}
            <div class="flex gap-4">

              <div class="flex-1">

                <label class="text-white">
                  Nombre completo
                </label>

                <input
                  type="text"
                  value={nombre}
                  onInput={(e) => setNombre(e.currentTarget.value)}
                  placeholder="Victor Arcides Saldivia Vera"
                  class="w-full mt-1 p-3 rounded-full bg-[#4D55CC] text-white outline-none"
                />

              </div>

              <div class="flex-1">

                <label class="text-white">
                  RUN
                </label>

                <input
                  type="text"
                  value={run}
                  onInput={(e) => setRun(e.currentTarget.value)}
                  placeholder="12345678-9"
                  class="w-full mt-1 p-3 rounded-full bg-[#4D55CC] text-white outline-none"
                />

              </div>

            </div>

            {/* Email */}
            <div>

              <label class="text-white">
                Email
              </label>

              <input
                type="email"
                value={email}
                onInput={(e) => setEmail(e.currentTarget.value)}
                placeholder="correo@algo.com"
                class="w-full mt-1 p-3 rounded-full bg-[#4D55CC] text-white outline-none"
              />

            </div>

            {/* Teléfono */}
            <div>

              <label class="text-white">
                Número Telefónico
              </label>

              <input
                type="text"
                value={telefono}
                onInput={(e) => setTelefono(e.currentTarget.value)}
                placeholder="+56 9 1234 5678"
                class="w-full mt-1 p-3 rounded-full bg-[#4D55CC] text-white outline-none"
              />

            </div>

            {/* Emergencia */}
            <div>

              <label class="text-white">
                Contacto de emergencia
              </label>

              <input
                type="text"
                value={emergencia}
                onInput={(e) => setEmergencia(e.currentTarget.value)}
                placeholder="+56 9 1234 5678"
                class="w-full mt-1 p-3 rounded-full bg-[#4D55CC] text-white outline-none"
              />

            </div>

            {/* Contraseña */}
            <div>

              <label class="text-white">
                Contraseña
              </label>

              <input
                type="password"
                value={password}
                onInput={(e) => setPassword(e.currentTarget.value)}
                placeholder="********"
                class="w-full mt-1 p-3 rounded-full bg-[#4D55CC] text-white outline-none"
              />

            </div>

            {/* Botón register */}
            <button
              type="submit"
              onClick={handleRegister}
              class="mt-4 bg-indigo-800 hover:bg-[#B5A8D5] text-white py-3 rounded-full w-40 mx-auto"
            >
              Crear cuenta
            </button>

          </form>
        )}

      </div>

    </div>
  );
}