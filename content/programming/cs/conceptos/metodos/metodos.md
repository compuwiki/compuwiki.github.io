# Métodos en CS

```cs
public static <tipo> <ID_funciones> (<parametros>)
```

Ejemplo:

```cs
static int absoluto(int num)
{
 int result;
 if (num < 0)
  result = - num;
 else
  result = num;
 return result;
}

static void separador()
{
 for (int i = 0; i < 30; i++)
 {
  Console.WriteLine("-");
 }
 Console.WriteLine();
}
```

- Que aparezca el `return` solo una vez y al final para seguir la programación estructurada.

---
