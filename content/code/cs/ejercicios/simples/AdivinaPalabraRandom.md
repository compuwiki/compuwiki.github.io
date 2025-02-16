
Juego AdivinaPalabraRandom:
1. Escribe palabra en variable "palabraOriginal"
2. Generar un número random  "numAleatorio"
3. Recorrer la palabra con un bucle, desde la letra que ocupa la posición del número aleatorio hasta completar la palabra
4. Comprueba si la palabra es correcta y muestra resultado con if-else

```csharp
// Instancia de variables
string palabraOriginal = "apple";
char[] palabraChars = new char[palabraOriginal.Length];
int posicion = 0;
Random numAleatorio = new Random(); // objeto o instancia de la clase Random

// Pasamos la palabra a un array de char tmabién sirve ToCharArray()
for (int contador = 0; contador < palabraOriginal.Length; contador++)
{
    palabraChars[contador] = palabraOriginal[contador];
}

// Bucle que realiza un intercambio de letras en posiciones aleatorias del array de chars
// también se puede hacer i = (i % 10) +1
for (int i = 0; i < palabraOriginal.Length - 1; i++)
{
	// Next es un metodo de un objeto Random o instancia de la clase Random.
    // Genera numeros aleatorios en un rango [min, max), max sin incluir
    posicion = numAleatorio.Next(0, i + 1);

    // Guardamos una letra de la posición i, de forma temporal para no sobreescribirla
    char letraTemporal = palabraChars[i];

    // Asignamos una letra en posición aleatoria a la posición i
    palabraChars[i] = palabraChars[posicion];

    // Ahora intercambios la otra letra que estaba en i (antes de sobreescirbir) hacia la otra posición en el otro lado
    palabraChars[posicion] = letraTemporal;
}

string palabraAlterada = new string(palabraChars);

Console.WriteLine("Adivina la palabra: " + palabraAlterada);
string palabraUsuario = Console.ReadLine();

if (palabraUsuario.ToLower() == palabraOriginal.ToLower())
{
    Console.WriteLine("¡Felicidades! ¡Adivinaste la palabra!");
}
else
{
    Console.WriteLine("Lo siento, eso es incorrecto. La palabra correcta es: " + palabraOriginal);
}
```