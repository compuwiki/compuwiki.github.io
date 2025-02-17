# Getters - Setters

En C#, aparte de la forma tradicional de definir los getters y setters como en tu ejemplo, existen otras formas de implementar propiedades con un estilo más compacto y expresivo. Algunas de estas son:

1. **Propiedades Auto-implementadas**:
   - En este caso, el compilador genera automáticamente el campo de respaldo para la propiedad.
   - Se utilizan cuando no se necesitan lógicas personalizadas en los getters y setters.
   
   ```csharp
   private decimal Peso { get; set; }
   ```

2. **Miembros con Expresión de Cuerpo**:
   - Esta sintaxis permite definir tanto los métodos como las propiedades utilizando expresiones de función flecha.
   - Es útil para propiedades simples que requieren una lógica mínima.
   
   ```csharp
   private decimal Peso
   {
       get => _peso;
       set => _peso = value < 0 ? throw new Exception() : value;
   }
   ```

3. **Propiedades con un Campo de Respaldo**:
   - Similar a tu ejemplo, pero sin validación adicional.
   - Se utiliza cuando se necesita alguna lógica en los getters y setters, pero no es suficiente para justificar una expresión de función flecha o cuando la lógica es más compleja.

   ```csharp
   private decimal _peso;

   public decimal Peso
   {
       get { return _peso; }
       set { _peso = value; }
   }
   ```

4. **Propiedades de Sólo Lectura**:
   - Son propiedades que solo tienen un getter y no tienen un setter.
   - Útiles cuando se necesita una propiedad que solo se puede establecer en el constructor o en la inicialización.
   
   ```csharp
   public decimal Peso { get; }
   ```

Cada uno de estos enfoques tiene sus casos de uso específicos y puede ayudar a escribir un código más limpio y legible.