# Métodos para ordenar arrays

Hay varios métodos para ordenar un array de números en C#. Algunos de los métodos más comunes son:

1. **Método `Array.Sort`:** Este método está incorporado en la clase `Array` y ordena los elementos del array en orden ascendente.
2. **Método `Array.Reverse`:** Este método invierte el orden de los elementos en el array.
3. **Método `OrderBy` de LINQ:** Utilizando LINQ, puedes ordenar un array de manera más compleja.
4. **Método `OrderByDescending` de LINQ:** Similar a `OrderBy`, pero ordena de mayor a menor.

   ```csharp
   int[] nums = { 23, 43453, 232, 22, 567, 234, 87545, 1, 214, 567 };
   
   Array.Sort(nums);
   Array.Reverse(nums);
   var orderedNums = nums.OrderBy(num => num).ToArray();
   var descendingNums = nums.OrderByDescending(num => num).ToArray();

   // Ahora 'nums' está ordenado de menor a mayor
   ```

5. Hacer uso de bucles y condicionales siguiendo una estrategia o metodología.

> Existen varias metodologías de ordenación de arrays, cada una con sus propias características y eficiencias. Algunas de las metodologías más conocidas son:

1. **Método de la Burbuja (Bubble Sort):** Este método compara repetidamente pares de elementos adyacentes y los intercambia si están en el orden incorrecto. El proceso se repite hasta que el array esté ordenado.

2. **Método de Selección (Selection Sort):** En este método, se selecciona repetidamente el elemento más pequeño (o más grande) y se intercambia con el primer elemento no ordenado.

3. **Método de Inserción (Insertion Sort):** Este método construye una secuencia ordenada de elementos uno a uno. En cada paso, toma un elemento de la lista y lo inserta en la posición correcta respecto a los elementos ya ordenados.

4. **Merge Sort (Ordenación por Mezcla):** Este algoritmo divide el array en dos mitades, ordena cada mitad por separado y luego fusiona las dos mitades ordenadas para obtener un array completamente ordenado.

5. **Quick Sort (Ordenación Rápida):** Utiliza un enfoque de "divide y vencerás". Se elige un elemento pivote y se particiona el array en dos subarrays, uno con elementos menores que el pivote y otro con elementos mayores. Luego, se aplica el mismo proceso a cada subarray.

6. **Heap Sort (Ordenación por Montículos):** Construye un montículo (un tipo especial de árbol binario) a partir del array y luego extrae sucesivamente el elemento máximo para obtener un array ordenado.

7. **Radix Sort (Ordenación por Radix):** Este algoritmo ordena los elementos basándose en sus dígitos, desde el dígito menos significativo al más significativo o viceversa.

Estos son solo algunos ejemplos, y cada uno tiene sus propias ventajas y desventajas en términos de eficiencia y complejidad. La elección del algoritmo de ordenación depende del tamaño del array, la distribución de datos y otros factores. Algoritmos más avanzados como Merge Sort, Quick Sort y Heap Sort generalmente son más eficientes para grandes conjuntos de datos en comparación con Bubble Sort, Selection Sort o Insertion Sort.

---

Claro, aquí tienes implementaciones básicas en C# para algunos de los algoritmos de ordenación mencionados:

1. **Bubble Sort (Ordenación Burbuja):**
   
```csharp
public static void BubbleSort(int[] arr)
{
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                // Intercambiar elementos si están en orden incorrecto
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
```

2. **Selection Sort (Ordenación por Selección):**

```csharp
public static void SelectionSort(int[] arr)
{
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++)
    {
        int minIndex = i;
        for (int j = i + 1; j < n; j++)
        {
            if (arr[j] < arr[minIndex])
            {
                // Actualizar índice mínimo si encuentra elemento más pequeño
                minIndex = j;
            }
        }

        // Intercambiar elemento mínimo con el primer elemento no ordenado
        int temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }
}
```

3. **Insertion Sort (Ordenación por Inserción):**

```csharp
public static void InsertionSort(int[] arr)
{
    int n = arr.Length;
    for (int i = 1; i < n; i++)
    {
        int key = arr[i];
        int j = i - 1;

        // Mover elementos mayores que key a una posición adelante de su posición actual
        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j = j - 1;
        }

        arr[j + 1] = key;
    }
}
```

Estos son solo ejemplos básicos. Si bien estos algoritmos son educativos, para aplicaciones prácticas en situaciones del mundo real, a menudo es preferible utilizar métodos de ordenación incorporados en la biblioteca estándar de C# como `Array.Sort()` o métodos de LINQ como `OrderBy()`.

Claro, aquí están las implementaciones en C# para otros cuatro algoritmos de ordenación:

4. **Merge Sort (Ordenación por Mezcla):**

```csharp
public static void MergeSort(int[] arr)
{
    if (arr.Length <= 1)
        return;

    int middle = arr.Length / 2;
    int[] left = new int[middle];
    int[] right = new int[arr.Length - middle];

    // Copiar datos a los subarrays izquierdo y derecho
    for (int i = 0; i < middle; i++)
        left[i] = arr[i];
    for (int i = middle; i < arr.Length; i++)
        right[i - middle] = arr[i];

    // Llamadas recursivas para los subarrays
    MergeSort(left);
    MergeSort(right);

    // Mezclar los subarrays ordenados
    Merge(arr, left, right);
}

private static void Merge(int[] arr, int[] left, int[] right)
{
    int i = 0, j = 0, k = 0;

    while (i < left.Length && j < right.Length)
    {
        if (left[i] <= right[j])
        {
            arr[k] = left[i];
            i++;
        }
        else
        {
            arr[k] = right[j];
            j++;
        }
        k++;
    }

    // Copiar elementos restantes de left (si hay alguno)
    while (i < left.Length)
    {
        arr[k] = left[i];
        i++;
        k++;
    }

    // Copiar elementos restantes de right (si hay alguno)
    while (j < right.Length)
    {
        arr[k] = right[j];
        j++;
        k++;
    }
}
```

5. **Quick Sort (Ordenación Rápida):**

```csharp
public static void QuickSort(int[] arr, int low, int high)
{
    if (low < high)
    {
        int partitionIndex = Partition(arr, low, high);

        // Llamadas recursivas para los subarrays antes y después del particionamiento
        QuickSort(arr, low, partitionIndex - 1);
        QuickSort(arr, partitionIndex + 1, high);
    }
}

private static int Partition(int[] arr, int low, int high)
{
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++)
    {
        if (arr[j] < pivot)
        {
            i++;

            // Intercambiar arr[i] y arr[j]
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    // Intercambiar arr[i+1] y arr[high] (poner el pivote en su lugar correcto)
    int tempPivot = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = tempPivot;

    return i + 1;
}
```

6. **Heap Sort (Ordenación por Montículos):**

```csharp
public static void HeapSort(int[] arr)
{
    int n = arr.Length;

    // Construir un montículo (heap)
    for (int i = n / 2 - 1; i >= 0; i--)
        Heapify(arr, n, i);

    // Extraer elementos del montículo uno por uno
    for (int i = n - 1; i >= 0; i--)
    {
        // Intercambiar la raíz (el elemento más grande) con el último elemento no ordenado
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        // Llamar a Heapify en el montículo reducido
        Heapify(arr, i, 0);
    }
}

private static void Heapify(int[] arr, int n, int i)
{
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    // Encontrar el elemento más grande entre el nodo y sus hijos
    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    // Si el elemento más grande no está en el nodo actual, intercambiarlos y llamar a Heapify recursivamente
    if (largest != i)
    {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;

        Heapify(arr, n, largest);
    }
}
```

7. **Radix Sort (Ordenación por Radix):**

```csharp
public static void RadixSort(int[] arr)
{
    int max = GetMax(arr);
    
    // Aplicar ordenación por conteo para cada dígito
    for (int exp = 1; max / exp > 0; exp *= 10)
        CountSort(arr, exp);
}

private static void CountSort(int[] arr, int exp)
{
    int n = arr.Length;
    int[] output = new int[n];
    int[] count = new int[10];

    // Inicializar el array de conteo
    for (int i = 0; i < 10; i++)
        count[i] = 0;

    // Contar la frecuencia de cada dígito en el lugar actual
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;

    // Calcular las posiciones actuales de los elementos en el array de salida
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];

    // Construir el array de salida
    for (int i = n - 1; i >= 0; i--)
    {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    // Copiar el array de salida al array original
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}

private static int GetMax(int[] arr)
{
    int max = arr[0];
    for (int i = 1; i < arr.Length; i++)
    {
        if (arr[i] > max)
            max = arr[i];
    }
    return max;
}
```

Estas implementaciones son bastante estándar y están destinadas a ser educativas. En la práctica, en C#, es más común utilizar las funciones de ordenación incorporadas (`Array.Sort()`, LINQ `OrderBy()`) debido a su eficiencia y facilidad de uso.
