import { useEffect, useState } from "preact/hooks";
import type { ModalPayload } from "../src/services/ModalService.ts";
import { ModalService } from "../src/services/ModalService.ts";

const modalService = ModalService.getInstance();

export default function Modal() {
  const [payload, setPayload] = useState<ModalPayload | null>(null);

  useEffect(() => {
    const unsubscribe = modalService.subscribe({
      notify(nextPayload) {
        setPayload(nextPayload);
      },
    });

    return () => unsubscribe();
  }, []);

  if (!payload) {
    return null;
  }

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div class="telealae-card w-full max-w-md bg-white p-6 text-telealae-primary">
        <h3 class="mb-3 text-xl font-semibold text-[#211C84]">
          {payload.title ?? "Aviso"}
        </h3>
        <p class="mb-6 text-sm text-gray-700">{payload.message}</p>
        <div class="flex justify-end gap-3">
          {payload.type === "confirm" && (
            <button
              type="button"
              onClick={() => {
                payload.onCancel?.();
                setPayload(null);
              }}
              class="telealae-button-secondary px-4 py-2 text-sm"
            >
              {payload.cancelLabel ?? "Cancelar"}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              payload.onConfirm?.();
              setPayload(null);
            }}
            class="telealae-button px-4 py-2 text-sm"
          >
            {payload.confirmLabel ?? "Aceptar"}
          </button>
        </div>
      </div>
    </div>
  );
}
