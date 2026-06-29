import { useState } from "preact/hooks";

export default function Auth() {

  const [tab, setTab] = useState("login");

  // ESTADOS DEL FORMULARIO DE REGISTRO 
  const [nombre, setNombre] = useState("");
  const [run, setRun] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [emergencia, setEmergencia] = useState("");
  const [password, setPassword] = useState("");

  // ESTADO POPUP
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  // CREAR CUENTA
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

  // LOGIN
  const handleLogin = async (e: Event) => {

    e.preventDefault();

    // VALIDAR CAMPOS VACÍOS
    if (email.trim() === "" || password.trim() === "") {

      alert("Debes ingresar correo y contraseña");
      return;

    }

    try {

      // OBTENER USUARIOS
      const res = await fetch("/api/usuarios");
      const data = await res.json();

      // SOPORTA:
      // { usuarios: [...] }
      // o directamente [...]
      const usuarios = data.usuarios || data;

      // BUSCAR USUARIO QUE COINCIDA CON EMAIL Y CONTRASEÑA
      const usuario = usuarios.find(
        (u:any) =>
          u.email === email &&
          u.password === password
      );

      // SI NO SE ENCUENTRA AL USUARIO
      if (!usuario) {

        alert("Correo o contraseña incorrectos");
        return;

      }

      // GUARDAR USUARIO EN LocalStorage PARA LA SESIÓN
      localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
      );

      // REDIRIGIR SEGUN TIPO DE USUARIO
      if (email.endsWith("@telealae.com")) {

        globalThis.location.href = "/medico";

      } else {

        globalThis.location.href = "/paciente";

      }

    } catch (error) {

      console.error(error);
      alert("Error al obtener usuarios");

    }

  };
    /**
   * SIMULA EL ENVÍO DE LA CONTRASEÑA AL CORREO DEL USUARIO.
   * MUESTRA UN POPUP DE CONFIRMACIÓN POR 3 SEGUNDOS. 
   */
  
  const handleEnviarPassword = () => {

    if (email.trim() === "") {

      alert("Debes ingresar un correo");
      return;

    }

    setMensajeEnviado(true);

    setTimeout(() => {

      setMensajeEnviado(false);

    }, 3000);

  };

  return (
    <div class="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center">

      {/* Logo */}
      <img
        src="/Logo_a_color.png"
        class="absolute top-6 left-6 w-44 h-44 object-contain"
      />

      {/* Título */}
      <h1 class="text-7xl text-[#211c84] font-bold mb-2">
        Tele Alae
      </h1>

      {/* Subtítulo */}
      <div class="p-0.5 mb-12">
        <p class="text-[#211c84]/70 mb-2">
          Sistema de Telemedicina Chiloe
        </p>
      </div>

      {/* Cuadro principal */}
      <div class="bg-[#4d55cc] border border-white/30 rounded-3xl p-10 w-full max-w-[1000px] shadow-2xl backdrop-blur-lg">

        {/* Tabs */}
        <div class="flex -mx-10 -mt-10 mb-6 overflow-hidden rounded-t-3xl bg-[#39409d]">

          <button
            onClick={() => setTab("login")}
            class={`flex-1 py-4 text-1xl transition-all border-b-4 ${
              tab === "login"
                ? "text-white border-white"
                : "text-white/60 border-transparent hover:text-white"
            }`}
          >
            Iniciar Sesión
          </button>
          
          <button
            onClick={() => setTab("register")}
            class={`flex-1 py-4 text-1xl transition-all border-b-4 ${
              tab === "register"
                ? "text-white border-white"
                : "text-white/60 border-transparent hover:text-white"
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
                class="w-full mt-1 p-3 rounded-full bg-[#b5a8d5] text-white outline-none placeholder-white/60"
              />

              {/* BOTÓN ENVIAR CONTRASEÑA */}
              <button
                type="button"
                onClick={handleEnviarPassword}
                class="text-white mt-1 text-left underline"
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
                class="w-full mt-1 p-3 rounded-full bg-[#b5a8d5] text-white outline-none placeholder-white/60"
              />

            </div>

            {/* BOTÓN LOGIN */}
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
                  class="w-full mt-1 p-3 rounded-full bg-[#b5a8d5] text-white outline-none placeholder-white/60"
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
                  class="w-full mt-1 p-3 rounded-full bg-[#b5a8d5] text-white outline-none placeholder-white/60"
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
                class="w-full mt-1 p-3 rounded-full bg-[#b5a8d5] text-white outline-none placeholder-white/60"
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
                class="w-full mt-1 p-3 rounded-full bg-[#b5a8d5] text-white outline-none placeholder-white/60"
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
                class="w-full mt-1 p-3 rounded-full bg-[#b5a8d5] text-white outline-none placeholder-white/60"
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
                class="w-full mt-1 p-3 rounded-full bg-[#b5a8d5] text-white outline-none placeholder-white/60"
              />

            </div>

            {/* BOTÓN REGISTER */}
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

      {/* POPUP */}
      {mensajeEnviado && (
        <div class="fixed top-5 right-5 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl">
          Se ha enviado la contraseña a tu correo
        </div>
      )}

    </div>
  );
}