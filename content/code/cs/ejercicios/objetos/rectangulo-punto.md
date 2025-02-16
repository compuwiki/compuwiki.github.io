```cs
namespace RectanguloPunto
{
    internal class Punto
    {
        private int x;
        private int y;

        public Punto() { } // Constructor without parameters

        public Punto(int x, int y) // Constructor with parameters
        {
            this.x = x;
            this.y = y;
        }

        public int getX() // Getter method for x
        {
            return x;
        }

        public int getY() // Getter method for y
        {
            return y;
        }

        public void setX(int x) // Setter method for x
        {
            this.x = x;
        }

        public void setY(int y) // Setter method for y
        {
            this.y = y;
        }

    }
    
	internal class Rectangulo
    {
        private int alto;
        private int ancho;
        private Punto posicion;

        public Rectangulo(int x, int y, int alto, int ancho)
        {
			this.ancho = Math.Abs(ancho);
            this.ancho = Math.Abs(alto);
            posicion = new Punto(x, y);
        }

        public int area()
        {
            return alto * ancho;
        }

        public  int getAlto()
        {
            return alto;
        }

        public  int getAncho()
        {
            return ancho;
        }

        public  int getX()
        {
            return posicion.getX();
        }
        public  int getY()
        {
            return posicion.getY();
        }

        public  int perimetro()
        {
            return 2*(ancho + alto);
        }
    }
}

```
