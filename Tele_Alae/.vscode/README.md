# .vscode/

Esta carpeta contiene configuraciones opcionales para Visual Studio Code que facilitan el desarrollo del proyecto.

Los archivos que normalmente pueden aparecer aquí son:

- `settings.json`: ajustes recomendados del editor (p. ej. formato, linters, paths).
- `launch.json`: configuraciones de depuración.
- `extensions.json`: recomendaciones de extensiones útiles para el equipo.

Notas importantes

- Esta carpeta es **opcional**: no es necesaria para ejecutar la aplicación.
- Las configuraciones aquí pueden ser personales; si prefieres mantenerlas privadas, añade `/.vscode` a `.gitignore`.
- Si se incluyen en el repo, procuren que sean configuraciones que beneficien a todo el equipo (no información personal).

Recomendación de uso

- Mantener aquí ajustes que estandarizan el flujo de trabajo (formatters, linting, tareas).
- Evitar poner credenciales o rutas locales absolutas en estos archivos.
