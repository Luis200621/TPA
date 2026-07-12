# Roadmap TeleAlae

## 1. Auth & Persistencia [PENDIENTE]

- [ ] Validar escritura absoluta en `data/` con `Deno.cwd()`.
- [ ] Implementar Modal de Error en `Auth.tsx`.
- [ ] Verificar persistencia de `users.json`.

## 2. Portal Paciente [PENDIENTE]

- [ ] Refactor: Mover botones del menú hamburguesa al Dashboard principal.
- [ ] Implementar Modal de 'Ayuda' con número aleatorio.
- [ ] Conectar 'Historial' con `MedicalHistoryRepository`.

## 3. Portal Médico [PENDIENTE]

- [ ] Implementar lógica de selección de paciente (Zoom/Ocultar otros).
- [ ] Programar botones 'Llamar' y 'Generar Receta' (Template Method).
- [ ] Conectar 'Lista de Espera' con Observer.

## 4. Testeo e Integración [PENDIENTE]

- [ ] Pruebas de Triaje (Strategy Pattern).
- [ ] Validación de recetas según normativa chilena.
