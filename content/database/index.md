---
title: Bases de Datos
tags: [database, sql, no-sql]
---

Una base de datos es un sistema estructurado para almacenar, gestionar y recuperar información de manera eficiente. Se utilizan en casi todas las aplicaciones modernas, desde sitios web hasta sistemas empresariales.

## Conceptos Claves

- **Entidad**: Representa un objeto del mundo real (ej. un usuario, un producto).
- **Atributo**: Característica o propiedad de una entidad (ej. nombre, precio).
- **Clave primaria**: Identificador único de un registro en una tabla.
- **Clave foránea**: Relación entre dos tablas a través de una clave primaria.
- **Índices**: Optimizan la velocidad de consulta en una base de datos.

## Tipos de Bases de Datos

### Bases de Datos Relacionales (SQL)

Las bases de datos relacionales organizan la información en tablas con relaciones estructuradas. Utilizan SQL como lenguaje principal.

🔗 [Bases de Datos SQL](./database/sql/sql.md)

Ejemplo de una tabla SQL:

```sql
CREATE TABLE Usuarios (
    id INT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE
);
```

### Bases de Datos No Relacionales (NoSQL)

Las bases de datos NoSQL almacenan información en formatos más flexibles como documentos, grafos o clave-valor. Son ideales para datos no estructurados o con gran escalabilidad.

🔗 [Bases de Datos NoSQL](./database/no-sql/no-sql.md)

Ejemplo de un documento en MongoDB (JSON):

```json
{
    "id": 1,
    "nombre": "Juan",
    "email": "juan@example.com"
}
```

## Recursos Adicionales

- [Introducción a SQL](https://www.w3schools.com/sql/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
