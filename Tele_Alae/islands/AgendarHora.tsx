import { useEffect, useState } from "preact/hooks";
import { ConsultationService } from "../src/services/ConsultationService.ts";
import { ModalService } from "../src/services/ModalService.ts";
import { TriageService } from "../src/services/TriageService.ts";
import { WaitingListObserver } from "../src/services/WaitingListObserver.ts";

const consultationService = new ConsultationService();
const triageService = new TriageService();
const modalService = ModalService.getInstance();
const waitingListObserver = new WaitingListObserver();

export default function AgendarHora() {
  const [open, setOpen] = useState(false);
  const [usuario, setUsuario] = useState<{ nombre: string } | null>(null);
  const [sintomas, setSintomas] = useState("");
  const [edad, setEdad] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUsuario(parsedUser);
    }
  }, []);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!sintomas.trim()) {
      modalService.showError("Describe tus síntomas para continuar.");
      return;
    }

    if (edad.trim()) {
      const edadNumero = Number(edad);
      if (!Number.isFinite(edadNumero) || edadNumero < 0 || edadNumero > 100 || !Number.isInteger(edadNumero)) {
        modalService.show("Edad inválida");
        return;
      }
    }

    try {
      setIsSubmitting(true);
      const nivelTriage = triageService.clasificar({
        sintomas,
        edad: edad ? Number(edad) : undefined,
      });

      const usuarioActual = JSON.parse(localStorage.getItem("usuario") || "null");
      const consultation = await consultationService.createConsultation(
        {
          ...usuarioActual,
          rol: "paciente",
          password: usuarioActual?.password ?? "",
          createdAt: usuarioActual?.createdAt ?? new Date().toISOString(),
          updatedAt: usuarioActual?.updatedAt ?? new Date().toISOString(),
          email: usuarioActual?.email ?? "",
          id: usuarioActual?.id ?? (crypto.randomUUID() as string),
          nombre: usuarioActual?.nombre ?? "Paciente",
          sintomas,
        },
        nivelTriage,
      );

      if (nivelTriage === "C1" || nivelTriage === "C2") {
        waitingListObserver.notificar(consultation);
      }

      modalService.showError(
        `Consulta creada con prioridad ${nivelTriage}.`,
        "Agendamiento",
      );
    } catch (error) {
      modalService.showError(
        error instanceof Error ? error.message : "No se pudo agendar la hora.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <form class="telealae-card rounded-[40px] bg-[#8B84DD] p-10" onSubmit={handleSubmit}>
          <h3 class="text-center text-white text-3xl mb-8">
            Síntomas Actuales
          </h3>

          <textarea
            value={sintomas}
            onInput={(e) => setSintomas(e.currentTarget.value)}
            placeholder="Describa sus síntomas..."
            class="telealae-input h-32 resize-none rounded-[30px] bg-[#5156CC] p-8 text-xl"
          />

          <input
            type="number"
            value={edad}
            onInput={(e) => setEdad(e.currentTarget.value)}
            placeholder="Edad (opcional)"
            class="telealae-input mt-4 rounded-[30px] bg-[#5156CC] p-4"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            class="telealae-button mt-6 px-6 disabled:opacity-60"
          >
            {isSubmitting ? "Agendando..." : "Agendar hora"}
          </button>
        </form>

      </main>

      {/* Footer */}
      <footer class="bg-[#7D76D8] h-16" />

    </div>
  );
}
    