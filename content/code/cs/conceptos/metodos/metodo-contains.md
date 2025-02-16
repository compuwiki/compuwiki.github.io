
## Contains method

- Contains method with loops and conditionals, using estructured programming
```cs
public static class StringExtensions
{
    public static bool Contains(string source, string value)
    {
        if (value == null)
            throw new ArgumentNullException(nameof(value));

        bool containsValue = false;

        if (value.Length == 0)
        {
            containsValue = true; // Una cadena siempre contiene una cadena vacía
        }
        else
        {
            for (int i = 0; i <= source.Length - value.Length && !containsValue; i++)
            {
                bool found = true;

                for (int j = 0; j < value.Length; j++)
                {
                    if (ToLowerInvariant(source[i + j]) != ToLowerInvariant(value[j]))
                    {
                        found = false;
                    }
                }

                containsValue = found;
            }
        }

        return containsValue;
    }

    // Función simple para convertir a minúsculas sin usar ToLowerInvariant
    private static char ToLowerInvariant(char c)
    {
        if (c >= 'A' && c <= 'Z')
        {
            return (char)(c + 32);
        }
        return c;
    }
}
```