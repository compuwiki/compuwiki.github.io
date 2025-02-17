---
title: Ejercicios Básicos de Programación en C# (Consola)
---

Este artículo presenta una serie de ejercicios básicos resueltos en C#, ideales para quienes están aprendiendo a programar en este lenguaje y desean practicar en un entorno de consola.

## 1. Hola Mundo

El clásico primer programa que imprime un mensaje en pantalla.

```csharp
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hola, Mundo!");
    }
}
```

## 2. Suma de Dos Números

Solicitar al usuario dos números y mostrar la suma.

```csharp
using System;

class Program {
    static void Main() {
        Console.Write("Ingrese el primer número: ");
        int num1 = int.Parse(Console.ReadLine());

        Console.Write("Ingrese el segundo número: ");
        int num2 = int.Parse(Console.ReadLine());

        int suma = num1 + num2;
        Console.WriteLine("La suma es: " + suma);
    }
}
```

## 3. Comprobar si un Número es Par o Impar

Este programa determina si un número ingresado por el usuario es par o impar.

```csharp
using System;

class Program {
    static void Main() {
        Console.Write("Ingrese un número: ");
        int num = int.Parse(Console.ReadLine());

        if (num % 2 == 0) {
            Console.WriteLine("El número es par.");
        } else {
            Console.WriteLine("El número es impar.");
        }
    }
}
```

## 4. Factorial de un Número

Calcular el factorial de un número ingresado por el usuario.

```csharp
using System;

class Program {
    static void Main() {
        Console.Write("Ingrese un número: ");
        int num = int.Parse(Console.ReadLine());
        int factorial = 1;

        for (int i = 1; i <= num; i++) {
            factorial *= i;
        }

        Console.WriteLine("El factorial de " + num + " es: " + factorial);
    }
}
```

## 5. Tabla de Multiplicar

Mostrar la tabla de multiplicar de un número dado.

```csharp
using System;

class Program {
    static void Main() {
        Console.Write("Ingrese un número: ");
        int num = int.Parse(Console.ReadLine());

        for (int i = 1; i <= 10; i++) {
            Console.WriteLine(num + " x " + i + " = " + (num * i));
        }
    }
}
```

## 6. Invertir una Cadena

Este programa toma una cadena ingresada por el usuario y la invierte.

```csharp
using System;

class Program {
    static void Main() {
        Console.Write("Ingrese una cadena: ");
        string texto = Console.ReadLine();

        char[] caracteres = texto.ToCharArray();
        Array.Reverse(caracteres);

        string invertida = new string(caracteres);
        Console.WriteLine("Cadena invertida: " + invertida);
    }
}
```

## 7. Contar Vocales en una Cadena

Contar cuántas vocales hay en un texto ingresado por el usuario.

```csharp
using System;

class Program {
    static void Main() {
        Console.Write("Ingrese una cadena: ");
        string texto = Console.ReadLine().ToLower();

        int contador = 0;
        foreach (char c in texto) {
            if ("aeiou".Contains(c)) {
                contador++;
            }
        }

        Console.WriteLine("Número de vocales: " + contador);
    }
}
```

---

Estos ejercicios básicos son un excelente punto de partida para aprender C#. A medida que avances, podrás abordar problemas más complejos y mejorar tu lógica de programación.
