# Ejemplos CS

- Imprimir y contar el número de múltiplos de tres que existen desde el 1 a un número solicitado por teclado.
```cs
int tope;
int contador = 0;

Console.WriteLine("Imprimir y contar número de múltilpos de tres");
Console.Write("Escribe un número: ");
tope = Convert.ToInt32(Console.ReadLine());
			
// tope divisible entre 3 para hacerlo más óptimo
for (int i = 3; i <= tope; i=i+3)
{
    if (i % 3 == 0)
    {
	    Console.WriteLine($"{i} es múltiplo de 3");
        contador++; // contador = contador + 1;
    }
    else
    {
	    Console.WriteLine("No es múltiplo de 3");
	}
}
Console.WriteLine("El número {0} tiene {1} múltiplos 3.", tope, contador);
```

- Repetir solicitar número mientras sea distinto de cero.
```csharp
int num;

do
{
	Console.Write("Escribe un número por pantalla: ");
    num = Convert.ToInt32(Console.ReadLine());

    Console.WriteLine("El número es {0}", num);
} while (num != 0);

Console.WriteLine("He salido del programa");
```

- Conversiones
```cs
int dNumber = 1;
string StrNumber = Convert.ToString(dNumber);

Console.WriteLine(dNumber+1);
Console.WriteLine(bNumber);
```

- char
```cs
string strNumber = "40";
char charNumber = strNumber[0];
char letra = 'A';
char letraB;

Console.WriteLine(charNumber);

Console.WriteLine("La siguiente letra de la A es " + Convert.ToChar(letra+1));

Console.WriteLine("La siguiente letra de la A es " + (char)(letra+1));

// Coge la siguiente posición en ASCII
Console.WriteLine(letra+1);
Console.WriteLine(letra+2);
```

```cs
decimal num1 = 32m;
double num2 = 32d;
float num3 = 32f;

Console.WriteLine(num1);
Console.WriteLine(num2);
Console.WriteLine(num3);
```

## Referencias
- [Types in Csharp - Micorosoft](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types)
