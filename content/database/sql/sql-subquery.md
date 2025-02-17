---
title: Subconsultas SQL
---

Una subconsulta es una consulta anidada dentro de otra consulta.

## Tipos de subconsultas

El estándar SQL define tres tipos de subconsultas:

- **Subconsultas de fila**. Son aquellas que devuelven más de una columna pero una sola fila.
- Subconsultas de tabla. Son aquellas que devuelven una o más columnas y cero o más filas.
- Subconsultas escalares. Son aquellas que devuelven una columna y una fila.

Las subconsultas pueden anidarse en cualquier parte de la sintaxis SELECT:

- SELECT
- FROM
- WHERE
- HAVING

```sql
-- 1. Subconsulta en la cláusula SELECT
SELECT column1, (SELECT MAX(column2) FROM table2) AS max_value
FROM table1;

-- 2. Subconsulta en la cláusula FROM
SELECT AVG(porcentmayor)
FROM (SELECT Porcentaje AS porcentmayor
 FROM lenguas WHERE Porcentaje>50.0);

-- 3.1. Subconsulta en la cláusula WHERE con = (subconsulta escalar o de fila)
SELECT nombre_equipo
FROM equipos
WHERE (id_equipo=
 (SELECT DISTINCT id_equipo FROM jugadores
 WHERE numero_goles>0)
);

-- 3.2. Subconsulta en la cláusula WHERE con IN, ALL, ANY, SOME (no correlacionada)SELECT column1
FROM table1
WHERE column2 IN (SELECT column2 FROM table2
      WHERE condition);

-- 3.3. Subconsulta en la cláusula WHERE con (correlacionada)
SELECT column1
FROM table1 t1
WHERE column2 > (SELECT AVG(column2) FROM table1 t2
     WHERE t2.column3 = t1.column3);

-- 3.4. Subconsulta en WHERE con EXISTS y NOT EXISTS
SELECT DISTINCT nombre
FROM paises
WHERE EXISTS
 (SELECT * FROM ciudades
 WHERE ciudades.Cod_pais=paises.Cod_pais);

-- 3.5 Subconsulta en la cláusula HAVING
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
