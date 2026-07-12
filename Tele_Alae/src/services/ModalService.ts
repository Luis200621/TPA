export type ModalVariant = "error" | "confirm";

export interface ModalPayload {
  id: string;
  type: ModalVariant;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface ModalObserver {
  notify(payload: ModalPayload | null): void;
}

export class ModalService {
  private static instance: ModalService | null = null;
  private listeners: ModalObserver[] = [];

  private constructor() {}

  public static getInstance(): ModalService {
    if (!ModalService.instance) {
      ModalService.instance = new ModalService();
    }
    return ModalService.instance;
  }

  public subscribe(observer: ModalObserver): () => void {
    this.listeners.push(observer);
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== observer);
    };
  }

  public show(message: string): void {
    this.emit({
      id: crypto.randomUUID(),
      type: "error",
      title: "Aviso",
      message,
      confirmLabel: "Aceptar",
    });
  }

  public showError(message: string, title = "Error"): void {
    this.emit({
      id: crypto.randomUUID(),
      type: "error",
      title,
      message,
      confirmLabel: "Aceptar",
    });
  }

  public showConfirmation(
    message: string,
    options: Omit<ModalPayload, "id" | "type" | "message"> = {},
  ): void {
    this.emit({
      id: crypto.randomUUID(),
      type: "confirm",
      message,
      confirmLabel: "Confirmar",
      cancelLabel: "Cancelar",
      ...options,
    });
  }

  private emit(payload: ModalPayload | null): void {
    for (const observer of this.listeners) {
      observer.notify(payload);
    }
  }
}
