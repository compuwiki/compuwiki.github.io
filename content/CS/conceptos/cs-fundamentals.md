# Fundamentos de C#

## Tipos de Datos

- **Modificadores**: Controlan visibilidad, accesibilidad y comportamiento de miembros.
    - **De acceso:** `public`, `private`, `protected`, `internal`
    - **De comportamiento:** `virtual`, `abstract`, `override`

- **De Valor:** Almacenan el valor directamente: `int`, `float`, `double`, `decimal`, `char`, `string`, `bool`.
   > [!NOTE] Si el valor no cambia, declarar como `const`

```csharp
int numero = 42;
char letra = 'A';
```

- **Por Referencia:** Almacenan una referencia a la ubicación en memoria: clases, objetos, colecciones, arrays.

```csharp
// Clase y Objeto
public class Persona { public string Nombre { get; set; } public int Edad { get; set; } }
Persona persona1 = new Persona(); persona1.Nombre = "Juan"; persona1.Edad = 25;

// Colección
List<int> numeros = new List<int>();

// Array
int[] numeros = { 1, 2, 3, 4, 5 };
```

- **Constantes del sistema:** `double.NaN`, `Math.PI`, `int.MaxValue`, `string.Empty`, etc.

- **Colecciones:**
    - No genéricas: `ArrayList`, `Hashtable`, `Queue`, `Stack`
    - Genéricas: `List<T>`, `Dictionary<TKey,TValue>`, `Queue<T>`, `Stack<T>`, `HashSet<T>`, `LinkedList<T>`
    - Concurrentes: `ConcurrentDictionary<TKey,TValue>`, `ConcurrentQueue<T>`, `ConcurrentStack<T>`

---

## Operadores

```csharp
int resultado = (5 + 3) * 2;                         // Aritméticos: + - * / %
bool esMayor = (edad > 18) ? true : false;           // Ternario
// Lógicos: == != && || !    Comparación: < > <= >=
```

---

## Estructuras de Control

```csharp
if (edad >= 18) { Console.WriteLine("Mayor de edad"); } else { Console.WriteLine("Menor de edad"); }

switch (opcion) { case 1: Console.WriteLine("Opción 1"); break; default: break; }

while (contador < 10) { Console.WriteLine(contador); contador++; }

do { Console.WriteLine(contador); contador++; } while (contador < 10);

for (int i = 0; i < 5; i++) { Console.WriteLine(i); }

foreach (var elemento in nombres) { Console.WriteLine(elemento); }
```

No estructuradas: `continue`, `break`, `goto`, `return`.

---

## Programación Orientada a Objetos (POO)

### Principios

| Principio | Descripción |
|---|---|
| **Encapsulación** | Ocultar detalles internos; exponer solo la interfaz pública |
| **Herencia** | Una clase hereda atributos y métodos de otra |
| **Polimorfismo** | Objetos distintos responden al mismo mensaje de forma diferente |
| **Abstracción** | Modelar solo las características esenciales del objeto |

### Clase, Objeto y Propiedades

```csharp
public class Coche
{
    public string Marca { get; set; }
    public int Año { get; set; }

    public Coche(string marca, int año) { Marca = marca; Año = año; }

    public void Arrancar() { Console.WriteLine("El coche está arrancando."); }
}

Coche miCoche = new Coche("Toyota", 2022);
miCoche.Arrancar();
```

### Herencia

```csharp
public class CocheDeportivo : Coche
{
    public bool Turbo { get; set; }

    public CocheDeportivo(string marca, int año, bool turbo) : base(marca, año) { Turbo = turbo; }

    public void ActivarTurbo() { Console.WriteLine("¡Turbo activado!"); }
}
```

### Interfaces

```csharp
public interface IReproductorMusical { void Reproducir(); void Pausar(); void Detener(); }

public class ReproductorMP3 : IReproductorMusical
{
    public void Reproducir() { Console.WriteLine("Reproduciendo."); }
    public void Pausar()     { Console.WriteLine("Pausado."); }
    public void Detener()    { Console.WriteLine("Detenido."); }
}
```

---

## Manejo de Código

### Métodos y Funciones

```csharp
public class Calculadora
{
    public int Sumar(int a, int b)       { return a + b; }
    public int Multiplicar(int a, int b) { return a * b; }
}
```

### Delegados y Eventos

```csharp
public delegate void ManejadorEvento();

public class EditorTexto
{
    public event ManejadorEvento GuardarDocumento;
    public void Guardar() { Console.WriteLine("Guardando..."); GuardarDocumento?.Invoke(); }
}

EditorTexto miEditor = new EditorTexto();
miEditor.GuardarDocumento += () => Console.WriteLine("Documento guardado.");
miEditor.Guardar();
```

### Atributos

```csharp
[Serializable]
public class Producto { public string Nombre { get; set; } public double Precio { get; set; } }
```

### Manejo de Excepciones

```csharp
try   { return dividendo / divisor; }
catch (DivideByZeroException ex) { Console.WriteLine($"Error: {ex.Message}"); return double.NaN; }
finally { Console.WriteLine("Operación completa."); }
```

---

## Características Avanzadas

### LINQ

```csharp
var numeros = new List<int> { 1, 2, 3, 4, 5 };
var pares = from n in numeros where n % 2 == 0 select n;
```

### Expresiones Lambda

```csharp
Func<int, int, int> suma = (a, b) => a + b;
```

### Programación Asíncrona

`async` / `await` para operaciones no bloqueantes.

---

## Namespaces y Clases del Sistema

```cs
System
    Console: WriteLine, Write, Read, ReadLine, Clear
    Math: Abs, Ceiling, Floor, Max, Min, Pow, Round, Sqrt
    Random: Next, NextBytes, NextDouble
    String: Contains, IndexOf, StartsWith, EndsWith, ToUpper, ToLower, Trim, Substring, Split, Replace

System.Collections.Generic
    List<T>: Add, AddRange, Remove, Find, Sort, Contains, ForEach
    Dictionary<TKey,TValue>: Add, Remove, ContainsKey, TryGetValue
    HashSet<T>: Add, Remove, Contains, UnionWith, IntersectWith

System.IO
    File: Exists, Copy, Move, Delete, ReadAllText, WriteAllText
    StreamReader: ReadLine, ReadToEnd, Close
    StreamWriter: Write, WriteLine, Close
    FileStream: Read, Write, Seek, Flush, Close

System.Net.Http
    HttpClient: GetAsync, PostAsync, GetStringAsync
```

## Palabras Clave Reservadas

```txt
abstract as async await base bool break case catch checked continue default delegate
else event explicit false finally fixed for foreach from get if implicit in int
interface internal is join lock namespace new null operator out override partial
private protected public ref return sealed select set static string switch throw
true try typeof using virtual void when where while yield
```

## Referencias

- [.NET API — Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/api/?view=net-8.0)
- [Tipos en C# — Microsoft](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/)
