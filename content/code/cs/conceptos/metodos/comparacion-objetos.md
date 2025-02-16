```cs
// Definición de la clase Punto

class Object {
    // Determina si el objeto actual es igual a otro objeto.
    public virtual bool Equals(object obj) { return this == obj; }
    
    // Devuelve una cadena que representa el objeto actual.
    public virtual string ToString() { return GetType().FullName; }
}

class Punto
{
    public int X { get; }
    public int Y { get; }
    public Punto(int x, int y)
    {
        X = x;
        Y = y;
    }
    
    public override bool Equals(object obj)
    {
        if (obj == null || GetType() != obj.GetType())
        {
            return false;
        }
        Punto otroPunto = (Punto)obj;
        return (X == otroPunto.X) && (Y == otroPunto.Y);
    }
    
    public override string ToString()
    {
        return $"({X}, {Y})";
    }
}

// Creación de instancias de Punto
Punto p = new Punto(5, 6);
Punto q = new Punto(5, 6);
Punto[] z = { new Punto(5, 6), new Punto(3, 4) };

// Comparación de referencias
if (p == q)
    Console.WriteLine($"{p} y {q} son iguales (referencia)");
else
    Console.WriteLine($"{p} y {q} no son iguales (referencia)");

// Comparación de valores usando Equals
if (p.Equals(q))
    Console.WriteLine($"{p} y {q} son iguales (valores)");
else
    Console.WriteLine($"{p} y {q} no son iguales (valores)");

// Comparación de valores usando Equals
if (p.Contains(z))
    Console.WriteLine($"{p} está en el listado de puntos {z} ");
else
    Console.WriteLine($"{p} no está en el listado de puntos {z} ");
```
