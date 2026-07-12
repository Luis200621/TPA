import { useEffect, useState } from "preact/hooks";
import {
  ModalService,
  type ModalPayload,
} from "../src/services/ModalService.ts";

export default function Modal() {
  const [payload, setPayload] = useState<ModalPayload | null>(null);

  useEffect(() => {
    const service = ModalService.getInstance();
    const unsubscribe = service.subscribe({
      notify(nextPayload) {
        setPayload(nextPayload);
      },
    });

    return () => unsubscribe();
  }, []);

  if (!payload) {
    return null;
  }

  const close = () => setPayload(null);

  const handleConfirm = () => {
    payload.onConfirm?.();
    close();
  };

  const handleCancel = () => {
    payload.onCancel?.();
    close();
  };

  return (
    <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 class="text-xl font-semibold text-[#211c84]">
          {payload.title ?? (payload.type === "confirm" ? "Confirmación" : "Atención")}
        </h3>
        <p class="mt-3 text-gray-700">{payload.message}</p>

        <div class="mt-6 flex justify-end gap-3">
          {payload.type === "confirm" && (
            <button
              type="button"
              onClick={handleCancel}
              class="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700"
            >
              {payload.cancelLabel ?? "Cancelar"}
            </button>
          )}

          <button
            type="button"
            onClick={handleConfirm}
            class="rounded-full bg-[#4d55cc] px-4 py-2 text-sm text-white"
          >
            {payload.confirmLabel ?? "Aceptar"}
          </button>
        </div>
      </div>
    </div>
  );
}
