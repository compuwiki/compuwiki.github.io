# Fundamentos Básicos de Programación en C#

## Tipos de Datos

0. **Modificador**: Se utilizan para controlar la visibilidad, accesibilidad y comportamiento de los miembros (campos, métodos, propiedades, etc.) en clases y estructuras.
    - **Modificador de acceso**: Controla quién puede acceder y modificar los miembros de una clase o estructura.
        - Ejemplos: `public`, `private`, `protected`, `internal`
    - **Modificador de comportamiento (herencia y polimorfismo)**: Afectan cómo los miembros interactúan en relación con la herencia y la implementación de métodos en clases derivadas.
        - Ejemplos: `virtual`, `abstract`, `override`

1. **Clase:** Es un tipo de dato que define un conjunto de propiedades, métodos y eventos. Sirve como plantilla para la creación de objetos, determinando la estructura y el comportamiento de las instancias.
   - Ejemplos: `Object`, `String`, `Console`, `Math`, `DateTime`, `FileStream`, `HttpClient`, `SqlConnection`, `StreamWriter`, `StreamReader`, `XmlDocument`, `XmlReader`, `XmlWriter`

2. **Objeto:** Es una instancia de una clase. Creado a partir de la plantilla definida por la clase, representa una entidad del mundo real en el software. Un objeto tiene un estado (determinado por sus propiedades) y puede realizar acciones (determinadas por sus métodos).

3. **Tipos de Datos en Memoria:**
   - **Variables:**
     1. De Valor: Almacenan valores directamente, como tipos numéricos (`int, float, double, decimal`), `char`, `string`, `bool`.
     2. Por Referencia: Almacenan una referencia a la ubicación de los datos en lugar de los datos reales. Incluye clases, delegados, objetos y arrays.
     3. Colección o Lista: Estructura de datos que permite almacenar y manipular un conjunto de elementos.
		- No genéricas: ArrayList, Hashtable, Queue, Stack
		- Genéricas: List<T>, Dictionary<TKey, TValue>, Queue<T>, Stack<T>, HashSet<T>, LinkedList<T>
		- Colecciones Concurrentes: ConcurrentDictionary<TKey, TValue>, ConcurrentQueue<T>, ConcurrentStack<T>, BlockingCollection<T>.

   - **Constantes:** Valores que no cambian durante la ejecución del programa. Ejemplos incluyen `double.NegativeInfinity`, `double.PositiveInfinity`, `double.NaN`, `Math.PI`, `int.MaxValue`, `int.MinValue`, `double.Epsilon`, `char.MaxValue`, `char.MinValue`, `string.Empty`.

4. **Operadores:**
   - **Aritméticos:** `+, -, *, /, %`
   - **Lógicos:** `==, !=, &&, ||, !`
   - **De Comparación:** `==, !=, <, >, <=, >=`

5. **Estructuras de Control de Flujo:** Mecanismos que dirigen el flujo de ejecución del programa, como `if, else, switch, while, do while, for, foreach`.  O de forma no estructurada: `continue`, `break`, `goto`, `return`.

6. **Programación Orientada a Objetos (POO):**
La Programación Orientada a Objetos (POO) se basa en cuatro conceptos fundamentales que trabajan en conjunto para crear sistemas de software modulares, flexibles y fáciles de mantener:

   1. **Encapsulación**: Este principio consiste en ocultar los detalles internos de implementación de un objeto y exponer solo las operaciones permitidas. Se logra definiendo los miembros de una clase con diferentes niveles de visibilidad. Las formas de encapsulación incluyen propiedades y métodos de clase, propiedades y métodos privados, propiedades auto-implementadas, miembros con expresión de cuerpo, propiedades con un campo de respaldo y propiedades de solo lectura.

   2. **Herencia**: Permite que una clase herede los atributos y métodos de otra clase, promoviendo así la reutilización del código y la creación de jerarquías de clases. Por ejemplo, una clase `Animal` puede tener subclases como `Perro` y `Gato`, heredando atributos y comportamientos comunes de la clase `Animal`.

   3. **Polimorfismo**: Este concepto permite que objetos de diferentes clases respondan al mismo mensaje de manera diferente. Se puede lograr mediante sobrecarga de métodos, que implica definir múltiples métodos con el mismo nombre pero diferentes parámetros, y sobrescritura de métodos, que permite a las subclases proporcionar su propia implementación de un método heredado. El polimorfismo promueve la reutilización del código y facilita la extensibilidad del sistema.

   4. **Abstracción**: Es el proceso de identificar las características esenciales de un objeto y omitir los detalles irrelevantes. Permite modelar objetos del mundo real como clases con atributos y métodos que representan las características y comportamientos importantes, respectivamente. Por ejemplo, en un sistema de gestión de bibliotecas, podríamos tener una clase `Libro` con atributos como `título`, `autor` y `año de publicación`, abstrayendo los detalles específicos de cada libro individual.

Además de estos cuatro conceptos, también existen las interfaces, que son conjuntos de métodos que una clase debe implementar, especificando un contrato que las clases deben seguir, pero sin contener ninguna implementación real de esos métodos. Por ejemplo, una interfaz `IVolador` podría tener un método `volar()`, que sería implementado por clases como `Ave` y `Avión`.


7. **Manejo de Código:**
   - Métodos y Funciones: Definición y llamado de funciones para organizar el código.
   - Delegados y Eventos: Facilitan la comunicación entre objetos.
   - Atributos: Proporcionan metadatos adicionales en tiempo de compilación.
   - Manejo de Excepciones: `try, catch, finally` para gestionar errores.

8. **Características Avanzadas:**
   - LINQ (Language Integrated Query): Consultas en colecciones de datos.
   - Expresiones Lambda: Forma concisa de escribir funciones anónimas.
   - Programación Asíncrona: Uso de `Async` y `Await` para escribir código asincrónico.


## Métodos y clases del espacio de nombres System

`Class: method`

```cs
System
	System.Array
	System.Convert
	System.Console: WriteLine, Write, Read, ReadLine, Clear
	System.Math
	System.Exception
	System.Enum
	System.Object
	System.String
	System.Nullable
	System.Tuple
	System.Math: Abs, Ceiling, Floor, Max, Min, Pow, Round, Sign, Sqrt
	System.Random: Next, NextBytes, NextDouble

System.Collections
	System.Collections.Generic.Dictionary<TKey, TValue>: Add, Clear, ContainsKey, ContainsValue, Remove, TryGetValue
	System.Collections.Generic.HashSet<T>: Add, Clear, Contains, ExceptWith, IntersectWith, IsProperSubsetOf, IsProperSupersetOf, IsSubsetOf, IsSupersetOf, Overlaps, Remove, SymmetricExceptWith, UnionWith
	System.Collections.Generic.List<T>: Add, AddRange, Clear, Contains, Find, FindAll, FindIndex, FindLast, FindLastIndex, ForEach, GetEnumerator, IndexOf, Insert, InsertRange, Remove, RemoveAll, RemoveAt, RemoveRange, Reverse, Sort, ToArray, TrimExcess, TrueForAll

System.IO
	System.IO.File: Exists, Copy, Move, Delete, Create, ReadAllText, WriteAllText
	System.IO.StreamReader: ReadLine, ReadToEnd, Close, Dispose
	System.IO.StreamWriter: Write, WriteLine, Close, Dispose
	System.IO.BinaryReader: Read, ReadBoolean, ReadByte, ReadBytes, ReadChar, ReadChars, ReadDecimal, ReadDouble, ReadInt16, ReadInt32, ReadInt64, ReadSByte, ReadSingle, ReadString, ReadUInt16, ReadUInt32, ReadUInt64
	System.IO.BinaryWriter: Write
	System.IO.File: Exists, Copy, Move, Delete, Create, ReadAllText, WriteAllText
	   System.IO.FileStream: Read, ReadAsync, Write, WriteAsync, Flush, FlushAsync, Seek, SetLength, Close, Dispose
	System.IO.Stream: Read, ReadAsync, Write, WriteAsync, Flush, FlushAsync, Seek, SetLength, Close, Dispose
	System.IO.TextReader: Read, ReadAsync, ReadBlock, ReadBlockAsync, ReadLine, ReadLineAsync, ReadToEnd, ReadToEndAsync, Close, Dispose
	   System.IO.StreamReader: Read, ReadAsync, ReadBlock, ReadBlockAsync, ReadLine, ReadLineAsync, ReadToEnd, ReadToEndAsync, Close, Dispose
	   System.IO.StringReader: Read, ReadAsync, ReadBlock, ReadBlockAsync, ReadLine, ReadLineAsync, ReadToEnd, ReadToEndAsync, Close, Dispose
	System.IO.TextWriter: Write, WriteAsync, WriteLine, WriteLineAsync, Close, Dispose
	   System.IO.StreamWriter: Write, WriteAsync, WriteLine, WriteLineAsync, Flush, FlushAsync, Close, Dispose
	   System.IO.StringWriter: Write, WriteAsync, WriteLine, WriteLineAsync, Flush, FlushAsync, ToString, Close, Dispose

System.Buffers
System.Data
System.Diagnostics
System.DirectoryServices
System.Drawing
System.Dynamic
System.Formats.Asn1
System.Formats.Cbor
System.Formats.Tar
System.Globalization

System.Net.Http.HttpClient: GetAsync, PostAsync, SendAsync, GetStringAsync, Dispose
System.Net.HttpWebRequest: GetResponse, GetRequestStream, GetResponseStream
System.Net.HttpWebResponse: Close, Dispose
System.Net.Sockets.Socket: Connect, Send, Receive, Close
System.Net.WebClient: DownloadData, DownloadString, UploadData, UploadString
System.Object

System.Linq
System.Linq.Expressions
System.Management
System.Media
System.Net
System.Numerics

System.Reflection.Assembly: GetTypes, GetExportedTypes, GetManifestResourceStream
System.Reflection.MethodInfo: Invoke, GetParameters, GetCustomAttributes
System.Reflection.TypeInfo

System.Resources

System.Runtime

System.Security.Cryptography.RSA: Encrypt, Decrypt, SignData, VerifyData
System.Security.Cryptography.SHA256Managed: ComputeHash
System.Security.Principal.WindowsIdentity: GetCurrent, GetGroups, GetName
System.String: Contains, IndexOf, LastIndexOf, StartsWith, EndsWith, ToUpper, ToLower, Trim, Substring, Split, Concat, Replace, Compare, CompareTo

System.ServiceModel

System.Speech

System.Text

System.Threading

System.Windows.Forms.Control: Invoke, InvokeRequired, CreateGraphics
System.Windows.Forms.Form: Show, Close, Dispose, ActiveForm

System.Xml
```

## Palabras Clave Reservadas

```txt
abstract as ascending async await base bool break by case catch checked continue default delegate delete descending else equals event explicit false finally fixed for foreach from get group if implicit in int interface internal into is join let lock nameof namespace new null on operator orderby out override partial private protected public ref return sealed select set sizeof stackalloc static string switch throw true try typeof unchecked unsafe using virtual void when where while yield
```

## References

- [.NET API - Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/api/?view=net-8.0)
