import { useEffect, useState } from "preact/hooks";
import { ConsultationService } from "../src/services/ConsultationService.ts";
import { MedicalHistoryService } from "../src/services/MedicalHistoryService.ts";
import { ModalService } from "../src/services/ModalService.ts";
import { PrescriptionService } from "../src/services/PrescriptionService.ts";
import type { Consultation, Medication, UUID } from "../lib/types.ts";
import { PrescriptionTemplate, type PrescriptionType } from "../lib/receta/PrescriptionTemplate.ts";

const consultationService = new ConsultationService();
const medicalHistoryService = new MedicalHistoryService();
const prescriptionService = new PrescriptionService();
const modalService = ModalService.getInstance();

export default function Medico() {
  const [open, setOpen] = useState(false);
  const [usuario, setUsuario] = useState<{ nombre: string } | null>(null);
  const [consultas, setConsultas] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultaId, setSelectedConsultaId] = useState<UUID | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<UUID | null>(null);
  const [tipoReceta, setTipoReceta] = useState<PrescriptionType>("Simple");
  const [medicamentos, setMedicamentos] = useState<Medication[]>([{ nombre: "", dosis: "", frecuencia: "" }]);
  const [indicaciones, setIndicaciones] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUsuario(parsedUser);
    }

    void loadConsultas();
  }, []);

  const loadConsultas = async () => {
    try {
      const data = await consultationService.list();
      setConsultas(data);
    } catch (error) {
      modalService.showError("No se pudo cargar la lista de espera.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (consulta: Consultation, action: "advance" | "finish") => {
    try {
      if (action === "advance") {
        await consultationService.advance(consulta.id);
        modalService.showError("Consulta avanzada correctamente.", "Estado");
      } else {
        await consultationService.finish(consulta.id);
        modalService.showError("Consulta finalizada correctamente.", "Estado");
      }
      await loadConsultas();
    } catch (error) {
      modalService.showError(
        error instanceof Error ? error.message : "No se pudo ejecutar la acción.",
      );
    }
  };

  const canAdvance = (consulta: Consultation) => consulta.estado === "EnEspera";
  const canFinish = (consulta: Consultation) => consulta.estado === "EnAtencion";

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    globalThis.location.href = "/";
  };

  const handleGeneratePrescription = async (e: Event) => {
    e.preventDefault();

    if (!selectedConsultaId) {
      modalService.showError("Selecciona una consulta para generar la receta.");
      return;
    }

    try {
      setIsGenerating(true);
      const consulta = consultas.find((item) => item.id === selectedConsultaId);
      if (!consulta) {
        throw new Error("Consulta no encontrada.");
      }

      const receta = await prescriptionService.generate({
        consultationId: consulta.id,
        doctorId: (usuario?.id as UUID) ?? (crypto.randomUUID() as UUID),
        patientId: consulta.paciente.id,
        medicamentos: medicamentos.filter((med) => med.nombre.trim()),
        indicaciones,
        id: crypto.randomUUID() as UUID,
      });

      await medicalHistoryService.savePrescription(receta);
      modalService.showError(`Receta ${receta.id} generada correctamente.`, "Receta");
    } catch (error) {
      modalService.showError(
        error instanceof Error ? error.message : "No se pudo generar la receta.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div class="min-h-screen relative bg-[#ffffff] text-white">
      {/* HEADER */}
      <header class="bg-[#4d55cc] flex items-center justify-between px-6 py-3">
      
        {/* IZQUIERDA */}
        <div class="flex items-center gap-4">
          <img
            src="/Logo_a_color.png"
            class="w-20 h-20 object-contain"
          />
          <h1 class="text-5xl font-light">TeleAlae</h1>
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
        <div class="absolute right-4 top-20 bg-[#4d55cc] w-52 rounded-2xl p-6 shadow-2xl">
          <button class="block w-full bg-[#39409d] text-white py-3 rounded-full mb-6">
            Opciones
          </button>
          <button class="block w-full bg-[#39409d] text-white py-3 rounded-full mb-6">
            Ayuda
          </button>
          <button
            type="button"
            onClick={handleLogout}
            class="block w-full bg-[#39409d] text-white py-3 rounded-full"
          >
            Cerrar sesión
          </button>
        </div>
      )}

      {/* CONTENIDO */}
      <main class="px-10 py-6">
        {/* TITULO */}
        

        {/* TARJETAS */}
        <div class="flex justify-center gap-20 mb-14">
          <div class="bg-[#4d55cc] w-[220px] rounded-[30px] p-5 text-center">
            <h3 class="text-2xl mb-16">Pacientes Totales</h3>
            <div class="bg-[#39409d] rounded-full py-3">{consultas.length}</div>
          </div>

          <div class="bg-[#4d55cc] w-[220px] rounded-[30px] p-5 text-center">
            <h3 class="text-2xl mb-8">Pacientes Críticos</h3>
            <div class="bg-[#39409d] rounded-full py-3">
              {consultas.filter((c) => c.nivelTriage === "C1" || c.nivelTriage === "C2").length}
            </div>
          </div>

          <div class="bg-[#4d55cc] w-[220px] rounded-[30px] p-5 text-center">
            <h3 class="text-2xl mb-8">Consultas activas</h3>
            <div class="bg-[#39409d] rounded-full py-3">
              {consultas.filter((c) => c.estado !== "Finalizada").length}
            </div>
          </div>
        </div>

        {!selectedPatientId ? (
          <div class="max-w-[1400px] mx-auto mb-10 overflow-hidden rounded-lg">
          {/* TITULO TABLA */}
          <div class="bg-[#4D55CC] text-center py-4 text-3xl">
            Lista De Espera
          </div>

          {/* ENCABEZADOS */}
          <div class="grid grid-cols-6 bg-[#5b64ff] px-6 py-5 text-2xl">
            <div>Nombre Paciente</div>
            <div>Síntomas</div>
            <div>Prioridad</div>
            <div>Tiempo</div>
            <div>Status</div>
            <div>Acción</div>
          </div>

          {loading ? (
            <div class="bg-[#4D55CC] px-6 py-4 text-center">Cargando...</div>
          ) : consultas.length === 0 ? (
            <div class="bg-[#4D55CC] px-6 py-4 text-center">No hay consultas registradas.</div>
          ) : (
            consultas.map((consulta) => (
              <div
                key={consulta.id}
                class="grid grid-cols-6 items-center bg-[#4D55CC] even:bg-[#5b64ff] px-6 py-4"
              >
                <div>{consulta.paciente.nombre}</div>
                <div>{consulta.paciente.sintomas ?? "Sin síntomas"}</div>
                <div>{consulta.nivelTriage}</div>
                <div>{new Date(consulta.horaIngreso).toLocaleTimeString()}</div>
                <div>{consulta.estado}</div>
                <div class="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPatientId(consulta.paciente.id)}
                    class="telealae-button px-3 py-2 text-sm"
                  >
                    Zoom
                  </button>
                  <button
                    type="button"
                    disabled={!canAdvance(consulta)}
                    onClick={() => void handleAction(consulta, "advance")}
                    class="rounded-full bg-[#39409d] px-3 py-2 text-sm disabled:opacity-50"
                  >
                    Avanzar
                  </button>
                  <button
                    type="button"
                    disabled={!canFinish(consulta)}
                    onClick={() => void handleAction(consulta, "finish")}
                    class="rounded-full bg-[#39409d] px-3 py-2 text-sm disabled:opacity-50"
                  >
                    Finalizar
                  </button>
                </div>
              </div>
            ))
          )}
          </div>
        ) : (
          <div class="telealae-card mx-auto mb-10 max-w-[1400px] rounded-[30px] p-8">
            <div class="mb-6 flex items-center justify-between">
              <div>
                <h3 class="text-3xl">Generar receta</h3>
                <p class="text-sm text-[#D9D9FF]">
                  Preparando receta para el paciente seleccionado.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPatientId(null)}
                class="rounded-full bg-[#39409d] px-4 py-2"
              >
                Volver a la lista
              </button>
            </div>

            <form onSubmit={handleGeneratePrescription}>
              <div class="mb-4">
                <label class="mb-2 block">Consulta</label>
                <select
                  value={selectedConsultaId ?? ""}
                  onChange={(e) => setSelectedConsultaId(e.currentTarget.value as UUID)}
                  class="w-full rounded-full bg-[#39409d] px-4 py-3"
                >
                  <option value="">Selecciona una consulta</option>
                  {consultas
                    .filter((consulta) => consulta.paciente.id === selectedPatientId)
                    .map((consulta) => (
                      <option key={consulta.id} value={consulta.id}>
                        {consulta.paciente.nombre} - {consulta.nivelTriage}
                      </option>
                    ))}
                </select>
              </div>

              <div class="mb-4">
                <label class="mb-2 block">Tipo de receta</label>
                <select
                  value={tipoReceta}
                  onChange={(e) => setTipoReceta(e.currentTarget.value as PrescriptionType)}
                  class="w-full rounded-full bg-[#39409d] px-4 py-3"
                >
                  <option value="Simple">Simple</option>
                  <option value="Retenida">Retenida</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              <div class="mb-4">
                <label class="mb-2 block">Medicamento</label>
                <input
                  value={medicamentos[0]?.nombre ?? ""}
                  onInput={(e) => {
                    const value = e.currentTarget.value;
                    setMedicamentos([{ ...medicamentos[0], nombre: value }]);
                  }}
                  class="w-full rounded-full bg-[#39409d] px-4 py-3"
                  placeholder="Nombre del medicamento"
                />
              </div>

              <div class="mb-4 grid gap-4 md:grid-cols-2">
                <input
                  value={medicamentos[0]?.dosis ?? ""}
                  onInput={(e) => {
                    const value = e.currentTarget.value;
                    setMedicamentos([{ ...medicamentos[0], dosis: value }]);
                  }}
                  class="rounded-full bg-[#39409d] px-4 py-3"
                  placeholder="Dosis"
                />
                <input
                  value={medicamentos[0]?.frecuencia ?? ""}
                  onInput={(e) => {
                    const value = e.currentTarget.value;
                    setMedicamentos([{ ...medicamentos[0], frecuencia: value }]);
                  }}
                  class="rounded-full bg-[#39409d] px-4 py-3"
                  placeholder="Frecuencia"
                />
              </div>

              <div class="mb-4">
                <label class="mb-2 block">Indicaciones</label>
                <textarea
                  value={indicaciones}
                  onInput={(e) => setIndicaciones(e.currentTarget.value)}
                  class="min-h-[100px] w-full rounded-[24px] bg-[#39409d] px-4 py-3"
                  placeholder="Indicaciones para el paciente"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                class="rounded-full bg-[#39409d] px-6 py-3 disabled:opacity-60"
              >
                {isGenerating ? "Generando..." : "Generar receta"}
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}