# Adivina Pareja de Palabras

Colocar en un tablero 10x10 diez palabras duplicadas en posiciones al azar.
Pedir al usuario dos coordenadas del tablero para la pareja de palabras, y mostrar el tablero con las palabras levantadas.
Las palabras tienen que tener una ancho máximo de 15 letras.

```cs
using System;

class Program
{
    static void Main()
    {
        // Definir el tablero
        char[,] tablero = new char[10, 10];

        // Lista de palabras duplicadas
        string[] palabras = { "casa", "perro", "gato", "luz", "mesa", "hoja", "papel", "rojo", "azul", "verde" };

        // Colocar palabras en posiciones aleatorias en el tablero
        ColocarPalabras(tablero, palabras);

        // Mostrar el tablero sin revelar palabras
        MostrarTablero(tablero);

        // Pedir al usuario las coordenadas
        Console.WriteLine("Ingresa las coordenadas (fila columna) de dos palabras separadas por un espacio:");
        string input = Console.ReadLine();

        // Separar las coordenadas
        string[] coordenadas = input.Split(' ');

        // Convertir a enteros
        int fila1 = int.Parse(coordenadas[0]);
        int columna1 = int.Parse(coordenadas[1]);

        int fila2 = int.Parse(coordenadas[2]);
        int columna2 = int.Parse(coordenadas[3]);

        // Mostrar el tablero con las palabras levantadas
        LevantarPalabras(tablero, fila1, columna1, fila2, columna2);
        MostrarTablero(tablero);
    }

    static void ColocarPalabras(char[,] tablero, string[] palabras)
    {
        Random random = new Random();

        foreach (string palabra in palabras)
        {
            // Calcular posición aleatoria
            int fila, columna;
            do
            {
                fila = random.Next(0, 10);
                columna = random.Next(0, 10);
            } while (tablero[fila, columna] != '\0'); // Repetir si la posición ya está ocupada

            // Colocar la palabra en el tablero
            for (int i = 0; i < palabra.Length; i++)
            {
                tablero[fila, columna + i] = palabra[i];
            }
        }
    }

    static void LevantarPalabras(char[,] tablero, int fila1, int columna1, int fila2, int columna2)
    {
        Console.WriteLine($"Palabra 1: {ObtenerPalabra(tablero, fila1, columna1)}");
        Console.WriteLine($"Palabra 2: {ObtenerPalabra(tablero, fila2, columna2)}");
    }

    static string ObtenerPalabra(char[,] tablero, int fila, int columna)
    {
        string palabra = "";
        while (columna < 10 && tablero[fila, columna] != '\0')
        {
            palabra += tablero[fila, columna];
            columna++;
        }
        return palabra;
    }

    static void MostrarTablero(char[,] tablero)
    {
        Console.WriteLine("Tablero:");
        for (int i = 0; i < 10; i++)
        {
            for (int j = 0; j < 10; j++)
            {
                Console.Write(tablero[i, j] == '\0' ? '-' : tablero[i, j]);
                Console.Write(" ");
            }
            Console.WriteLine();
        }
        Console.WriteLine();
    }
}
```