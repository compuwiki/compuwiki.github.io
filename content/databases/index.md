---
title: Databases
tags: [database, sql, nosql]
---

A database is a structured system for storing, managing, and retrieving information. They underpin nearly every modern application.

## Key concepts

- **Entity** — a real-world object (e.g., a user, a product).
- **Attribute** — a property of an entity (e.g., name, price).
- **Primary key** — the unique identifier of a row.
- **Foreign key** — a reference from one table to another's primary key.
- **Index** — speeds up lookups.

## Types

### Relational (SQL)

Tables with structured relations, queried via SQL.

```sql
CREATE TABLE Users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);
```

See [SQL](./sql/).

### Non-relational (NoSQL)

Flexible formats — documents, key-value, columnar, graph — designed for unstructured data and horizontal scaling.

```json
{ "id": 1, "name": "Juan", "email": "juan@example.com" }
```

See [NoSQL](./nosql/).

## References

- [W3Schools SQL](https://www.w3schools.com/sql/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
