 ## Tabla para cálculo de la letra del DNI

| Resto | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  | 12  | 13  | 14  | 15  | 16  | 17  | 18  | 19  | 20  | 21  | 22  |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Letra | T   | R   | W   | A   | G   | M   | Y   | F   | P   | D   | X   | B   | N   | J   | Z   | S   | Q   | V   | H   | L   | C   | K   | E   |

```cs
int numDNI = 0;
string letras = "TRWAGMYFPDXBNJZSQVHLCKE";
char letra;

Console.Write("Programa para calcular la letra deñ DNI. \nEscribe el número de tu DNI: ");
numDNI = Convert.ToInt32(Console.ReadLine());
letra = letras[numDNI % 23];

Console.WriteLine($"La letra del DNI es {letra}.");
```
