# Diagrama UML
## Ejercicio 3 (tienda digital)

Heredar = recibir
Donar = dar

- Diagrama simple, 3 clases que heredan de 1 clase base o 1 clase base que sirve como superclase para 3 clases derivadas
```plantuml
@startuml
class Producto {
  - id: int
  - nombre: string
  - precio: float
  - duracion: int  // Duración en minutos o número de páginas
  - genero: string
  - tipo: string   // Tipo adicional para especificar consola, empresa, o autor
  + getId(): int
  + getNombre(): string
  + getPrecio(): float
  + getDuracion(): int
  + getGenero(): string
  + getTipo(): string
  + setId(id: int): void
  + setNombre(nombre: string): void
  + setPrecio(precio: float): void
  + setDuracion(duracion: int): void
  + setGenero(genero: string): void
  + setTipo(tipo: string): void
}

class Videojuego {
  - consola: string
  + getConsola(): string
  + setConsola(consola: string): void
}

class Pelicula {
  - empresa: string
  + getEmpresa(): string
  + setEmpresa(empresa: string): void
}

class Comic {
  - autor: string
  + getAutor(): string
  + setAutor(autor: string): void
}

Producto <|-- Videojuego
Producto <|-- Pelicula
Producto <|-- Comic
@enduml
```

---

- Diagrama algo más complejo: 1 clase base, 3 clases derivadas, 2 clases adicionales relacionadas por composición
```plantuml
@startuml
class Producto {
  - id: int
  - nombre: string
  - precio: float
  - duracion: DuracionProducto
  - tipo: TipoProducto
  + getId(): int
  + getNombre(): string
  + getPrecio(): float
  + getDuracion(): DuracionProducto
  + getTipo(): TipoProducto
  + setId(id: int): void
  + setNombre(nombre: string): void
  + setPrecio(precio: float): void
  + setDuracion(duracion: DuracionProducto): void
  + setTipo(tipo: TipoProducto): void
}

class DuracionProducto {
  - duracion: int // Duración en minutos o número de páginas
  + getDuracion(): int
  + setDuracion(duracion: int): void
}

class TipoProducto {
  - descripcion: string // Consola, empresa o autor
  - genero: string
  + getDescripcion(): string
  + setDescripcion(descripcion: string): void
  + getGenero(): string
  + setGenero(genero: string): void
}

class Videojuego extends Producto {
  + getTipo(): TipoProducto
  + setTipo(tipo: TipoProducto): void
}

class Pelicula extends Producto {
  + getDuracion(): DuracionProducto
  + setDuracion(duracion: DuracionProducto): void
  + getTipo(): TipoProducto
  + setTipo(tipo: TipoProducto): void
}

class Comic extends Producto {
  + getDuracion(): DuracionProducto
  + setDuracion(duracion: DuracionProducto): void
  + getTipo(): TipoProducto
  + setTipo(tipo: TipoProducto): void
}

Producto --> DuracionProducto
Producto --> TipoProducto
@enduml
```
