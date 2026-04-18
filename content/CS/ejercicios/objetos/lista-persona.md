```cs
using System;
using System.Collections.Generic;
using System.IO;

// Definición de la clase Persona
public class Persona
{
    public string Nombre { get; set; }
    public int Edad { get; set; }
    public int DniNum { get; set; }
    public char DniLetra { get; set; }

    // Constructor de la clase Persona
    public Persona(string nombre, int edad, int dniNum, char dniLetra)
    {
        Nombre = nombre;
        Edad = edad;
        DniNum = dniNum;
        DniLetra = dniLetra;
    }

    // Sobrescribir método ToString para mostrar la información de la persona
    public override string ToString()
    {
        return $"Nombre: {Nombre}\nEdad: {Edad}\nDNI: {DniNum}-{DniLetra}";
    }
}

// Definición de la clase ListaPersona que hereda de List<Persona>
public class ListaPersona : List<Persona>
{
    private string filePath; // Ruta del archivo de datos

    // Constructor de la clase ListaPersona que recibe la ruta del archivo
    public ListaPersona(string filePath)
    {
        this.filePath = filePath;
        Cargar(); // Cargar datos desde el archivo al crear una instancia
    }

    // Método privado para cargar los datos desde el archivo al iniciar
    private void Cargar()
    {
        if (File.Exists(filePath))
        {
            try
            {
                using (StreamReader reader = new StreamReader(filePath))
                {
                    while (!reader.EndOfStream)
                    {
                        string nombre = reader.ReadLine();
                        int edad = int.Parse(reader.ReadLine());
                        int dniNum = int.Parse(reader.ReadLine());
                        char dniLetra = char.Parse(reader.ReadLine());

                        this.Add(new Persona(nombre, edad, dniNum, dniLetra));

                        // Leer línea vacía que separa cada persona en el archivo
                        reader.ReadLine();
                    }
                }
                Console.WriteLine("Datos cargados correctamente desde el archivo.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al cargar datos desde el archivo: " + ex.Message);
            }
        }
        else
        {
            Console.WriteLine("El archivo de datos no existe. Se creará uno nuevo al guardar.");
        }
    }

    // Método para listar todas las personas en la consola
    public void Listar()
    {
        foreach (var persona in this)
        {
            Console.WriteLine(persona);
            Console.WriteLine();
        }
    }

    // Método para guardar la lista de personas en el archivo de datos
    public void Guardar()
    {
        try
        {
            using (StreamWriter writer = new StreamWriter(filePath))
            {
                foreach (var persona in this)
                {
                    writer.WriteLine(persona.Nombre);
                    writer.WriteLine(persona.Edad);
                    writer.WriteLine(persona.DniNum);
                    writer.WriteLine(persona.DniLetra);
                    writer.WriteLine(); // Separador entre cada persona
                }
            }
            Console.WriteLine("Datos guardados correctamente en el archivo.");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error al guardar datos en el archivo: " + ex.Message);
        }
    }

    // Método para añadir una nueva persona a la lista
    public void Añadir(Persona persona)
    {
        this.Add(persona);
        Console.WriteLine($"Se añadió a {persona.Nombre} a la lista.");
    }

    // Método para quitar una persona de la lista por índice (1-based)
    public void Quitar(int indice)
    {
        // Convertir el índice 1-based a 0-based
        int indexToRemove = indice - 1;

        if (indexToRemove >= 0 && indexToRemove < this.Count)
        {
            Persona personaEliminada = this[indexToRemove];
            this.RemoveAt(indexToRemove);
            Console.WriteLine($"Se quitó a {personaEliminada.Nombre} de la lista.");
        }
        else
        {
            Console.WriteLine("Índice fuera de rango. No se pudo quitar la persona.");
        }
    }
}

        string filePath = "datos-persona.txt";

        // Crear una instancia de ListaPersona
        ListaPersona listaPersonas = new ListaPersona(filePath);

        // Listar personas inicialmente
        Console.WriteLine("Listado de personas inicial:");
        listaPersonas.Listar();

        // Agregar nuevas personas a la lista
        listaPersonas.Añadir(new Persona("Pedro", 34, 12123434, 'F'));
        listaPersonas.Añadir(new Persona("María", 28, 98765432, 'A'));
        listaPersonas.Añadir(new Persona("Juan", 40, 56789012, 'B'));

        // Listar personas después de agregar
        Console.WriteLine("\nListado de personas después de agregar:");
        listaPersonas.Listar();

        // Guardar la lista en el archivo
        listaPersonas.Guardar();

        // Eliminar una persona por índice (ejemplo: eliminar la segunda persona)
        Console.WriteLine("\nEliminando una persona...");
        listaPersonas.Quitar(2); // Elimina la segunda persona de la lista

        // Listar personas después de eliminar
        Console.WriteLine("\nListado de personas después de eliminar:");
        listaPersonas.Listar();

        // Guardar la lista actualizada en el archivo
        listaPersonas.Guardar();

        // Imprimir la ruta completa del archivo al final del programa
        string fullPath = Path.GetFullPath(filePath);
        Console.WriteLine($"\nRuta completa desde: {fullPath}");
```