---
title: Java
---

Java es un lenguaje de programación de propósito general, orientado a objetos y diseñado para ser portable y seguro. Fue desarrollado por Sun Microsystems (ahora parte de Oracle) en 1995 y es ampliamente utilizado en aplicaciones empresariales, móviles y de desarrollo web.

## Características principales de Java

- **Orientado a objetos:** Java sigue el paradigma de programación orientada a objetos (POO), lo que permite una organización modular del código.
- **Independencia de plataforma:** Gracias a la máquina virtual de Java (JVM), el código Java puede ejecutarse en cualquier sistema operativo sin necesidad de modificaciones.
- **Recolección de basura automática:** Java maneja la memoria de forma automática a través de su sistema de garbage collection.
- **Seguridad:** Java tiene un fuerte sistema de gestión de memoria y un modelo de seguridad robusto que previene muchas vulnerabilidades comunes.
- **Multithreading:** Java permite la ejecución de múltiples hilos de procesamiento simultáneamente, lo que mejora el rendimiento de las aplicaciones.

## Sintaxis básica de Java

Aquí tienes un ejemplo de un programa simple en Java que imprime "Hola, mundo!":

```java
public class HolaMundo {
    public static void main(String[] args) {
        System.out.println("Hola, mundo!");
    }
}
```

## Tipos de datos en Java

Java es un lenguaje fuertemente tipado y admite los siguientes tipos de datos primitivos:

- `byte` (8 bits)
- `short` (16 bits)
- `int` (32 bits)
- `long` (64 bits)
- `float` (32 bits, punto flotante)
- `double` (64 bits, punto flotante)
- `char` (carácter Unicode de 16 bits)
- `boolean` (`true` o `false`)

## Programación orientada a objetos en Java

Java está basado en los principios de POO, que incluyen:

### Clases y objetos

```java
class Persona {
    String nombre;
    int edad;

    void mostrarInformacion() {
        System.out.println("Nombre: " + nombre + ", Edad: " + edad);
    }
}

public class Main {
    public static void main(String[] args) {
        Persona persona1 = new Persona();
        persona1.nombre = "Juan";
        persona1.edad = 25;
        persona1.mostrarInformacion();
    }
}
```

### Herencia

```java
class Animal {
    void hacerSonido() {
        System.out.println("El animal hace un sonido");
    }
}

class Perro extends Animal {
    void hacerSonido() {
        System.out.println("El perro ladra");
    }
}

public class Main {
    public static void main(String[] args) {
        Perro miPerro = new Perro();
        miPerro.hacerSonido();
    }
}
```

## Aplicaciones de Java

Java se utiliza en una variedad de aplicaciones, incluyendo:

- **Desarrollo web:** Frameworks como Spring permiten la creación de aplicaciones web robustas.
- **Aplicaciones móviles:** Android utiliza Java como su principal lenguaje de programación.
- **Software empresarial:** Muchas aplicaciones de nivel empresarial están desarrolladas en Java.
- **Aplicaciones de escritorio:** Java Swing y JavaFX permiten crear interfaces gráficas de usuario.
- **Big Data y Machine Learning:** Herramientas como Apache Hadoop y Weka están basadas en Java.

## Conclusión

Java es un lenguaje potente y versátil que sigue siendo relevante en el desarrollo de software moderno. Su portabilidad, seguridad y soporte para la programación orientada a objetos lo convierten en una excelente opción para proyectos de cualquier escala.
