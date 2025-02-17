# Conexión a la base de datos

Si estamos trabajando en un aplicación con interfaz gráfica programada en C# desde Visual Studio y queremos conectarnos a una base de datos Microsoft SQL server, tenemos que hacer uso de la clase `SqlConnection` del espacio de nombres System.Data.SqlClient

De esta forma podremos ejecutar consultas SQL para defnir datos DDL, manejar datos DML, etc.

Para utilizar `SqlConnection`, primero debes agregar la referencia al ensamblado `System.Data.SqlClient` a tu proyecto. Luego, puedes crear una instancia de `SqlConnection` para establecer una conexión con tu base de datos de SQL Server. La cadena de conexión que pases como argumento al constructor de `SqlConnection` debe contener información sobre cómo conectarse a la base de datos, como el servidor, la base de datos, las credenciales de autenticación, etc.

Aquí dos ejemplos básicos para conectarnos a la base de datos SQL server

1. Conexión a la base de datos con constructor de la ventana vacío

```cs
namespace App
{
 public partial class Ventana : Window
 {
  SqlConnection miConexionSql;

     public Ventana()
     {
      InitializeComponent();

         string cadenaConexion = ConfigurationManager.ConnectionStrings["valor de name en App.config"].ConnectionString;
         miConexionSql = new SqlConnection(cadenaConexion);
     }

  // Métodos de la ventana
 }
}
```

2. Conexión a la base de datos con constructor que recibe la cadena de conexión

```cs
namespace App
{
 public partial class Ventana : Window
 {
  private SqlConnection miConexionSql;

  // Constructor de la ventana
  public Ventana()
  {
      InitializeComponent();
      InicializarConexion();

   // InicializarConexion() equivale a esto sin try-catch
   //ConexionSQL conexionSQL = new ConexionSQL();
            //string cadenaConexion = conexionSQL.crearConexion();
            //miConexionSql = new SqlConnection(cadenaConexion);
  }

     // Constructor con sobrecarga, tiene como parámetro de entrada el string de Conexion
     public Consulta(SqlConnection miConexionSql)
        {
            InitializeComponent();
            this.miConexionSql = miConexionSql;
        }

  private void InicializarConexion()
        {
            try
            {
                ConexionSQL conexionSQL = new ConexionSQL();
                string cadenaConexion = conexionSQL.crearConexion();
                miConexionSql = new SqlConnection(cadenaConexion);
            }
            catch (Exception ex)
            {
                // Mostrar excepción
                MessageBox.Show("Error al conectar a la base de datos: " + ex.Message, "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
 }
}
```

Y clase ConexionSQL con método que devuelve la cadena de conexión:

```cs
namespace App
{
    internal class ConexionSQL
    {
        public ConexionSQL() { }

        public string crearConexion ()
        {
            // cambiar la frase de conexión según el equipo
            return ConfigurationManager.ConnectionStrings["valor de name en App.config"].ConnectionString;
        }
    }
}
```
