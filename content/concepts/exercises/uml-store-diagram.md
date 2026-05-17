---
title: UML Diagram — Digital Store Exercise
tags: [exercise, uml, oop, plantuml]
---

Modeling a digital store that sells three product types: video games, movies, and comics. Two diagram variants show the evolution from simple inheritance to a design that extracts shared metadata into composed value objects.

## Simple inheritance

Three classes inheriting from a single `Product` base.

```plantuml
@startuml
class Product {
  - id: int
  - name: string
  - price: float
  - duration: int  // duration in minutes or page count
  - genre: string
  - kind: string   // console, studio, or author
  + getId(): int
  + getName(): string
  + getPrice(): float
  + getDuration(): int
  + getGenre(): string
  + getKind(): string
  + setId(id: int): void
  + setName(name: string): void
  + setPrice(price: float): void
  + setDuration(duration: int): void
  + setGenre(genre: string): void
  + setKind(kind: string): void
}

class VideoGame {
  - console: string
  + getConsole(): string
  + setConsole(console: string): void
}

class Movie {
  - studio: string
  + getStudio(): string
  + setStudio(studio: string): void
}

class Comic {
  - author: string
  + getAuthor(): string
  + setAuthor(author: string): void
}

Product <|-- VideoGame
Product <|-- Movie
Product <|-- Comic
@enduml
```

## With composed metadata

`Duration` and `ProductKind` become their own classes referenced by `Product` via composition.

```plantuml
@startuml
class Product {
  - id: int
  - name: string
  - price: float
  - duration: Duration
  - kind: ProductKind
  + getId(): int
  + getName(): string
  + getPrice(): float
  + getDuration(): Duration
  + getKind(): ProductKind
  + setId(id: int): void
  + setName(name: string): void
  + setPrice(price: float): void
  + setDuration(duration: Duration): void
  + setKind(kind: ProductKind): void
}

class Duration {
  - value: int // minutes or page count
  + getValue(): int
  + setValue(value: int): void
}

class ProductKind {
  - description: string // console, studio, or author
  - genre: string
  + getDescription(): string
  + setDescription(description: string): void
  + getGenre(): string
  + setGenre(genre: string): void
}

class VideoGame extends Product
class Movie extends Product
class Comic extends Product

Product --> Duration
Product --> ProductKind
@enduml
```
