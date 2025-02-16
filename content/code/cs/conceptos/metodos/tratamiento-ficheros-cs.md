# Tratamiento de ficheros

El tratamiento de ficheros en .NET con C# se hace a través del espacio de nombre System.IO, que contiene tipos[^1] que permiten leer/escribir en archivos y flujos de datos, y tipos que proporcionan soporte básico de archivos y directorios.

[^1]: los tipos son las diferentes estructuras de datos y herramientas proporcionadas por `System.IO` que permiten interactuar con archivos, directorios y flujos de datos en el entorno de desarrollo de .NET con C#.

### Clases para tratar ficheros

- **Fichero texto simple (TXT, CSV)**
  - File: ReadAllText, WriteAllText
  - StreamReader: Read, ReadLine
  - StreamWriter: Write, WriteLine

- **Fichero JSON**
  - JsonSerializer: Deserialize, Serialize

- **Fichero binario**
  - BinaryReader: Read, ReadBoolean, ReadByte, etc.
  - BinaryWriter: Write, WriteBoolean, WriteByte, etc.

- **Fichero (flujo de bytes)**
	- FileStream: Read, ReadByte, Write, WriteByte

## Métodos de lectura y escritura en ficheros

### Fichero texto simple (TXT, CSV)
```cs
// Lectura de fichero TXT
string nombreArchivo = "miarchivo.txt";
using (StreamReader sr = new StreamReader(nombreArchivo))
{
    // string linea;
    // while ((linea = sr.ReadLine()) != null)
    // {
    //     Console.WriteLine(linea);
    // }
        List<string> content = new List<string>();

        using (StreamReader sr = new StreamReader(nombre))
        {
            while (!sr.EndOfStream)
            {
                var line = sr.ReadLine();
                content.Add(line);
            }
        }

}

// Escritura en fichero TXT
using (StreamWriter sw = new StreamWriter(nombreArchivo))
{
    sw.WriteLine("Hola, este es un ejemplo de escritura en archivo.");
}
```

### Fichero JSON

- Usando el espacio de nombres `System.Text.Json` integrado en .NET
```cs
// Lectura de archivo JSON con .NET (lee el fichero entero)
string jsonContent = File.ReadAllText("persona.json");
Persona persona = JsonSerializer.Deserialize<Persona>(jsonString);
// var contenidoFormat = JsonSerializer.Deserialize<dynamic>(jsonContent);
// Dictionary<string, object> contenidoFormat = JsonSerializer.Deserialize<Dictionary<string, object>>(jsonContent);
// Dictionary<string, JsonElement> contenidoFormat = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(jsonContent);

// Escritura de archivo JSON con .NET (escribe el fichero entero)
var persona = new Persona { nombre = "Juan", edad = 30, email = "juan@example.com" };
string jsonString = JsonSerializer.Serialize(persona);
File.WriteAllText("persona.json", jsonString);
```

> [!danger] No se puede usar en el examen ed programación.
> O usando la librería de NuGet [Newtonsoft.Json](https://www.newtonsoft.com/json)
> O con Utf8Json o FastJSON

### Fichero binario
```cs
// Lectura de archivo binario
string nombreArchivo = "miarchivo.bin";
using (BinaryReader br = new BinaryReader(File.Open(nombreArchivo, FileMode.Open)))
{
    int numeroEntero = br.ReadInt32();      // Leer un entero
    double numeroDecimal = br.ReadDouble(); // Leer un número de punto flotante
    string cadena = br.ReadString();        // Leer una cadena
}

// Escritura en archivo binario
string nombreArchivo = "miarchivo.bin";
using (BinaryWriter bw = new BinaryWriter(File.Open(nombreArchivo, FileMode.Create)))
{
    bw.Write(42);             // Escribir un entero
    bw.Write(3.14);           // Escribir un número de punto flotante
    bw.Write("Hola, mundo!"); // Escribir una cadena
}
```

## Ejemplos de ficheros

- txt file
```txt
Esto es un archivo de texto plano
```

- csv file
```csv
Nombre,Edad,Calle,Ciudad,CodigoPostal,TipoTelefono1,NumeroTelefono1,TipoTelefono2,NumeroTelefono2
Juan Pérez,30,Calle Falsa 123,Ciudad de Ejemplo,12345,Casa,555-1234,Trabajo,555-5678
```

- json file
```json
{
    "Nombre": "Juan Pérez",
    "Edad": 30,
    "Direccion": {
        "Calle": "Calle Falsa 123",
        "Ciudad": "Ciudad de Ejemplo",
        "CodigoPostal": "12345"
    },
    "Telefonos": [
        {
            "Tipo": "Casa",
            "Numero": "555-1234"
        },
        {
            "Tipo": "Trabajo",
            "Numero": "555-5678"
        }
    ]
}
```

- binary file (.dat) in Hexadecimal format
```hex
  
```