# C\#

## Crear un proyecto de C#
```sh
dotnet new console -o ./CsharpProjects/TestProject
```

## Tipos de datos en C#
- [Csharp - MicroSoft](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/)
- [Csharp-literals-variables - MicroSoft](https://learn.microsoft.com/es-es/training/modules/csharp-literals-variables/)

## Matrices
```cs
// Declaración de una matriz de enteros de 2x3
int[,] matriz = new int[2, 3];
// Asignación de valores a la matriz
matriz[0, 0] = 1; matriz[0, 1] = 2;
matriz[0, 2] = 3; matriz[1, 0] = 4;
matriz[1, 1] = 5; matriz[1, 2] = 6;
```

## Programación orientada a objetos
- class: gato
	- method: comer() maullar()
	- property/attribute: raza peso color
	- object (instance of a class or example of a class): gato1 = new gato
```cs
Console.WriteLine((flip == 0) ? "heads" : "tails");
Console.WriteLine($"Hola que tal estás {nombre} {apellido1} {apellido2}");
```

## Nota
- La variable i da lo mismo con estas dos formas
i+=a <-> i=i+a <-> i++ (para a=1)
i-=a <-> i=i-a <-> i-- (para a=1)

- Para un bucle for `++i` e `i++` dan el mismo resultado, pero 
    ++i will increment the value of i, and then return the incremented value.
     i = 1;
     j = ++i;
     (i is 2, j is 2)

    i++ will increment the value of i, but return the original value that i held before being incremented.
     i = 1;
     j = i++;
     (i is 2, j is 1)

## Convertidor a decimales implícito
```cs
int first = 7;
int second = 5;
decimal quotient = (decimal)first / (decimal)second;
Console.WriteLine(quotient);
```

## C# Programación Orientado a Objetos (POO)
Grupos generales de paradigmas de la programación: Orientados a procedimiento o Orientados a Objetos

## Referencias
- [Class (programming) - Wikipedia](https://simple.wikipedia.org/wiki/Class_(programming))
- [Object-oriented_programming - Wikipedia](https://en.wikipedia.org/wiki/Object-oriented_programming)
- [Class - Wikipedia](https://en.wikipedia.org/wiki/Class_(computer_programming))
- [CSharp basic operations - Microsoft Learn](https://learn.microsoft.com/en-us/training/modules/csharp-basic-operations/)
- [La historia completa de la programación - YouTube](https://www.youtube.com/watch?v=0yL_loiMbFI)
