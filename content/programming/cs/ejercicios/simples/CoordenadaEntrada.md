
```cs
string filas  = "ABCDEFGHIJ";

Console.Write("Entrada dato: ");

string datoEntrada = Console.ReadLine();

int coordX1 = filas.IndexOf(datoEntrada[0]);
int coordX2 = datoEntrada[0] - 'A';
int coordY = Convert.ToInt32(datoEntrada.Substring(1)) - 1;

Console.WriteLine($"Opción 1: {coordX1}, {coordY}");
Console.WriteLine($"Opción 2: {coordX2}, {coordY}");
```

