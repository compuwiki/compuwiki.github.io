
En un tablero de ajedrez 8x8, indicar la posición inicial de la casilla del tablero e indicar la posición final a la que se puede mover un caballo en el tablero.

Usuario indica coordenada inicial, y responde con coordenadas válidas para el salto.

```cs
string datoEntrada;

string columnas = "ABCDEFGHIJ";

Console.Write("Escribe la posición inicial del caballo como : ");
datoEntrada = Console.ReadLine();

int y = columnas.IndexOf(datoEntrada[0]);
int x = Convert.ToInt32(datoEntrada.Substring(1)) - 1;

Console.Write($"La coordenada inicial es de datos es para {datoEntrada} es: {x}, {y}");
```

