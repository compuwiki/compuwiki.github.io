Juego de la serpiente

Serie de puntos que se crean y borran para avanzar.

- Clase Anillo
```cs
﻿public class Anillo
{
    private const int X_LIM = 110;
    private const int Y_LIM = 25;
    private int x;
    private int y;
    public char id;

    public Anillo(int x, int y, char id)
    {
        this.x = x % (X_LIM + 1);
        this.y = y % (Y_LIM + 1);
        this.id = id;
    }

    public Anillo(int x, int y) : this(x, y, '*') { }

    // Constructor Copia
    public Anillo(Anillo orig) : this(orig.x, orig.y, orig.id) { }

    public int GetX()
    {
	    return x;
    }
    
    public int GetY()
    {
        return y;
    }

    public Anillo Norte()
    {
        if (y == 0)
            y = Y_LIM;
        else
            y--;
        return this;
    }
    
    public Anillo Sur()
    {
        if (y == Y_LIM)
            y = 0;
        else
            y++;
        return this;
    }

    public Anillo Oeste()
    {
        if (x == 0)
            x = X_LIM;
        else
            x--;
        return this;
    }

    public Anillo Este()
    {
        if (x == X_LIM)
            x = 0;
        else
            x++;
        return this;
    }
    
    public void Mostrar()
    {
        Imprimir(id);
    }
    
    public void Ocultar()
    {
        Imprimir(' ');
    }
    
    private void Imprimir(char ch)
    {
        Console.SetCursorPosition(x, y);
        Console.Write(ch);
        Console.SetCursorPosition(0, 0);
    }
}
```

- Atributo Dirección
```cs
﻿enum Direccion
{
    Norte, Sur, Este, Oeste
}
```

- Clase Serpiente
```cs
﻿internal class Serpiente
{
    private LinkedList<Anillo> anillos;
    public Direccion direccion = Direccion.Este;
    private bool yaMostrado = false;

    public Serpiente()
    {
        anillos = new LinkedList<Anillo>();
        anillos.AddLast(new Anillo(10, 12, 'o'));
        anillos.AddLast(new Anillo(9, 12));
        anillos.AddLast(new Anillo(8, 12));
        anillos.AddLast(new Anillo(7, 12));
        anillos.AddLast(new Anillo(6, 12));
        anillos.AddLast(new Anillo(5, 12));
        //anillos.AddFirst(new Anillo(5, 12));
        //anillos.AddFirst(new Anillo(6, 12));
        //anillos.AddFirst(new Anillo(7, 12));
        //anillos.AddFirst(new Anillo(8, 12));
        //anillos.AddFirst(new Anillo(9, 12));
        //anillos.AddFirst(new Anillo(10, 12, 'o'));
    }

    private Anillo Cabeza() { return anillos.First(); }
    private Anillo Cola() { return anillos.Last(); }
    public void Crecer()
    {
        if (yaMostrado)
        {
            Anillo nuevaCabeza = new Anillo(Cabeza());
            Cabeza().id = '*';
            Cabeza().Mostrar();
            anillos.AddFirst(nuevaCabeza);

            switch (direccion)
            {
                case Direccion.Norte:
                    nuevaCabeza.Norte();
                    break;
                case Direccion.Sur:
                    nuevaCabeza.Sur();
                    break;
                case Direccion.Este:
                    nuevaCabeza.Este();
                    break;
                case Direccion.Oeste:
                    nuevaCabeza.Oeste();
                    break;
            }
            nuevaCabeza.Mostrar();
        }
    }

    public void Avanzar()
    {
        Cola().Ocultar();
        anillos.RemoveLast();
        Crecer();
    }
    
    public void Mostrar()
    {
        if (!yaMostrado)
        {
            foreach (Anillo anillo in anillos)
                anillo.Mostrar();
            yaMostrado = true;
        }
    }
}
```

- Clase Main
```cs
﻿internal class Program
{
    static void Main(string[] args)
    {
        PruebaSerpiente();
    }

    private static void PruebaSerpiente()
    {
        ConsoleKeyInfo pulsado;
        // Inicializar objeto llamado Shai Hulud, gusanos gigantes de "Dune"
        Serpiente shai_hulud = new Serpiente();
        shai_hulud.Mostrar();
        
        while ((pulsado = Console.ReadKey()).Key != ConsoleKey.Escape)
        {
            switch (pulsado.Key)
            {
                case ConsoleKey.RightArrow:
                    shai_hulud.direccion = Direccion.Este;
                    break;
                case ConsoleKey.LeftArrow:
                    shai_hulud.direccion = Direccion.Oeste;
                    break;
                case ConsoleKey.UpArrow:
                    shai_hulud.direccion = Direccion.Norte;
                    break;
                case ConsoleKey.DownArrow:
                    shai_hulud.direccion = Direccion.Sur;
                    break;
            }
            if (pulsado.Key == ConsoleKey.Spacebar)
                shai_hulud.Crecer();
            else
                shai_hulud.Avanzar();
        }
        Console.WriteLine("FIN");
    }
}
```