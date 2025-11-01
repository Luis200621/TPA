import inspect

class Vehiculo:
    """
    Clase base para representar un vehículo.
    """
    
    # Atributo de clase (para todos los vehículos)
    TIPO_GENERAL = "Motorizado"

    def __init__(self, 
                 marca: str = "desconocido",
                 modelo: str = "desconocido",
                 año: int = 0,
                 disponible: bool = True,
                 valor: int = 0
                 ) -> None:
        
        # Uso de los mutadores (setters) para aplicar la validación y la encapsulación
        self.marca = marca      # Usa @marca.setter
        self.modelo = modelo    # Usa @modelo.setter
        self.año = año          # Usa @año.setter
        self.disponible = disponible # Usa @disponible.setter (atributo privado __disponible)
        self.valor = valor      # Usa @valor.setter

    # --------------------------------------------------
    # Propiedades (Accesores y Mutadores - Getters y Setters) con @property
    # Implementa Encapsulación.
    # --------------------------------------------------

    @property
    def marca(self) -> str:
        """Accesador (Getter) para la marca."""
        return self.__marca
    
    @marca.setter
    def marca(self, nueva_marca: str):
        """Mutador (Setter) para la marca con validación."""
        assert isinstance(nueva_marca, str), "El valor de la marca debe ser una cadena de texto (string)."
        self.__marca = nueva_marca

    @property
    def modelo(self) -> str:
        """Accesador (Getter) para el modelo."""
        return self.__modelo
    
    @modelo.setter
    def modelo(self, nuevo_modelo: str):
        """Mutador (Setter) para el modelo con validación."""
        assert isinstance(nuevo_modelo, str), "El valor del modelo debe ser una cadena de texto (string)."
        self.__modelo = nuevo_modelo
    
    @property
    def año(self) -> int:
        """Accesador (Getter) para el año."""
        return self.__año
    
    @año.setter
    def año(self, nuevo_año: int):
        """Mutador (Setter) para el año con validación."""
        # Se asegura que sea int y no bool (pues bool es subclase de int)
        assert isinstance(nuevo_año, int) and not isinstance(nuevo_año, bool), "El año debe ser un número entero válido."
        assert 1900 <= nuevo_año <= 2025, "El año debe estar entre 1900 y 2100 (ajustar según necesidad)."
        self.__año = nuevo_año

    @property
    def valor(self) -> int:
        """Accesador (Getter) para el valor."""
        return self.__valor
    
    @valor.setter
    def valor(self, nuevo_valor: int):
        """Mutador (Setter) para el valor con validación."""
        assert isinstance(nuevo_valor, int) and not isinstance(nuevo_valor, bool), "El valor debe ser un número entero válido."
        assert nuevo_valor >= 0, "El valor del vehículo no puede ser negativo."
        self.__valor = nuevo_valor

    @property
    def disponible(self) -> bool:
        """Accesador (Getter) para la disponibilidad (visibilidad)."""
        return self.__disponible
    
    @disponible.setter
    def disponible(self, estado: bool):
        """Mutador (Setter) para la disponibilidad (visibilidad)."""
        assert isinstance(estado, bool), "El estado de disponibilidad debe ser booleano (True/False)."
        self.__disponible = estado
    
    # --------------------------------------------------
    # Métodos Estáticos y de Instancia
    # --------------------------------------------------

    @staticmethod
    def es_vehiculo_reciente(año_vehiculo: int) -> bool:
        """Método estático para determinar si un vehículo es reciente (últimos 5 años)."""
        año_actual = 2025 # Se puede usar datetime.now().year, pero se fija para el ejemplo
        return año_actual - año_vehiculo <= 5

    def cambiar_disponibilidad(self):
        """Cambia el estado de disponibilidad del vehículo (Mutador)."""
        if self.disponible: # Usa el getter
            self.disponible = False # Usa el setter
            # print(f"El vehículo {self.marca} {self.modelo} ha cambiado su estado a vendido.")
        else:
            print(f"Advertencia: El vehículo {self.marca} {self.modelo} ya estaba vendido.")

    def mostrar_estado(self):
        """Muestra el estado de disponibilidad en formato legible."""
        return "sí está disponible" if self.disponible else "no está disponible"
    
    # --------------------------------------------------
    # Métodos Mágicos
    # --------------------------------------------------

    def __str__(self) -> str:
        """Método mágico para representación de cadena (para print)."""
        # Se usa el getter 'disponible' en el método 'mostrar_estado'
        return f"[{self.TIPO_GENERAL}] {self.marca} {self.modelo} ({self.año}), Valor: ${self.valor:,.0f}. Estado: {self.mostrar_estado()}."

    def __del__(self):
        """Método mágico Finalizador: Se ejecuta al destruir el objeto."""
        # Se comenta para evitar spam, pero demuestra su uso
        # print(f"Finalizador: Objeto Vehiculo {self.marca} {self.modelo} destruido.")
        pass

# --------------------------------------------------------------------------------------
## Clase Concesionaria
# --------------------------------------------------------------------------------------

class Concesionaria:
    """
    Clase que gestiona un inventario de vehículos.
    Mantiene la lógica de negocio y usa la abstracción de Vehiculo.
    """

    def __init__(self, nombre: str = "desconocido") -> None:
        assert isinstance(nombre, str), "El nombre de la concesionaria debe ser una cadena de texto."
        self.nombre = nombre
        self.__vehiculos_disponibles = [] # Inventario privado (Encapsulación)

    # Accesador para el inventario (Getter)
    @property
    def vehiculos_disponibles(self) -> list[Vehiculo]:
        """Retorna la lista de vehículos disponibles (Inventario)."""
        return self.__vehiculos_disponibles

    def agregar_vehiculo(self, auto: Vehiculo):
        """Agrega un objeto Vehiculo al inventario."""
        assert isinstance(auto, Vehiculo), "Solo se pueden agregar objetos de tipo Vehiculo."
        # Se agrega solo si el vehículo está marcado como disponible
        if auto.disponible:
             self.__vehiculos_disponibles.append(auto)
             print(f"✅ Agregado: {auto.marca} {auto.modelo}.")
        else:
            print(f"❌ Error al agregar: {auto.marca} {auto.modelo} está marcado como no disponible.")

    def mostrar_vehiculos_concesionaria(self):
        """Muestra el inventario completo de la concesionaria."""
        if not self.vehiculos_disponibles:
            print(f"\n--- Inventario de {self.nombre} ---\n¡No hay vehículos disponibles! 😔")
        else:
            print(f"\n--- Inventario de {self.nombre} ({len(self.vehiculos_disponibles)} vehículos) ---")
            for vehiculo in self.vehiculos_disponibles:
                # Usa el método mágico __str__ de Vehiculo
                print(vehiculo) 
            print("----------------------------------------------------------")

    def vender_vehiculo(self, auto: Vehiculo):
        """Simula la venta de un vehículo: lo marca como vendido y lo elimina del inventario."""
        assert isinstance(auto, Vehiculo), "Solo se pueden vender objetos de tipo Vehiculo."
        
        if not auto.disponible:
            return f"🚫 El vehículo {auto.marca} {auto.modelo} ya fue vendido previamente."
        
        try:
            # 1. Eliminar el objeto de la lista de inventario (si existe)
            self.__vehiculos_disponibles.remove(auto) 
            # 2. Marcar como no disponible (se hace *después* de la remoción para dejar constancia del estado)
            auto.cambiar_disponibilidad()
            # 3. Muestra el uso del método estático en la respuesta de la venta
            reciente = " (Modelo Reciente)" if Vehiculo.es_vehiculo_reciente(auto.año) else ""
            return f"🎉 ¡Vendido! {auto.marca} {auto.modelo}{reciente} eliminado del inventario de {self.nombre}."

        except ValueError:
            # Si el objeto no está en la lista (raro si 'auto.disponible' es True)
            return f"❌ Error: El vehículo {auto.marca} {auto.modelo} no se encuentra en el inventario de {self.nombre}."


# --------------------------------------------------------------------------------------
## Ejemplo de Uso
# --------------------------------------------------------------------------------------
print("\n=== INICIO DE LA SIMULACIÓN ===")

try:
    # 1. Crear concesionaria
    concesionaria = Concesionaria("AutoSur Premium")
    
    # 2. Crear vehículos
    # Reciente (2025 - 2022 <= 5)
    auto1 = Vehiculo("Toyota", "Corolla", 2022, True, 20_000_000) 
    # No Reciente (2025 - 2019 > 5)
    auto2 = Vehiculo("Honda", "Civic", 2019, True, 15_000_000) 
    auto3 = Vehiculo("Ford", "Focus", 2023, True, 18_500_000)
    
    # 3. Agregar vehículos (automáticamente usa el setter de la clase Vehiculo para validar)
    print("\n--- Agregando Vehículos ---")
    concesionaria.agregar_vehiculo(auto1)
    concesionaria.agregar_vehiculo(auto2)
    concesionaria.agregar_vehiculo(auto3)
    
    # 4. Mostrar inventario inicial
    concesionaria.mostrar_vehiculos_concesionaria()
    
    # 5. Simular una venta (cambia la disponibilidad y elimina de la lista)
    print("\n--- Simulación de Venta de Auto 1 (Reciente) ---")
    resultado_venta1 = concesionaria.vender_vehiculo(auto1)
    print(resultado_venta1)

    # 6. Simular otra venta
    print("\n--- Simulación de Venta de Auto 2 (No Reciente) ---")
    resultado_venta2 = concesionaria.vender_vehiculo(auto2)
    print(resultado_venta2)
    
    # 7. Mostrar inventario final: Solo debería quedar auto3
    concesionaria.mostrar_vehiculos_concesionaria()
    
    # 8. Intento de re-vender un vehículo ya vendido
    print("\n--- Intento de re-vender Auto 1 ---")
    resultado_reventa = concesionaria.vender_vehiculo(auto1)
    print(resultado_reventa)

    # 9. Ejemplo de acceso (usando getters)
    print(f"\nEstado de disponibilidad de Auto 3 (antes de venderlo): {'Disponible' if auto3.disponible else 'Vendido'}")
    print(f"Marca de Auto 3 (usando getter @property): {auto3.marca}")
    
    # 10. Ejemplo de validación (uso de asserts en setters)
    print("\n--- Ejemplo de Error de Asersión (Intentando cambiar el año a string) ---")
    # auto3.año = "dos mil diez" # Descomentar para ver el AssertionError

except AssertionError as e:
    # Captura las validaciones fallidas de los asserts
    print(f"\n🚨 Error de Asersión (Validación fallida): {e}")

# Al finalizar, los objetos vendidos (auto1, auto2) pueden ser destruidos, 
# invocando el método __del__ si el recolector de basura lo ejecuta inmediatamente.
print("\n=== FIN DE LA SIMULACIÓN ===")