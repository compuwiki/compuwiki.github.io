---
title: SQL Subquery
---


A subquery is a query nested inside another query.

## Types of subqueries

The SQL standard defines three types of subqueries:

- **Row subqueries**. These are those that return more than one column but a single row.
- Table subqueries. Are those that return one or more columns and zero or more rows.
- Scalar subqueries. Are those that return one column and one row.

Subqueries can be nested in any part of the SELECT syntax:

- SELECT
- FROM
- WHERE
- HAVING

```sql
-- 1. Subquery in SELECT clause
SELECT column1, (SELECT MAX(column2) FROM table2) AS max_value
FROM table1;

-- 2. Subquery in FROM clause
SELECT AVG(porcentmayor)
FROM (SELECT Porcentaje AS porcentmayor
 FROM lenguas WHERE Porcentaje>50.0);

-- 3.1. Subquery in WHERE clause with = (scalar or row subquery)
SELECT nombre_equipo
FROM equipos
WHERE (id_equipo=
 (SELECT DISTINCT id_equipo FROM jugadores
 WHERE numero_goles>0)
);

-- 3.2. Subquery in WHERE clause with IN, ALL, ANY, SOME (non-correlated)
SELECT column1
FROM table1
WHERE column2 IN (SELECT column2 FROM table2
      WHERE condition);

-- 3.3. Subqueryin WHERE clause with (correlated)
SELECT column1
FROM table1 t1
WHERE column2 > (SELECT AVG(column2) FROM table1 t2
     WHERE t2.column3 = t1.column3);

-- 3.4. Subquery in WHERE with EXISTS and NOT EXISTS
SELECT DISTINCT nombre
FROM paises
WHERE EXISTS
 (SELECT * FROM ciudades
 WHERE ciudades.Cod_pais=paises.Cod_pais);

-- 3.5 Subquery in HAVING clause
SELECT producto_id, SUM(monto) AS total_ventas
FROM ventas
GROUP BY producto_id
HAVING SUM(monto) > (SELECT AVG(total_ventas)
      FROM (SELECT SUM(monto) AS total_ventas
       FROM ventas
       GROUP BY producto_id)
       AS subquery);
```

## References

- [Jose Juan Sánchez - Subconsultas](<https://josejuansanchez.org/bd/unidad-09-teoria/index.html#subconsultas-en-la-cl%C3%A1usula-from>]
- [Uso de JOINS vs subconsultas](https://styde.net/uso-de-joins-versus-subconsultas-en-bases-de-datos-mysql/)
