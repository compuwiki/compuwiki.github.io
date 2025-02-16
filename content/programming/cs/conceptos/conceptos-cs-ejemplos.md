# Conceptos de C\#

## **Fundamentos del Lenguaje:**

### Tipos de Datos

- **De Valor:** Tipos de datos que almacenan directamente su valor, como "numérico" (`int`, `float`, `double`, `decimal`), `char`, `string`, `bool`.
   > [!NOTE] Si el valor de una variable no cambia declarar como constante: `const`

```csharp
int numero = 42;
char letra = 'A';
```

- **Por Referencia:** Tipos de datos que almacenan referencias a ubicaciones de memoria, como `clases`, `objetos`, `colecciones` y `arrays`.

```csharp
// Clase: define un conjunto de propiedades, métodos y eventos. Plantilla para la creación de objetos

public class Persona
{
	public string Nombre { get; set; }
    public int Edad { get; set; }
}

// Objeto: instancia de una clase. Se crea a partir de la plantilla definida por la clase. Tiene un estado (propiedades) y puede realizar acciones (métodos).
Persona persona1 = new Persona();
persona1.Nombre = "Juan";
persona1.Edad = 25;

// Colección: estructura de datos que permite almacenar y manipular grupos de elementos. Ejemplos en C#: `List`, `Dictionary` y `Queue`.
List<int> numeros = new List<int>();

// Array: estructura de datos que permite almacenar elementos del mismo tipo en una secuencia contigua de memoria. Los elementos se acceden mediante un índice.
int[] numeros = { 1, 2, 3, 4, 5 };
```

**3. Operadores:** Operadores aritméticos, lógicos, de comparación, etc.

```csharp
int resultado = (5 + 3) * 2; // Operador aritmético
bool esMayor = (edad > 18) ? true : false; // Operador ternario
```

**4. Estructuras de Control de Flujo:** if-else, switch, while, for, foreach

```csharp
if (edad >= 18)
{
    Console.WriteLine("Eres mayor de edad");
}
else
{
    Console.WriteLine("Eres menor de edad");
}

switch (opcion)
{
    case 1:
        Console.WriteLine("Opción 1 seleccionada");
        break;
    case 2:
        Console.WriteLine("Opción 2 seleccionada");
        break;
    default:
        Console.WriteLine("Opción no reconocida");
        break;
}

while (contador < 10)
{
    Console.WriteLine(contador);
    contador++;
}

do
{
    Console.WriteLine(contador);
    contador++;
}
while (contador < 10);

for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
}

foreach (var elemento in nombres)
{
    Console.WriteLine(elemento);
}
```


## **Programación Orientada a Objetos (POO):**

**5. Propiedades y Métodos de Clase:** Acciones y atributos asociados a clases.

```csharp
public class Coche
{
    // Propiedades
    public string Marca { get; set; }
    public int Año { get; set; }

    // Constructor
    public Coche(string marca, int año)
    {
        Marca = marca;
        Año = año;
    }

    // Método
    public void Arrancar()
    {
        Console.WriteLine("El coche está arrancando.");
    }
}

// Uso de la clase y sus propiedades/métodos
Coche miCoche = new Coche("Toyota", 2022);
miCoche.Arrancar();
```

**6. Herencia:** Permite crear una nueva clase basada en una existente.

```csharp
public class CocheDeportivo : Coche
{
    // Nuevas propiedades específicas del coche deportivo
    public bool Turbo { get; set; }

    // Constructor que utiliza el constructor de la clase base (Coche)
    public CocheDeportivo(string marca, int año, bool turbo)
        : base(marca, año)
    {
        Turbo = turbo;
    }

    // Nuevo método específico del coche deportivo
    public void ActivarTurbo()
    {
        Console.WriteLine("¡Turbo activado!");
    }
}

// Uso de la clase derivada (CocheDeportivo)
CocheDeportivo miCocheDeportivo = new CocheDeportivo("Ferrari", 2023, true);
miCocheDeportivo.Arrancar();
miCocheDeportivo.ActivarTurbo();
```

**7. Interfaces:** Conjunto de métodos que una clase debe implementar.

```csharp
public interface IReproductorMusical
{
    void Reproducir();
    void Pausar();
    void Detener();
}

public class ReproductorMP3 : IReproductorMusical
{
    // Implementación de los métodos de la interfaz
    public void Reproducir()
    {
        Console.WriteLine("Reproduciendo la canción.");
    }

    public void Pausar()
    {
        Console.WriteLine("Pausando la reproducción.");
    }

    public void Detener()
    {
        Console.WriteLine("Deteniendo la reproducción.");
    }
}

// Uso de la interfaz y la clase que la implementa
ReproductorMP3 miReproductor = new ReproductorMP3();
miReproductor.Reproducir();
```


## **Manejo de Código:**

**8. Métodos y Funciones:** Definir y llamar funciones para organizar el código.

```csharp
public class Calculadora
{
    // Método que suma dos números
    public int Sumar(int a, int b)
    {
        return a + b;
    }

    // Método que multiplica dos números
    public int Multiplicar(int a, int b)
    {
        return a * b;
    }
}

// Uso de la clase y sus métodos
Calculadora miCalculadora = new Calculadora();
int resultadoSuma = miCalculadora.Sumar(5, 3);
int resultadoMultiplicacion = miCalculadora.Multiplicar(4, 6);
```

**9. Delegados y Eventos:** Facilitan la comunicación entre objetos.

```csharp
// Delegado que representa el formato de un manejador de eventos
public delegate void ManejadorEvento();

public class EditorTexto
{
    // Evento que se activa cuando se guarda el documento
    public event ManejadorEvento GuardarDocumento;

    // Método que simula la acción de guardar
    public void Guardar()
    {
        Console.WriteLine("Guardando el documento...");
        // Se activa el evento al guardar
        GuardarDocumento?.Invoke();
    }
}

// Uso de la clase y el evento
EditorTexto miEditor = new EditorTexto();
miEditor.GuardarDocumento += () => Console.WriteLine("Evento: Documento guardado con éxito.");
miEditor.Guardar();
```

**10. Atributos:** Proporcionan metadatos adicionales a tiempo de compilación.

```csharp
[Serializable]
public class Producto
{
    public string Nombre { get; set; }
    public double Precio { get; set; }
}

// Uso de atributos en una clase
Producto miProducto = new Producto();
```

**11. Manejo de Excepciones:** `try, catch, finally` para manejar errores.

```csharp
public class Division
{
    // Método que realiza una división
    public double Dividir(int dividendo, int divisor)
    {
        try
        {
            return dividendo / divisor;
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            return double.NaN; // Valor que representa "Not a Number"
        }
        finally
        {
            Console.WriteLine("Operación de división completa.");
        }
    }
}

// Uso de la clase y manejo de excepciones
Division miDivision = new Division();
double resultadoDivision = miDivision.Dividir(10, 0);
```

## **Características Avanzadas:**

**13. LINQ (Language Integrated Query):**

Consultas en colecciones de datos.

```csharp
var numeros = new List<int> { 1, 2, 3, 4, 5 };

// Consulta LINQ para obtener los números pares
var numerosPares = from num in numeros where num % 2 == 0 select num;
```

**14. Expresiones Lambda:** Forma concisa de escribir funciones anónimas.

```csharp
// Función lambda que suma dos números
Func<int, int, int> suma = (a, b) => a + b;

// Uso de la función lambda
int resultado = suma(3, 4);
```

**15. Programación Asíncrona:** `Async` y `Await` para escribir código asincrónico.

```csharp
public async Task<string> ObtenerDatosAsync()
{
    // Simulación de una operación asincrónica
    await Task.Delay(2000);

    return "Datos obtenidos con éxito";
}

// Uso de la programación asíncrona
var resultadoAsync = await ObtenerDatosAsync();
```

## Palabras clave en C\#

```txt
abstract as ascending async await base bool break by case catch checked continue default delegate delete descending else equals event explicit false finally fixed for foreach from get group if implicit in int interface internal into is join let lock nameof namespace new null on operator orderby out override partial private protected public ref return sealed select set sizeof stackalloc static string switch throw true try typeof unchecked unsafe using virtual void when where while yield
```


- base: es el nombre de la clase que hereda
- this: utiliza el nombre para un propiedad de la clase