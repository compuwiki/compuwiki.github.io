# Diagrama de Clases en C#

Los diagramas de clases en C# son herramientas visuales fundamentales para comprender la estructura y las relaciones entre las clases en un sistema de software orientado a objetos. Estos diagramas proporcionan una representación gráfica clara de cómo interactúan las clases en el sistema. Aquí se presentan los principales elementos que se encuentran en los diagramas de clases en C#:

## 1. Clases
En un diagrama de clases, las clases se representan como rectángulos con tres secciones:
- La primera sección contiene el nombre de la clase.
- La segunda sección contiene los atributos de la clase.
- La tercera sección contiene los métodos de la clase.

Por ejemplo:
```
+------------+
| Persona    |
+------------+
| nombre     |
| edad       |
| dirección  |
+------------+
| caminar()  |
| hablar()   |
+------------+
```

## 2. Atributos
Los atributos de una clase se muestran dentro de la sección de atributos del rectángulo que representa la clase. Cada atributo tiene un nombre y un tipo de datos asociado que especifica el tipo de valor que puede contener.

Por ejemplo:
```
+------------+
| Persona    |
+------------+
| nombre: string    |
| edad: int        |
| dirección: string|
+------------+
```

## 3. Métodos
Los métodos de una clase se muestran dentro de la sección de métodos del rectángulo que representa la clase. Cada método tiene un nombre, una lista de parámetros y un tipo de retorno asociado (si corresponde). Los métodos pueden ser privados (**-**), protegidos (**#**) o privados (**-**).
Los métodos privados solo son accesibles dentro de la misma clase donde están definidos, los métodos protegidos solo son accesibles dentro de la misma clase y en las clases derivadas (subclases o clases hijas). Y los métodos públicos son accesibles desde cualquier parte del programa. 

Por ejemplo:
```
+------------+
| Persona    |
+------------+
| caminar()      |
| hablar(string mensaje) |
+------------+
```

## 4. Relaciones entre Clases
Las relaciones entre clases se representan mediante líneas que conectan las clases en el diagrama. Las relaciones comunes incluyen:
- **Asociación**: Representa una conexión semántica entre dos clases.
- **Agregación**: Indica que una clase contiene o tiene una colección de otras clases.
- **Composición**: Es una forma más fuerte de agregación donde las partes solo existen dentro del objeto agregado.

Además, se representa la **herencia** mediante una línea con una flecha punteada que conecta la clase derivada a la clase base.

## 5. Interfaces
Las interfaces se representan de manera similar a las clases, pero precedidas por la palabra clave `<<interface>>`. Las clases que implementan una interfaz se muestran conectadas a la interfaz mediante una línea punteada.

Por ejemplo:
```
+---------------+
|   IVolador    |
+---------------+
| volar()       |
+---------------+
```

Estos elementos proporcionan una representación visual clara de la estructura y las relaciones entre las clases en un sistema de software en C#. Los diagramas de clases son una herramienta valiosa para comprender la arquitectura y el diseño del sistema.

---

En los diagramas de clases, las flechas y los símbolos se utilizan para representar las relaciones entre las clases y otros elementos del diagrama. Aquí hay una explicación de los símbolos y las flechas más comunes utilizados en los diagramas de clases en C#:
- Asociación
- Agregación
- Composición
- Herencia
- Implementación de Interfaz

Estos elementos son fundamentales para comprender las relaciones entre las clases y otros elementos en un diagrama de clases en C#. Proporcionan una representación visual clara de la estructura y la arquitectura del sistema de software.
