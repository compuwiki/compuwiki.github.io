## EJE0405. Ejercicios de arrays y vectores

1) Solicitar 10 números por teclado y calcular su media aritmética.
```cs
int NUMT = 10;
int numSolicitado = 0;
double[] numeros = new double[NUMT];
double sumaTotal = 0;
double media;

// Hace una vuelta de más
// Otra forma más óptima es hacer una llamada anticipada y luego hacer un while
do
{
    Console.Write("Escribe número: ");
    numeros[numSolicitado] = Convert.ToDouble(Console.ReadLine());
    numSolicitado++;
} while (numSolicitado < NUMT);

for (int indice = 0; indice < NUMT; indice++)
{
	sumaTotal += numeros[indice];
}

media = sumaTotal / NUMT;
Console.WriteLine($"La media es {media}");
```

2) Solicitar 10 números por teclado. A continuación, solicitar otro. Buscar ese último número entre los 10 primeros y decir, en el caso de que esté, en qué lugar fue introducido.
```cs
int NUMT = 3;
int numSolicitado = 0;
double[] numeros = new double[NUMT];
double sumaTotal = 0;

// hacemos un bucle mientras los números solicitados sea menor que 10
while (numSolicitado < NUMT)
{
    Console.Write("Escribe número: ");
    numeros[numSolicitado] = Convert.ToDouble(Console.ReadLine());
    numSolicitado++;
}

Console.Write("Escribe un nuevo número para saber si está en listado: ");
double numCompara = Convert.ToDouble(Console.ReadLine());
int i = 0;
while ( i < NUMT)
{
	if (numCompara == numeros[i])
	{
		Console.WriteLine($"Número {numCompara} encontrado, se encuentra en la posición {i+1}");
	}
	i++;
}

/* ------------------------------------------------------- */

int[] numeros = new int[10];

Console.WriteLine("Introduce 10 números:");

for (int i = 0; i < 10; i++)
{
	Console.Write($"Número {i + 1}: ");
	numeros[i] = Convert.ToInt32(Console.ReadLine());
}

Console.Write("Ahora introduce otro número: ");
int numeroBuscado = Convert.ToInt32(Console.ReadLine());

int posicion = Array.IndexOf(numeros, numeroBuscado);

if (posicion != -1)
{
	Console.WriteLine($"El número {numeroBuscado} fue introducido en la posición {posicion + 1}.");
}
else
{
	Console.WriteLine($"El número {numeroBuscado} no fue encontrado entre los 10 primeros.");
}
```

3) Solicitar 10 números distintos por teclado y mostrarlos.
```cs
int NUMTOTAL = 3;
int[] numeros = new int[NUMTOTAL];

Console.WriteLine("Introduce {0} números distintos:", NUMTOTAL);

for (int i = 0; i < NUMTOTAL; i++)
{
    Console.Write($"Número {i + 1}: ");
    numeros[i] = Convert.ToInt32(Console.ReadLine());

    for (int j = 0; j < i; j++)
    {
        while (numeros[i] == numeros[j])
        {
            Console.Write("Número repetido, introduce otro: ");
            numeros[i] = Convert.ToInt32(Console.ReadLine());
        }
    }
}

Console.WriteLine("Los números introducidos son:");

foreach (var numero in numeros)
{
    Console.WriteLine(numero);
}
```

4) Solicitar una cantidad no definida de datos y calcular su suma. Debe estar preparado para un máximo de 100 números, que pedirá de uno en uno. Cuando se introduzca un valor cero, mostrará la suma de todos los anteriores y dará el número de datos introducidos.
```cs

```


5) Crear un programa que pida al usuario 10 números decimales, calcule su media y luego muestre los que están por encima de la media.
```cs

```

6) Recogidos los datos del nombre de diez alumnos, y la nota que han obtenido en un examen, calcular la media de las notas de los diez alumnos, e indicar el nombre de los alumnos que tienen una nota inferior a la media.
```cs

```

7) Crear un string con 100 letras entre la A y la Z de forma aleatoria. A continuación, calcular cuántas veces aparece cada letra en dicho string, y mostrar este resultado por pantalla, indicando la letra, y el número de veces que aparece.
Se tiene la siguiente información:
- Nombres de 4 empleados.
- Ingresos en concepto de sueldo, cobrado por cada empleado, en los últimos 3 meses.
Realizar un programa para:
- Realizar el ingreso de la información mencionada.
- Generar un vector que contenga el ingreso acumulado en sueldos en los últimos 3 meses para cada operario.
- Mostrar por pantalla el total pagado en sueldos a todos los operarios en los últimos 3 meses
- Obtener el nombre del operario que tuvo el mayor ingreso acumulado.
```cs

```

8) Solicitar 10 números por teclado y mostrarlos de menor a mayor.
```cs
//int NUMT = 4;
//int[] nums = new int[NUMT];

//for (int i = 0; i < NUMT; i++)
//{
    //Console.Write("Introduce numero: ");
    //nums[i] = Convert.ToInt32(Console.ReadLine());
//}

int[] nums = { 23, 43453, 232, 22, 567, 234, 87545, 1, 214, 567 };
int NUMT = nums.Length;

// Ordenación de menor a mayor. Método burbuja.
for (int i = 0; i < NUMT - 1; i++)
{
    for (int j = i + 1; j < NUMT - 1; j++)
    {
	    if (nums[j] < nums[i])
	    {
		    int temp = nums[i];
		    nums[i] = nums[j];
		    nums[j] = temp;
	    }
    }
    /* for (int j = 0; j < NUMT - i - 1; j++)
    {
	    if (nums[j] > nums[j + 1])
	    {
		    int temp = nums[j];
		    nums[j] = nums[j + 1];
		    nums[j + 1] = temp;
	    }
    } */
}
Console.Write("Array ordenado de menor a mayor: ");
foreach (var num in nums)
{
    Console.Write(num + " ");
}
```
