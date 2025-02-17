## EJE0404. Ejercicios de Programación. Strings

1) Dada una cadena de caracteres introducida por teclado, contar el número de caracteres que la componen.

```cs
string cadena;

Console.WriteLine("Escribe una frase.");
cadena = Console.ReadLine();

Console.WriteLine("El numero de caracteres de la cadena es " + cadena.Length);
```

2) Solicitada una frase y una letra, encontrar el número de veces que dicha letra aparece en la frase dada.
```cs
char letra;
string frase;
int conteoLetra;

Console.WriteLine("Escribe una frase: ");
frase = Console.ReadLine();

Console.Write("Ahora escribe una letra: ");

letra = (char)(Console.Read());
//letra = Convert.ToChar(Console.Read());

// letraAparece = Char.IsLetter(letra);
// con foreach y conteoLetra
conteoLetra = frase.Count(c => c == letra);

Console.WriteLine($"El numero de veces que aparece la letra {letra} es {conteoLetra}");
```


3) Dada una cadena por teclado, mostrar la cadena al revés.
```cs
Console.WriteLine("Escribe una frase por teclado: ");
string cadena = Console.ReadLine();

for (int i = cadena.Length - 1; i >= 0; i--)
{
    Console.Write(cadena[i]);
}
```

4) Dada una cadena por teclado, introducir en una nueva variable la cadena al revés, y mostrarla.
```cs
string cadena, cadenaReves;
char[] caracteres;

Console.WriteLine("Escribe una frase por teclado: ");
cadena = Console.ReadLine();

caracteres = cadena.ToCharArray();

for (int letra = 0; letra < cadena.Length ; letra++)
{
	cadenaReves += caracteres[cadena.Length - letra - 1];
}

/*
for (int i = 0; i < cadena.Length / 2; i++)
{
    char temp = caracteres[i];
    caracteres[i] = caracteres[cadena.Length - 1 - i];
    caracteres[cadena.Length - 1 - i] = temp;
}
string cadenaReves = new string(caracteres);
*/

Console.WriteLine(cadenaReves);
```

5) Dada una cadena por teclado, indicar cuáles son las vocales que contiene.
```cs
string cadena;
char[] caracteres;
string vocales = "AEIOU";
int cuentaVocales = 0, cuentaA = 0, cuentaE = 0, cuentaI = 0, cuentaO = 0, cuentaU = 0;
Console.WriteLine("Escribe una frase por teclado: ");
cadena = Console.ReadLine().ToUpper();
// Aumenta contador cuando el string cadena contiene una vocal del string vocales
for (int letra = 0; letra < cadena.Length; letra++)
{
    // if (cadena.Contains(vocales[vocal]))
    //if (cadena[letra] == vocales[0])
    //{
    //    cuentaA++;
    //}
    //if (cadena[letra] == vocales[1])
    //{
    //    cuentaE++;
    //}
    //if (cadena[letra] == vocales[2]) 
    //{
    //    cuentaI++;
    //}
    //if (cadena[letra] == vocales[3])
    //{
    //    cuentaO++;
    //}
    //if (cadena[letra] == vocales[4])
    //{
    //    cuentaU++;
    
    switch (cadena[letra])
    {
        case 'A':
            cuentaA++;
            break;
        case 'E':
            cuentaE++;
            break;
        case 'I':
            cuentaI++;
            break;
        case 'O':
            cuentaO++;
            break;
        case 'U':
            cuentaU++;
            break;
    }
}

if (cuentaA + cuentaE + cuentaI + cuentaO + cuentaU > 0)
{
    Console.WriteLine($"Contiene las siguientes vocales: \nA: {cuentaA} letras \nE: {cuentaE} letras \nI: {cuentaI} letras \nO: {cuentaO} letras \nU: {cuentaU} letras");
}
else
{
    Console.WriteLine("No contiene vocales.");
}
```

6) Dada una cadena por teclado, contar el número de vocales que contiene.
```cs
// En el anterior se cuenta y se indica qué vocales contiene
```


7) Dada una cadena por teclado, y una segunda de comparación, mostrar por pantalla la cadena “Está” cuando encontremos la segunda cadena en cualquier posición de la primera.
```cs
Console.WriteLine("frase 1:");
string frase1 = Console.ReadLine();

Console.WriteLine("frase 2:");
string frase2 = Console.ReadLine();
if (frase1.Contains(frase2))
{
	Console.WriteLine("Está");
}

/* -------------------------- */

Console.Write("Ingresa la primera cadena: ");
string cadena1 = Console.ReadLine()
Console.Write("Ingresa la segunda cadena de comparación: ");
string cadena2 = Console.ReadLine()

bool encontrada = false;
int i = 0
while (i <= cadena1.Length - cadena2.Length && !encontrada)
{
    int j = 0;
    while (j < cadena2.Length && cadena1[i + j] == cadena2[j])
    {
        j++;
    }
    
    if (j == cadena2.Length)
    {
        encontrada = true;
    }
    i++;
}
if (encontrada)
{
    Console.WriteLine("Está");
}
```

8) Teniendo en cuenta que la clave es “eureka”, escribir un algoritmo que nos pida una clave. Solo tenemos 3 intentos para acertar, si fallamos los 3 intentos nos mostrara un mensaje indicándonos que hemos agotado esos 3 intentos. Si acertamos la clave, saldremos directamente del programa.
```cs
 int intento;
 int totalIntentos = 3;
 string clave;

 Console.WriteLine("Escribe una clave, tienes 3 intentos: ");
 clave = Console.ReadLine();
 intento = 1;

 while (clave != "eureka" & totalIntentos - intento > 0)
 {
     if (totalIntentos > 0)
     {
         Console.WriteLine($"Repite la clave (te quedan {totalIntentos - intento}):");
         clave = Console.ReadLine();
     }
     else
     {
         Console.Write("Último intento");
         clave = Console.ReadLine();
     }
     intento++;
 }

 if (totalIntentos - intento == 0 & clave != "eureka")
 {
     Console.WriteLine("Has agotado los tres intentos.");
 }
```

9) Dada una cadena de caracteres que contenga el nombre de una persona en formato "APELLIDOS, NOMBRE", convertirla en una cadena del tipo "NOMBRE APELLIDOS".
```cs
Console.WriteLine("Escribe tu nombre de la forma (APELLIDOS, NOMBRE)");
string texto = Console.ReadLine();

// Encontrar la posicion de la coma
int posicionComa = texto.IndexOf(",");
int inicioNombre = posicionComa + 2;

Console.WriteLine(texto + " la posicion de la coma es " + posicionComa);

string nombre = texto.Substring(inicioNombre, texto.Length - inicioNombre);
string apellidos = texto.Substring(0, posicionComa);

Console.WriteLine(nombre + " - " + apellidos);
```

10) Dada una frase y una palabra, eliminar esa palabra de la frase tantas veces como aparezca, diciendo la frase sin ellas y el número de veces que se ha eliminado. Por ejemplo: dada la frase: “Hola amigo. Como estas amigo. Yo estoy muy bien amigo.”, y la palabra “amigo”, debe devolver: “Hola. Como estas. Yo estoy muy bien.” y mostrar el valor 3, por eliminarlo tres veces. Se debe eliminar la palabra, y el espacio en blanco anterior si lo hubiera.
```cs
//Console.WriteLine("Escribe una frase por teclado: ");
//string frase = Console.ReadLine();
string frase = "Hola amigo. Como estas amigo. Yo estoy muy bien amigo.";
//Console.WriteLine("Escribe un palabra para eliminar de la frase: ");
//string palabraDel = Console.ReadLine();
string palabra = "amigo";

// Contador para almacenar el número de veces que se elimina la palabra
int contador = 0;

// Bucle para eliminar la palabra de la frase
while (frase.Contains(palabra))
{
    // Encuentra la posición de la palabra en la frase
    int indice = frase.IndexOf(palabra);

    // Elimina la palabra y el espacio en blanco anterior si lo hay
    frase = frase.Remove(indice - 1, palabra.Length + 1);

    // Incrementa el contador
    contador++;
}

// Muestra la frase resultante y el número de veces que se eliminó la palabra
Console.WriteLine(frase);
Console.WriteLine($"Número de veces que se eliminó la palabra: {contador}");
```

11) Introducir por teclado una frase y a continuación visualizar cada palabra de la frase, una debajo de otra, seguida cada palabra del número de letras que compone dicha palabra.
```cs
Console.WriteLine("frase: ");
string frase = Console.ReadLine();
int indiceLetra = 0;
int letrasPalabra = 0;

while (indiceLetra < frase.Length)
{
    if (frase[indiceLetra] != ' ')
    {
        letrasPalabra++;
        Console.Write(frase[indiceLetra]);
    }
    else
    {
        Console.Write("\t" + letrasPalabra);
        Console.WriteLine();
        letrasPalabra = 0;
    }

    // Verifica si estamos en la última letra e imprime la cantidad de letras de la última palabra
    if (indiceLetra == frase.Length - 1)
    {
        Console.Write("\t" + letrasPalabra);
    }

    indiceLetra++;
}

/* ------------------------------------------------------------------ */

Console.WriteLine("Introduce una frase: ");
string frase = Console.ReadLine();

// Dividir la frase en palabras
string[] palabras = frase.Split(' ');

// Recorrer cada palabra e imprimirla junto con su longitud
foreach (string palabra in palabras)
{
	Console.WriteLine($"{palabra}\t{palabra.Length}");
}
```

12) Desarrolla un programa que devuelva una cadena con un carácter repetido n veces, siendo n solicitado por teclado.
```cs
```

13) Programa que, dada una cadena de caracteres, elimine los caracteres en blanco a la izquierda de una cadena y la muestre por pantalla.
```cs
```

14) Dada una cadena de caracteres, elimina los caracteres en blanco a la derecha de la cadena y la muestre por pantalla.
```cs
```

15) Dada una cadena de caracteres, elimina los espacios en blanco a ambos extremos de la cadena y la muestra por pantalla.
```cs
```

16) Un palíndromo es una palabra que se lee igual hacia adelante que hacia atrás. Dada una cadena de caracteres por teclado, mostrar si la cadena es un palíndromo o no.
```cs
```

17) Un número capicúo se refiere a cualquier número que se lee igual de izquierda a derecha y de derecha a izquierda. Dado un número por teclado, devolver si se trata de un capicúo o no.
```cs
```

18) Dada una cadena de caracteres, determina la cantidad de minúsculas y mayúsculas que contiene la cadena.
```cs
```

19) Calcula la cantidad de veces que se repite un carácter dado en una cadena.
```cs
```

20) Dado un código ISBN (identificador de libros) saber si este código es un ISBN válido (aplicar el de 13 dígitos).
```cs
```
