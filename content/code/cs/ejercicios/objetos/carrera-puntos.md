![](carrera-puntos-dibujo.md)


```cs
namespace Objetos1
{
    internal class PuntoDeCarreras
    {
        private int x;
        private int y;
        private char id;
        private static Random azar = new Random();
        private static int meta;

        // Constructor
        public PuntoDeCarreras(int x, int y, char id)
        {
            this.x = x;
            this.y = y;
            this.id = id;
        }

        public PuntoDeCarreras(int x, int y) : this(x, y, 'x') { }

        public char getId() { return id; }

        public static void FijarMeta(int meta)
        {
            if (meta > 0 && meta < 110)
                PuntoDeCarreras.meta = meta;
        }

        public static int getMeta()
        {
            return meta;
        }

        public bool Avanzar(int potencia)
        {
            if (meta > 0)
                if (potencia >= 1 && potencia <= 10)
                    x += azar.Next(1, potencia + 1);
            return x >= meta;
        }

        // Muestra el punto con su propio caracter en la coordenada
        public void Mostrar()
        {
            //Console.SetCursorPosition(x, y);
            //Console.Write(id);
            Imprimir(id);
        }

        public void Ocultar()
        {
            //Console.SetCursorPosition(x, y);
            //Console.Write(' ');
            Imprimir(' ');
        }

        // Creada para no repetir el interior de la función Mostrar() y Ocultar()
        public void Imprimir(char ch)
        {
            Console.SetCursorPosition(x, y);
            Console.Write(ch);
        }

        public static void PruebaPuntoDeCarreras()
        {
            PuntoDeCarreras[] competidores = {
                new PuntoDeCarreras(5, 5, 'ñ'),
                new PuntoDeCarreras(5, 7, '*'),
                new PuntoDeCarreras(5, 9, 'o'),
                new PuntoDeCarreras(5, 11, '>')
            };

            char pulsacion;
            bool fin = false;
            PuntoDeCarreras.FijarMeta(100);
            for (int i = 0; i < 10; i++)
            {
                Console.SetCursorPosition(PuntoDeCarreras.getMeta(), i);
                Console.Write('|');
            }

            foreach (PuntoDeCarreras p in competidores)
                p.Mostrar();

            pulsacion = Console.ReadKey().KeyChar;
            while (pulsacion != 'q' && !fin)
            {
                foreach (PuntoDeCarreras p in competidores)
                    p.Ocultar();

                fin = false;
                foreach (PuntoDeCarreras p in competidores)
                {
                    p.Ocultar();
                    fin = fin || p.Avanzar(10);
                    p.Mostrar();
                }

                pulsacion = Console.ReadKey().KeyChar;
            }
            
            Console.WriteLine("Adiós");
        }
    }
}
```
