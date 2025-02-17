---
title: Rust
---

Rust es un lenguaje de programación de sistemas enfocado en la seguridad y el rendimiento. Desarrollado por Mozilla, Rust se destaca por su sistema de gestión de memoria sin necesidad de un recolector de basura, lo que lo hace ideal para aplicaciones de alto rendimiento, como sistemas embebidos, navegadores y juegos.

## Características principales

### 1. Seguridad de memoria

Rust evita errores comunes de memoria como desbordamientos de búfer y uso de memoria después de liberarla mediante su sistema de "ownership" (propiedad) y "borrowing" (préstamo).

### 2. Alto rendimiento

Compila a código máquina eficiente y tiene un rendimiento comparable al de C y C++.

### 3. Concurrencia segura

Ofrece primitivas para la programación concurrente sin los riesgos de condiciones de carrera.

### 4. Ecosistema moderno

Rust cuenta con herramientas avanzadas como `cargo` (su gestor de paquetes y compilación) y `rustfmt` para formateo de código.

## Instalación de Rust

Para instalar Rust, se recomienda usar `rustup`:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Luego, puedes verificar la instalación con:

```sh
rustc --version
```

## Primer programa en Rust

```rust
fn main() {
    println!("Hola, mundo!");
}
```

Guarda el archivo como `main.rs` y compílalo con:

```sh
rustc main.rs
./main
```

## Sistema de propiedad

Rust utiliza un modelo de propiedad para la memoria:

```rust
fn main() {
    let x = String::from("Hola");
    let y = x; // x se mueve a y y ya no es válido
    // println!("{}", x); // Esto generaría un error
    println!("{}", y);
}
```

Para evitar transferir la propiedad, se puede usar referencias:

```rust
fn main() {
    let x = String::from("Hola");
    imprimir(&x);
    println!("{}", x);
}

fn imprimir(texto: &String) {
    println!("{}", texto);
}
```

## Concurrencia en Rust

Rust permite escribir código concurrente de manera segura utilizando `std::thread`:

```rust
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..5 {
            println!("Hilo secundario: {}", i);
            thread::sleep(Duration::from_millis(500));
        }
    });

    handle.join().unwrap();
}
```

## Conclusión

Rust es un lenguaje poderoso que ofrece seguridad y rendimiento sin comprometer la facilidad de uso. Su comunidad y ecosistema continúan creciendo, convirtiéndolo en una opción cada vez más popular para el desarrollo de software moderno.
