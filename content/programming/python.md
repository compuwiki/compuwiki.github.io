---
title: Python
---

Python es un lenguaje de programación interpretado, de alto nivel y con una sintaxis clara y concisa. Es ampliamente utilizado en desarrollo web, ciencia de datos, inteligencia artificial, automatización y muchas otras áreas.

## Características de Python

- **Sintaxis sencilla y legible**: Ideal para principiantes y desarrollo rápido.
- **Tipado dinámico**: No es necesario declarar el tipo de una variable.
- **Multiparadigma**: Soporta programación estructurada, orientada a objetos y funcional.
- **Gran ecosistema de bibliotecas**: Existen miles de módulos para casi cualquier tarea.
- **Multiplataforma**: Compatible con Windows, macOS y Linux.

## Instalación de Python

Para instalar Python, puedes descargarlo desde [python.org](https://www.python.org/). También puedes usar un gestor de paquetes como `apt` en Linux o `brew` en macOS:

```sh
sudo apt install python3  # Ubuntu/Debian
brew install python       # macOS
```

## Sintaxis Básica

### Variables y Tipos de Datos

```python
nombre = "Juan"
edad = 25
pi = 3.1416
es_mayor = True
```

### Estructuras de Control

#### Condicionales

```python
if edad >= 18:
    print("Eres mayor de edad")
else:
    print("Eres menor de edad")
```

#### Bucles

```python
for i in range(5):
    print(f"Iteración {i}")

contador = 0
while contador < 5:
    print(f"Contador: {contador}")
    contador += 1
```

### Funciones

```python
def saludar(nombre):
    return f"Hola, {nombre}!"

print(saludar("Ana"))
```

### Programación Orientada a Objetos (POO)

```python
class Persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad

    def presentar(self):
        return f"Soy {self.nombre} y tengo {self.edad} años."

p1 = Persona("Carlos", 30)
print(p1.presentar())
```

## Uso de Bibliotecas Populares

### Manejo de Datos con Pandas

```python
import pandas as pd

data = {"Nombre": ["Ana", "Luis"], "Edad": [25, 30]}
df = pd.DataFrame(data)
print(df)
```

### Gráficos con Matplotlib

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [10, 20, 25, 30]
plt.plot(x, y)
plt.show()
```

## Conclusión

Python es un lenguaje versátil y poderoso que permite desarrollar aplicaciones de manera eficiente. Su facilidad de uso y amplia comunidad lo convierten en una excelente opción para principiantes y expertos.

---

