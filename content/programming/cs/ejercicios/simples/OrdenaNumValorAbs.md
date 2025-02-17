# Ordenar números examen de prueba

```cs
using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        double[] arrayNum = { 43.34, -67.4, 12.0, 12.2, 23.53, -26.03, 26.34, 2, 4.95, 0.33, -0.1, -2.5, 10.5, -1.82, -30.0 };

        Console.WriteLine("Números ordenados de menor a mayor en valor absoluto:\n");

        // Imprimir el primer número antes del bucle
        string numFormato = arrayNum[0].ToString("F2", CultureInfo.GetCultureInfo("en-US"));
        Console.Write($"{numFormato,5}, ");

        for (int i = 1; i < arrayNum.Length; i++)
        {
            // Actualizar el formato para el número actual en cada iteración
            numFormato = arrayNum[i].ToString("F2", CultureInfo.GetCultureInfo("en-US"));

            // Si el valor absoluto actual es menor que el anterior, imprimir en una nueva línea
            if (Math.Abs(arrayNum[i]) < Math.Abs(arrayNum[i - 1]))
            {
                Console.Write($"\n{numFormato, 5}, ");
            }
            else
            {
                // Si no, imprimir en la misma línea
                Console.Write($"{numFormato, 5}, ");
            }
        }
    }
}

```

