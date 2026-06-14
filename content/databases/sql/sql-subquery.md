---
title: SQL Subqueries
---

A subquery is a query nested inside another query.

## Types of Subqueries

The SQL standard commonly distinguishes three shapes:

- **Row subqueries**: return multiple columns and one row.
- **Table subqueries**: return one or more columns and zero or more rows.
- **Scalar subqueries**: return one column and one row.

Subqueries can be placed in several SELECT statement clauses:

- SELECT
- FROM
- WHERE
- HAVING

```sql
-- 1. Subquery in SELECT clause
SELECT column1, (SELECT MAX(column2) FROM table2) AS max_value
FROM table1;

-- 2. Subquery in FROM clause
SELECT AVG(percent_above_50)
FROM (
  SELECT Percentage AS percent_above_50
  FROM languages
  WHERE Percentage > 50.0
) AS t;

-- 3.1. Subquery in WHERE with = (scalar or row subquery)
SELECT team_name
FROM teams
WHERE team_id = (
  SELECT DISTINCT team_id
  FROM players
  WHERE goals_scored > 0
);

-- 3.2. Subquery in WHERE with IN/ALL/ANY/SOME (non-correlated)
SELECT column1
FROM table1
WHERE column2 IN (
  SELECT column2
  FROM table2
  WHERE condition
);

-- 3.3. Correlated subquery in WHERE
SELECT column1
FROM table1 t1
WHERE column2 > (
  SELECT AVG(column2)
  FROM table1 t2
  WHERE t2.column3 = t1.column3
);

-- 3.4. Subquery in WHERE with EXISTS/NOT EXISTS
SELECT DISTINCT country_name
FROM countries c
WHERE EXISTS (
  SELECT *
  FROM cities ci
  WHERE ci.country_code = c.country_code
);

-- 3.5. Subquery in HAVING clause
SELECT product_id, SUM(amount) AS total_sales
FROM sales
GROUP BY product_id
HAVING SUM(amount) > (
  SELECT AVG(total_sales)
  FROM (
    SELECT SUM(amount) AS total_sales
    FROM sales
    GROUP BY product_id
  ) AS sq
);
```

## References

- [Subqueries (SQL) - W3Schools](https://www.w3schools.com/sql/sql_subqueries.asp)
- [MySQL Subquery - GeeksforGeeks](https://www.geeksforgeeks.org/mysql-subquery/)
