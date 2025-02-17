# Programación Orienteada a Objetos

Conceptos POO organizados por grupos.

**Estructura:**
- **Clase:** Un plano o plantilla que define la estructura y el comportamiento de los objetos.
	- **Objeto (instancia de una clase):** Una instancia concreta de una clase que combina datos y comportamientos relacionados.
		- **Propiedad o atributo**: Contenedor de un tipo de dato asociado a un objeto (o a una clase de objetos), que hace los datos visibles desde fuera del objeto y esto se define como sus características predeterminadas, y cuyo valor puede ser alterado por la ejecución de algún método.
		- **Evento**: Es un suceso en el sistema (tal como una interacción del usuario con la máquina, o un mensaje enviado por un objeto). El sistema maneja el evento enviando el mensaje adecuado al objeto pertinente. También se puede definir como evento la reacción que puede desencadenar un objeto; es decir, la acción que genera.
		- **Mensaje**: Una comunicación dirigida a un objeto, que le ordena que ejecute uno de sus métodos con ciertos parámetros asociados al evento que lo generó

**Funciones o métodos del Objeto:**
- **Método:** Algoritmo que define el comportamiento de un objeto, especificando las acciones que puede realizar.
- **Constructor:** Un método especial utilizado para inicializar objetos cuando se crean instancias de una clase, estableciendo sus valores iniciales.

**Principios de la POO:**
- **Abstracción:** Proceso de simplificación que modela objetos del mundo real como objetos en el programa, enfocándose en lo esencial y ocultando detalles innecesarios.
- **Encapsulamiento:** Ocultar los detalles internos de una clase y exponer solo una interfaz pública para interactuar con los objetos.
- **Herencia:** Mecanismo que permite crear nuevas clases basadas en clases existentes, permitiendo la reutilización de código y la extensión de funcionalidades.
- **Polimorfismo:** Habilidad de objetos diferentes para responder de manera única a una misma llamada de método, facilitando la flexibilidad y extensibilidad del código.
- **Modularidad**: Cada una de las cuales debe ser tan independiente como sea posible de la aplicación en sí y de las restantes partes. Estos módulos se pueden compilar por separado, pero tienen conexiones con otros módulos. Al igual que la encapsulación, los lenguajes soportan la modularidad de diversas formas.
- **Principio de ocultación**: Cada objeto está aislado del exterior, es un módulo natural, y cada tipo de objeto expone una "interfaz" a otros objetos que detalla cómo pueden interactuar con los objetos de la clase. El aislamiento protege a las propiedades de un objeto contra su modificación por quien no tenga derecho a acceder a ellas; solamente los propios métodos internos del objeto pueden acceder a su estado. Esto asegura que otros objetos no puedan cambiar el estado interno de un objeto de manera inesperada, eliminando efectos secundarios e interacciones inesperadas. Algunos lenguajes relajan esto, permitiendo un acceso directo a los datos internos del objeto de una manera controlada y limitando el grado de abstracción. La aplicación entera se reduce a un agregado o [rompecabezas](https://es.wikipedia.org/wiki/Rompecabezas "Rompecabezas") de objetos.
- **Recolección de basura**: La recolección de basura (_garbage collection_) es la técnica por la cual el entorno de objetos se encarga de destruir automáticamente, y por tanto desvincular la memoria asociada, los objetos que hayan quedado sin ninguna referencia a ellos. Esto significa que el programador no debe preocuparse por la asignación o liberación de memoria, ya que el entorno la asignará al crear un nuevo objeto y la liberará cuando nadie lo esté usando. En la mayoría de los lenguajes híbridos que se extendieron para soportar el Paradigma de Programación Orientada a Objetos como C++ u [Object Pascal](https://es.wikipedia.org/wiki/Object_Pascal "Object Pascal"), esta característica no existe y la memoria debe desasignarse expresamente.


# Ejemplos en C#

```csharp
// Definición de una clase "Persona"
public class Persona
{
    // Atributos de la clase
    public string Nombre { get; set; }
    public int Edad { get; set; }

    // Constructor para inicializar la clase
    public Persona(string nombre, int edad)
    {
        Nombre = nombre;
        Edad = edad;
    }

    // Método de la clase
    public void Saludar()
    {
        Console.WriteLine("Hola, soy " + Nombre + " y tengo " + Edad + " años.");
    }
}

// Creación de objetos (instancias) de la clase "Persona"
Persona persona1 = new Persona("Juan", 30);
Persona persona2 = new Persona("María", 25);

// Acceso a los atributos y métodos de los objetos
Console.WriteLine(persona1.Nombre); // Imprime "Juan"
persona1.Saludar(); // Imprime "Hola, soy Juan y tengo 30 años."

Console.WriteLine(persona2.Nombre); // Imprime "María"
persona2.Saludar(); // Imprime "Hola, soy María y tengo 25 años."
```

En este ejemplo, la clase "Persona" se utiliza para definir la estructura y el comportamiento de objetos que representan personas. Luego, se crean dos objetos (instancias), "persona1" y "persona2", a partir de la clase "Persona". Cada objeto tiene sus propios valores para los atributos "Nombre" y "Edad", y se pueden llamar a sus métodos, como "Saludar", para realizar acciones específicas relacionadas con esos objetos.

El término "instancia" se usa comúnmente en el contexto de programación orientada a objetos, pero en este caso, simplemente decimos "objeto" para referirnos a "persona1" y "persona2". Ambos son instancias concretas de la clase "Persona".

## Referencias
- [Instancia (informática) - Wikipedia](https://es.wikipedia.org/wiki/Instancia_(inform%C3%A1tica))
