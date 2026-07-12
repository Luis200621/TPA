import { useEffect, useState } from "preact/hooks";
import type { Consultation, Prescription, UUID } from "../lib/types.ts";
import { ConsultationService } from "../src/services/ConsultationService.ts";
import { MedicalHistoryService } from "../src/services/MedicalHistoryService.ts";
import { ModalService } from "../src/services/ModalService.ts";

const modalService = ModalService.getInstance();
const consultationService = new ConsultationService();
const medicalHistoryService = new MedicalHistoryService();

type ActivePatientView = "Historial" | "Agendar" | "Sala de Espera";

export default function Paciente() {
  const [open, setOpen] = useState(false);
  const [activeView, setActiveView] = useState<ActivePatientView>("Historial");
  const [usuario, setUsuario] = useState<{ id?: UUID; nombre?: string } | null>(null);
  const [historial, setHistorial] = useState<Prescription[]>([]);
  const [consultas, setConsultas] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!usuario?.id) {
      return;
    }

    void loadViewData();
  }, [activeView, usuario?.id]);

  const loadViewData = async () => {
    if (!usuario?.id) {
      return;
    }

    setLoading(true);
    try {
      switch (activeView) {
        case "Historial": {
          const recetas = await medicalHistoryService.getPrescriptionsByPatient(usuario.id);
          setHistorial(recetas);
          break;
        }
        case "Agendar": {
          const todas = await consultationService.list();
          setConsultas(todas.filter((consulta) => consulta.paciente.id === usuario.id));
          break;
        }
        case "Sala de Espera": {
          const esperas = await consultationService.getWaitingConsultations();
          setConsultas(esperas.filter((consulta) => consulta.paciente.id === usuario.id));
          break;
        }
      }
    } catch (error) {
      modalService.showError(
        error instanceof Error ? error.message : "No se pudo cargar la vista solicitada.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    globalThis.location.href = "/";
  };

  const handleMenuAction = (action: string) => {
    modalService.showError(`Acción ${action} aún no implementada.`, "Información");
  };

  const handleViewSelection = (view: ActivePatientView) => {
    setActiveView(view);
    setOpen(false);
  };

  return (
    <div class="min-h-screen bg-[#ffffff] flex flex-col">

      {/* HEADER */}
      <header class="bg-[#4d55cc] flex items-center justify-between px-6 py-3">

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
        <div class="absolute right-4 top-20 bg-[#4d55cc] w-60 rounded-2xl p-6 shadow-2xl z-50">
          <button
            type="button"
            onClick={() => handleViewSelection("Historial")}
            class="block w-full bg-[#39409d] text-white py-3 rounded-full mb-3 hover:bg-[#3b42b0] transition"
          >
            Historial
          </button>

          <button
            type="button"
            onClick={() => handleViewSelection("Agendar")}
            class="block w-full bg-[#39409d] text-white py-3 rounded-full mb-3 hover:bg-[#3b42b0] transition"
          >
            Agendar
          </button>

          <button
            type="button"
            onClick={() => handleViewSelection("Sala de Espera")}
            class="block w-full bg-[#39409d] text-white py-3 rounded-full mb-3 hover:bg-[#3b42b0] transition"
          >
            Sala de Espera
          </button>

          <button
            type="button"
            onClick={() => handleMenuAction("Opciones")}
            class="block w-full bg-[#39409d] text-white py-3 rounded-full mb-3 hover:bg-[#3b42b0] transition"
          >
            Opciones
          </button>

          <button
            type="button"
            onClick={() => handleMenuAction("Ayuda")}
            class="block w-full bg-[#39409d] text-white py-3 rounded-full mb-3 hover:bg-[#3b42b0] transition"
          >
            Ayuda
          </button>

          <button
            type="button"
            onClick={handleLogout}
            class="block w-full bg-[#39409d] text-white py-3 rounded-full hover:bg-[#3b42b0] transition"
          >
            Cerrar sesión
          </button>
        </div>
      )}

      {/* CONTENIDO */}
      <main class="flex-1 px-10 py-10">
        <div class="mb-8 flex flex-wrap justify-center gap-3">
          {(["Historial", "Agendar", "Sala de Espera"] as ActivePatientView[]).map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => handleViewSelection(view)}
              class={`rounded-full px-5 py-2 text-lg ${activeView === view ? "bg-telealae-interactive text-white" : "bg-[#e7e7ff] text-telealae-primary"}`}
            >
              {view}
            </button>
          ))}
        </div>

        {loading ? (
          <div class="rounded-[24px] bg-[#4d55cc] p-6 text-center text-white">Cargando...</div>
        ) : activeView === "Historial" ? (
          <div class="rounded-[24px] bg-[#4d55cc] p-6 text-white">
            <h3 class="mb-4 text-2xl">Historial de recetas</h3>
            {historial.length === 0 ? (
              <p>No hay recetas registradas para este paciente.</p>
            ) : (
              <ul class="space-y-3">
                {historial.map((receta) => (
                  <li key={receta.id} class="rounded-2xl bg-[#39409d] p-4">
                    <p class="font-semibold">{receta.id}</p>
                    <p class="text-sm text-[#D9D9FF]">Medicamentos: {receta.medicamentos.length}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : activeView === "Agendar" ? (
          <div class="rounded-[24px] bg-[#4d55cc] p-6 text-white">
            <h3 class="mb-4 text-2xl">Citas agendadas</h3>
            {consultas.length === 0 ? (
              <p>No hay citas agendadas para este paciente.</p>
            ) : (
              <ul class="space-y-3">
                {consultas.map((consulta) => (
                  <li key={consulta.id} class="rounded-2xl bg-[#39409d] p-4">
                    <p class="font-semibold">{consulta.estado}</p>
                    <p class="text-sm text-[#D9D9FF]">{consulta.nivelTriage} · {new Date(consulta.horaIngreso).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div class="rounded-[24px] bg-[#4d55cc] p-6 text-white">
            <h3 class="mb-4 text-2xl">Sala de espera</h3>
            {consultas.length === 0 ? (
              <p>No hay consultas en espera para este paciente.</p>
            ) : (
              <ul class="space-y-3">
                {consultas.map((consulta) => (
                  <li key={consulta.id} class="rounded-2xl bg-[#39409d] p-4">
                    <p class="font-semibold">{consulta.estado}</p>
                    <p class="text-sm text-[#D9D9FF]">{consulta.nivelTriage} · {consulta.paciente.nombre}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer class="h-[50px] bg-[#4d55cc]" />

    </div>
  );
}