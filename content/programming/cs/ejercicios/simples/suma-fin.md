```cs
// Suma de números por pantalla hasta que escriba "FIN"
List<int> nums = new List<int>();
int i = 1;
string input;

Console.WriteLine("Introduce números por pantalla, (para finalizar escribe FIN)");

do
{
	Console.WriteLine($"Número {i++}: ");
	input = Console.ReadLine();
	if (input != "FIN") 
	{
		int num = Convert.ToInt32(input);
		nums.Add(num);
	}
}
while (input != "FIN");

int suma = nums.Sum();
Console.WriteLine("La suma total es " + suma);

// Función para operar dos números con un operador dado
static double Opera(int n1, char op, int n2)
{
    switch (op)
    {
        case '+':
            return n1 + n2;
        case '-':
            return n1 - n2;
        case '*':
        case 'x': // Puedes usar 'x' o '*' para indicar multiplicación
            return n1 * n2;
        case '/':
            return (double)n1 / n2; // Para obtener resultado decimal en la división
        default:
            throw new ArgumentException("Operador no válido");
    }
}

// Función para calcular la velocidad en metros por segundo
static double velocidad_mps(int metros, int h, int m, int s)
{
    int tiempoTotalSegundos = h * 3600 + m * 60 + s;
    return (double)metros / tiempoTotalSegundos;
}

// Función para invertir filas y columnas de una matriz bidimensional
static double[,] invertir(double[,] m)
{
    int filas = m.GetLength(0);
    int columnas = m.GetLength(1);
    double[,] matrizInvertida = new double[columnas, filas];
    for (int i = 0; i < filas; i++)
    {
        for (int j = 0; j < columnas; j++)
        {
            matrizInvertida[j, i] = m[i, j];
        }
    }
    return matrizInvertida;
}

// Función para calcular el porcentaje de números positivos en una matriz bidimensional
static double invertirPorcentaje(double[,] numeros)
{
    int totalNumeros = numeros.Length;
    int positivos = 0;
    foreach (var numero in numeros)
    {
        if (numero >= 0)
            positivos++;
    }
    return (double)positivos / totalNumeros * 100;
}

// Función para imprimir un triángulo con un nombre dado
static void triangulo(string nombre)
{
    for (int i = 0; i < nombre.Length; i++)
    {
        Console.WriteLine(nombre.Substring(0, i + 1));
    }
}

// Función para corregir el texto según las especificaciones dadas
static string ortografia(string texto)
{
    string[] palabras = texto.ToLower().Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
    for (int i = 0; i < palabras.Length; i++)
    {
        if (i == 0 || palabras[i - 1].EndsWith("."))
        {
            palabras[i] = palabras[i].Substring(0, 1).ToUpper() + palabras[i].Substring(1);
        }
    }
    return string.Join(" ", palabras);
}

// Función auxiliar para imprimir una matriz
static void ImprimirMatriz(double[,] matriz)
{
    int filas = matriz.GetLength(0);
    int columnas = matriz.GetLength(1);
    for (int i = 0; i < filas; i++)
    {
        for (int j = 0; j < columnas; j++)
        {
            Console.Write(matriz[i, j] + " ");
        }
        Console.WriteLine();
    }
}

// Ejemplo de uso de las funciones
Console.WriteLine(Opera(5, '+', 3)); // Suma: 8
Console.WriteLine(velocidad_mps(1000, 1, 30, 0)); // Velocidad: 0.0925925925925926
double[,] matrizOriginal = new double[,] { { 1, 2, 3 }, { 2, 1, 1 }, { 1, 1, 3 } };
double[,] matrizInvertida = invertir(matrizOriginal);
ImprimirMatriz(matrizInvertida);
Console.WriteLine(invertirPorcentaje(matrizOriginal)); // Porcentaje: 100
triangulo("Juana T.");
Console.WriteLine(ortografia("ESTO ES un Ejemplo. DE correcciÓN dE tEXTo.")); // Resultado: Esto es un ejemplo. De corrección de texto.
```