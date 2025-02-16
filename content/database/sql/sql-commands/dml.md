---
tit: DML (Data Manipulation Language)
---

- QL (Query Language)
  - [SELECT](DML.md#select)
- DSDL (Data Storage Definition Language)
  - [INSERT](DML.md#insert)
  - [UPDATE](DML.md#update)
  - [DELETE](DML.md#delete)
- [DML non standard](DML.md#dml-non-standard)

## SELECT

```sql
-- 1. SELECT
-- 2. FROM
-- 3. JOIN
-- 4. WHERE
-- 5. GROUP BY
-- 6. HAVING
-- 7. ORDER BY

SELECT d.department_name, COUNT(e.employee_id) AS num_employees
FROM departments d
INNER JOIN employees e ON d.department_id = e.department_id
WHERE d.department_id IN (
 -- Subquery
    SELECT department_id
    FROM employees
    GROUP BY department_id
    HAVING COUNT(*) >= 3
)
GROUP BY d.department_name
ORDER BY d.department_name ASC;
```

- View CONSTRAINT

```sql
SELECT *
FROM information_schema.table_constraints
WHERE constraint_schema = "academia";
```

## INSERT

```SQL
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

-- With multiple rows
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...), (value1, value2, value3, ...), (...);
```

## UPDATE

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

## DELETE

```sql
DELETE FROM table_name WHERE condition;

CALL PA_palabra;
```

---

## DML-non-standard

- CALL

```sql
CALL PA_palabra('casa');
```

- MERGE (SQL server)

```sql
MERGE INTO target_table AS T
USING source_table AS S
ON T.id = S.id
WHEN MATCHED THEN
    UPDATE SET T.column1 = S.column1, T.column2 = S.column2
WHEN NOT MATCHED THEN
    INSERT (id, column1, column2)
    VALUES (S.id, S.column1, S.column2)
WHEN NOT MATCHED BY SOURCE THEN
    DELETE;
```
