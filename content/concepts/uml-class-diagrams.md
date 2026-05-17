---
title: UML Class Diagrams
tags: [uml, oop, design]
---

UML class diagrams are visual tools for understanding the structure and relationships between classes in an object-oriented software system. They provide a clear graphical representation of how classes interact.

## 1. Classes

In a class diagram, classes are represented as rectangles divided into three sections:

- Top: class name.
- Middle: attributes.
- Bottom: methods.

```
+------------+
| Person     |
+------------+
| name       |
| age        |
| address    |
+------------+
| walk()     |
| speak()    |
+------------+
```

## 2. Attributes

Attributes are shown in the middle section. Each attribute has a name and an associated data type.

```
+--------------------+
| Person             |
+--------------------+
| name: string       |
| age: int           |
| address: string    |
+--------------------+
```

## 3. Methods

Methods are shown in the bottom section. Each has a name, parameter list, and return type. Visibility markers:

- `+` public — accessible from anywhere.
- `#` protected — accessible from the class and its subclasses.
- `-` private — accessible only inside the class.

```
+--------------------------+
| Person                   |
+--------------------------+
| + walk()                 |
| + speak(message: string) |
+--------------------------+
```

## 4. Relationships

Relationships between classes are represented by lines connecting them:

- **Association** — a semantic connection between two classes.
- **Aggregation** — one class contains or holds a collection of another.
- **Composition** — stronger aggregation; the parts only exist inside the whole.
- **Inheritance** — a derived class inherits from a base class, shown with a hollow-triangle arrow pointing to the base.
- **Interface implementation** — a class implements an interface, shown with a dashed line.

## 5. Interfaces

Interfaces are drawn like classes but prefixed with the `<<interface>>` stereotype. Implementing classes connect to them with a dashed line.

```
+---------------+
| <<interface>> |
|   IFlyer      |
+---------------+
| + fly()       |
+---------------+
```
