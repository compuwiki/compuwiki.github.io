# Notebook

Para usar el cuaderno de notas o notebook en **obsidian.md** debemos instalar el plugin [obsidian-execute-code](https://github.com/twibiral/obsidian-execute-code/releases) y el compilador de C# con `dotnet tool install -g dotnet-script`.

## Estructuras de control en CS

#### If...Else
El condicional if...else se utiliza para ejecutar un bloque de código si se cumple una condición, y otro bloque si la condición no se cumple.

> [!NOTE]
> **Codebook** no permite compilar cs sino rust, go, js. Hay que usar "Polyglot" en vscode o "Execute Code" plugin de Obsidian.md

- Consideraciones el profesor Fernando de programación:
	- No usar Try Parse sino Try Catch
	- Prefiere condiciones compuestas que separadas. Y que lo pienses primero con cajas de Nassim Hedername.

```csharp
int edad = 18;
if (edad >= 18)
{
    Console.WriteLine("Eres mayor de edad.");
}
else
{
    Console.WriteLine("Eres menor de edad.");
}
```

#### Switch
La estructura de control switch se utiliza para realizar múltiples comprobaciones y ejecutar código según el valor de una variable.

```csharp
int diaDeLaSemana = 3;
string nombreDelDia;
switch (diaDeLaSemana)
{
    case 1:
        nombreDelDia = "Lunes";
        break;
    case 2:
        nombreDelDia = "Martes";
        break;
    case 3:
        nombreDelDia = "Miércoles";
        break;
    default:
        nombreDelDia = "Día no válido";
        break;
}
Console.WriteLine("Hoy es " + nombreDelDia);
```

#### While Loop
El bucle while se utiliza para repetir un bloque de código mientras una condición sea verdadera.

```csharp
int contador = 0;
while (contador < 5)
{
    Console.WriteLine("Iteración " + contador);
    contador++;
}
```

#### For Loop
El bucle for se utiliza para realizar un número específico de iteraciones.

```csharp
for (int i = 1; i <= 5; i++)
{
    Console.WriteLine("Iteración " + i);
}
```

### Funciones o métodos
- Console.ReadLine()
```cs
Console.WriteLine("Escribe tu nombre");
string nombre = Console.ReadLine();

Console.WriteLine("Mi nombre es " + nombre);
```

- Sumatorio
```cs
int max = 20;
int[] lista = new int [max];
int suma = 0;

for (int i = 0; i < max; i++) 
{
	suma += i;
	lista[i] = suma;
	Console.WriteLine($"El elemento de ínidice {i+1}, {lista[i]}");
}
```

---

- Búsqueda lineal
```cs
float[] datos = { 1.1f, 10, -3.5f, 0.0004f};
float DATO_BUSCADO = 10;
int i = 0; // contador

// Mientras dato buscado sea distinto del elemento del array y sea menor que la última posición
while (DATO_BUSCADO != datos[i] && i < datos.Length - 1)
{
    i++;
}
if (DATO_BUSCADO != datos[i])
{
	Console.WriteLine($"Dato {DATO_BUSCADO} no encontrado");
}
else
{
	Console.WriteLine($"Dato {DATO_BUSCADO} encontrado en la posición {i+1} está en el array.");
}
```

---

- Búsqueda datos usuario, secuencias de datos nombre y número de teléfono.
- Si introduce nombre vacío parar y no pedir nada más. Y como máximo 20 usuarios.
- Solicitar al usuario para buscar un nº de teléfono y decir a quién corresponde.

Para hacer pruebas:
`type .\prueba_datos.txt | .\bin\Debug\net7.0\BusquedaTfno.exe`

```
Alberto
123
Beatriz
234
Carlota
456
David
567

David
```

---
## Ejemplos

```cs
Console.WriteLine("Hola, como te llamas?");

string nombre = Console.ReadLine();

Console.WriteLine("Me llamo " + nombre);
```

## Tabla salarios mes

Tabla de 4x4 (4 filas y 4 columnas) con los salarios, las filas son los meses y las columnas las personas. Así lo entiendo yo.


- Opción A (opción elegida)

|                   | Ana    | Bea    | Carlos | Daniel |
| ----------------- | ------ | ------ | ------ | ------ |
| Mes antepenúltimo | 1500 € | 1210 € | 1220 € | 1320 € |
| Mes penúltimo     | 1210 € | 1220 € | 1320 € | 1280 € |
| Mes último        | 1210 € | 1220 € | 1320 € | 1260 € |

- Opción B

|        | Mes antepenúltimo | Mes penúltimo | Mes último |
| ------ | ----------------- | ------------- | ---------- |
| Ana    | 1500 €            | 1210 €        | 1220 €     |
| Bea    | 1500 €            | 1210 €        | 1220 €     |
| Carlos | 1210 €            | 1220 €        | 1320 €     |
| Daniel | 1210 €            | 1220 €        | 1320 €     |
 

- Tabla Persona

| ID  | Nombre | Apellido1 | Apellido2 |
| --- | ------ | --------- | --------- |
| 1   | Juan   | Pérez     | García    |
| 2   | María  | López     | Rodríguez |
| 3   | Carlos | González  | Pérez     | 

