# Hundir la flota

- Hundir la flota con tablero 10x10 de AGUA = '░'
- Los barcos son:	
	- Transatlántico: 'T'= 3
	- Portaviones: 'P'=5
- Se pide disparo, por ejemplo "B1". Decir si es agua o tocado
- Si está tocada, cambiar letra de barco tocado por asterisco.
- El juego se acaba cuando usuario no mete nada.

> [!NOTE] Versión complicada
> Los barcos se colocan en posiciones al azar, no pueden salirse del tablero ni tocarse, es decir, tienen que tener casilla de agua alrededor.


```cs
class Program
{
    // Tablero de 10x10 con portaviones (P) y transatlanticos (T)
    //static char[,] tablero = {
    //    { 'T',  'T',  'T', AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA},
    //    { AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA},
    //    { AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA},
    //    { AGUA, AGUA, AGUA, 'P', AGUA, AGUA, AGUA, AGUA, AGUA, AGUA},
    //    { AGUA, AGUA, AGUA, 'P', AGUA, AGUA, AGUA, AGUA, AGUA, AGUA},
    //    { AGUA, AGUA, AGUA, 'P', AGUA, AGUA, AGUA, AGUA, AGUA, AGUA},
    //    { AGUA, AGUA, AGUA, 'P', AGUA, AGUA, AGUA, AGUA, AGUA, AGUA},
    //    { AGUA, AGUA, AGUA, 'P', AGUA, AGUA, AGUA, AGUA, AGUA, AGUA},
    //    { AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA},
    //    { AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA, AGUA}
    //};
    static char[,] tablero = new char[10, 10];
    const char AGUA = '.';
    static string portaviones = "PPPPP";
    static string transatlantico = "TTT";
    static string filas = "ABCDEFGHIJ";
    //static int fila;
    //static int columna;
    static string coordenadaDisparo;
    static int contador = 0;
    static Random random = new Random();

    static void Main()
    {
        Console.WriteLine("Bienvenido al juego de hundir la flota.");

        // Generamos tablero 10x10 con AGUA 
        tablero = GenerarTablero();

        // Colocamos cada barco en este caso en una columna fija (vertical)
        // Console.WriteLine("\nColocamos los barcos: Portavión (PPPPP) y Transatlántico (TTT)");
        tablero = ColocarBarcoAleatorio(portaviones);
        tablero = ColocarBarcoAleatorio(transatlantico);
        ImprimirTablero(tablero);

        Jugar();
    }

    static void Jugar()
    {
        while (coordenadaDisparo != "")
        {
            RealizarDisparo(ObtenerCoordenadaDisparo());

            // Verificamos si todos los barcos han sido hundidos
            if (contador == portaviones.Length + transatlantico.Length)
            {
                Console.WriteLine("\n¡Felicidades, has hundido toda la flota!");
                coordenadaDisparo = "";
            }
        }
        Console.WriteLine("Juego terminado.");
    }

    static char[,] GenerarTablero()
    {
        char[,] tablero = new char[10, 10];

        for (int fila = 0; fila < tablero.GetLength(0); fila++)
        {
            for (int columna = 0; columna < tablero.GetLength(1); columna++)
            {
                tablero[fila, columna] = '.';
            }
        }
        Console.WriteLine();

        return tablero;
    }

    static bool EsPosicionDisponible(int fila, int columna, int longitud)
    {
        bool correcto = false;
        int i = 0;

        // Verificar si la posición y las posiciones adyacentes están disponibles
        while (i < longitud) 
        {
            if (columna + i >= tablero.GetLength(1) || tablero[fila, columna + i] != AGUA)
            {
                correcto = false;
            }
            else
            {
                correcto = true;
            }
            i++;
        }
        return correcto;
    }

    // static char[,] ColocarBarco(int indiceFijo, string barco)
    // {
    //     // Colocar barcos manualmente en columna fija (vertical) o en fila fija (horizontal)
    //     for (int i = 0; i < barco.Length; i++)
    //     {
    //         tablero[i, indiceFijo] = barco[i];
    //     }
    // }

    static char[,] ColocarBarcoAleatorio(string barco)
    {
        int coordXRandom = random.Next(0, tablero.GetLength(0) - barco.Length + 1);
        int coordYRandom = random.Next(0, tablero.GetLength(0) - barco.Length + 1);

        while (!EsPosicionDisponible(coordXRandom, coordYRandom, barco.Length))
        {
            // Generar nuevas coordenadas aleatorias
            coordXRandom = random.Next(0, tablero.GetLength(0) - barco.Length + 1);
        }

        // Decidir aleatoriamente qué bucle ejecutar
        int opcionAleatoria = random.Next(2);

        if (opcionAleatoria == 0)
        {
            // Primer bucle. Posición aleatoria, barco colocado en columna fija
            for (int i = 0; i < barco.Length; i++)
            {
                tablero[coordXRandom + i, coordYRandom] = barco[i];
            }
        }
        else
        {
            // Segundo bucle. Posición aleatoria, barco colocado en fila fija
            for (int j = 0; j < barco.Length; j++)
            {
                tablero[coordXRandom, coordYRandom + j] = barco[j];
            }
        }

        return tablero;
    }

    static void ImprimirTablero(char[,] tablero)
    {
        // Columnas con números
        for (int i = 0; i < tablero.GetLength(1); i++)
        {
            Console.Write(" " + (i + 1) + " ");
        }
        // Filas con letra al principio
        for (int i = 0; i < tablero.GetLength(0); i++)
        {
            Console.Write("\n" + filas[i] + " ");
            for (int j = 0; j < tablero.GetLength(1); j++)
            {
                Console.Write(" " + tablero[i, j] + " ");
            }
        }
        Console.WriteLine();
    }

    static string ObtenerCoordenadaDisparo()
    {
        Console.Write("\nDispara a una posición (A-J, 1-10): ");
        string dato = Console.ReadLine().ToUpper();
        return dato;
    }

    static void RealizarDisparo(string dato)
    {
        int coordX = filas.IndexOf(dato[0]); // coordenada[0] - 'A';
        int coordY = Convert.ToInt32(dato.Substring(1)) - 1;

        if (tablero[coordX, coordY] != AGUA)
        {
            tablero[coordX, coordY] = '*';
            Console.WriteLine($"\n¡Impacto {++contador}!");
        }
        else
        {
            Console.WriteLine("\nDisparo fallido.");
        }
        ImprimirTablero(tablero);
    }
}
```
