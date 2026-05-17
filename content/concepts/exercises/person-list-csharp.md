---
title: Person List (C# File I/O Exercise)
tags: [exercise, csharp, file-io, oop]
---

A `Person` class plus a `PersonList` that inherits from `List<Person>` and persists entries to a text file. Demonstrates inheritance from a generic collection, basic file I/O with `StreamReader` / `StreamWriter`, and constructor-based initialization.

```cs
using System;
using System.Collections.Generic;
using System.IO;

public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    public int DniNumber { get; set; }
    public char DniLetter { get; set; }

    public Person(string name, int age, int dniNumber, char dniLetter)
    {
        Name = name;
        Age = age;
        DniNumber = dniNumber;
        DniLetter = dniLetter;
    }

    public override string ToString()
        => $"Name: {Name}\nAge: {Age}\nDNI: {DniNumber}-{DniLetter}";
}

public class PersonList : List<Person>
{
    private readonly string filePath;

    public PersonList(string filePath)
    {
        this.filePath = filePath;
        Load();
    }

    private void Load()
    {
        if (!File.Exists(filePath))
        {
            Console.WriteLine("Data file does not exist. A new one will be created on save.");
            return;
        }

        try
        {
            using var reader = new StreamReader(filePath);
            while (!reader.EndOfStream)
            {
                string name = reader.ReadLine();
                int age = int.Parse(reader.ReadLine());
                int dniNumber = int.Parse(reader.ReadLine());
                char dniLetter = char.Parse(reader.ReadLine());
                this.Add(new Person(name, age, dniNumber, dniLetter));
                reader.ReadLine(); // blank separator
            }
            Console.WriteLine("Data loaded successfully.");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error loading data: " + ex.Message);
        }
    }

    public void List()
    {
        foreach (var person in this)
        {
            Console.WriteLine(person);
            Console.WriteLine();
        }
    }

    public void Save()
    {
        try
        {
            using var writer = new StreamWriter(filePath);
            foreach (var person in this)
            {
                writer.WriteLine(person.Name);
                writer.WriteLine(person.Age);
                writer.WriteLine(person.DniNumber);
                writer.WriteLine(person.DniLetter);
                writer.WriteLine();
            }
            Console.WriteLine("Data saved successfully.");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error saving data: " + ex.Message);
        }
    }

    public void AddPerson(Person person)
    {
        this.Add(person);
        Console.WriteLine($"Added {person.Name} to the list.");
    }

    public void RemoveAtIndex(int oneBasedIndex)
    {
        int index = oneBasedIndex - 1;
        if (index < 0 || index >= this.Count)
        {
            Console.WriteLine("Index out of range.");
            return;
        }
        var removed = this[index];
        this.RemoveAt(index);
        Console.WriteLine($"Removed {removed.Name} from the list.");
    }
}

// Usage
string filePath = "person-data.txt";
var people = new PersonList(filePath);
people.List();
people.AddPerson(new Person("Pedro", 34, 12123434, 'F'));
people.AddPerson(new Person("Maria", 28, 98765432, 'A'));
people.AddPerson(new Person("Juan", 40, 56789012, 'B'));
people.Save();
people.RemoveAtIndex(2);
people.List();
people.Save();
Console.WriteLine($"Full path: {Path.GetFullPath(filePath)}");
```
