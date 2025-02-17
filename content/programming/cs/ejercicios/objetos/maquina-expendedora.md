
Devolver el cambio de una compra, calculando el cambio con el menor número posible de billetes y monedas. Supongamos no manejamos céntimos (solo euros) y que tenemos una cantidad ilimitada de monedas (de 2 y 1 €) y billetes (de 500, 200, 100, 50, 20, 10 y 5 €)

```cs
int compra = 70;
int importe = 73;
int devolucion = importe - compra;
int[] tipo_billete = { 500, 200, 100, 50, 20, 10, 5, 2, 1 };
int[] cantidad_billete_devuelto = new int[9];
const string EUR = "EUR";

if (devolucion < 0)
{
    throw new Exception("Falta dinero por pagar");
}

for (int i = 0; i < tipo_billete.Length && devolucion > 0; i++)
{
    if (tipo_billete[i] <= devolucion)
    {
        cantidad_billete_devuelto[i] = devolucion / tipo_billete[i];
        // resto de la división
        devolucion %= tipo_billete[i]; 
    }
}

/*
for (int i = 0; i < tipo_billete.Length; i++)
{
    while (devolucion >= tipo_billete[i])
    {
        cantidad_billete_devuelto[i]++;
        devolucion -= tipo_billete[i];
    }
}
*/

Console.WriteLine($"Compra: {compra} {EUR} \nImporte: {importe} {EUR} \nDevolución: {importe - compra} {EUR}");

for (int i = 0; i < cantidad_billete_devuelto.Length; i++)
{
	if (cantidad_billete_devuelto[i] > 0)
	{
		if (i <= 6)
		{
			Console.WriteLine($"\tBillete de {tipo_billete[i]} {EUR}: {cantidad_billete_devuelto[i]}");
        }
        else
		{
			Console.WriteLine($"\tMoneda de {tipo_billete[i]} {EUR}: {cantidad_billete_devuelto[i]}");
		}
    }
}
```
