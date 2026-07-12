import { useState } from "preact/hooks";
import { AuthService } from "../src/services/AuthService.ts";
import { ModalService } from "../src/services/ModalService.ts";

const authService = new AuthService();
const modalService = ModalService.getInstance();

export default function Auth() {
  const [tab, setTab] = useState("login");
  const [nombre, setNombre] = useState("");
  const [run, setRun] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [emergencia, setEmergencia] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async (e: Event) => {
    e.preventDefault();

    if (!nombre.trim() || !email.trim() || !password.trim()) {
      modalService.showError("Completa nombre, correo y contraseña para crear el perfil.", "Registro");
      return;
    }

    try {
      setIsRegistering(true);
      const usuario = await authService.register({
        nombre,
        run,
        email,
        telefono,
        emergencia,
        password,
      });
      console.log("Usuario registrado", usuario);
      modalService.showError("Cuenta creada con éxito. Ya puedes iniciar sesión.", "Registro");
      setTab("login");
      setNombre("");
      setRun("");
      setEmail("");
      setTelefono("");
      setEmergencia("");
      setPassword("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo crear la cuenta.";
      console.error("Error en registro", error);
      modalService.showError(message, "Registro");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleLogin = async (e: Event) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      modalService.showError("Debes ingresar correo y contraseña");
      return;
    }

    try {
      const usuario = await authService.login(email, password);

      if (!usuario) {
        modalService.showError("Correo o contraseña incorrectos");
        return;
      }

      localStorage.setItem("usuario", JSON.stringify(usuario));
      globalThis.location.href = usuario.rol === "medico" ? "/medico" : "/paciente";
    } catch (error) {
      console.error(error);
      modalService.showError("Error al iniciar sesión");
    }
  };

  const handleEnviarPassword = () => {
    if (email.trim() === "") {
      modalService.showError("Debes ingresar un correo");
      return;
    }

    setMensajeEnviado(true);
    setTimeout(() => {
      setMensajeEnviado(false);
    }, 3000);
  };

  return (
    <div class="min-h-screen bg-telealae-surface flex flex-col items-center justify-center">

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
      <div class="telealae-card w-full max-w-[1000px] p-10 backdrop-blur-lg">

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
              class="telealae-button mt-4 w-40 mx-auto"
            >
              Iniciar sesión
            </button>

            <button
              type="button"
              onClick={() => setTab("register")}
              class="text-white underline text-sm mt-2"
            >
              Crear Cuenta
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
              disabled={isRegistering}
              class="telealae-button mt-4 w-40 mx-auto disabled:opacity-60"
            >
              {isRegistering ? "Creando..." : "Crear cuenta"}
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