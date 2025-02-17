---
title: Tipos SQL
---

SQL, acrónimo de Structured Query Language (lenguaje de consulta estructurado), engloba varios tipos de comandos para interactuar con las bases de datos. Estas son las categorías principales:

---

## Data Control Language (DCL)

- [GRANT](#grant)
- [REVOKE](#revoke)
- `LOCK TABLE`

### GRANT

```sql
GRANT privileges ON object TO user;
```

### REVOKE

```sql
REVOKE privileges ON object FROM user;
```

---

## Data Definition Language (DDL)

- [CREATE](#create) (DATABASE, TABLE, FUNCTION, INDEX, VIEW, PROCEDURE, TRIGGER)
- [ALTER](#alter) (DATABASE, TABLE, CONSTRAINT)
- [DROP](#drop) (DATABASE, TABLE, COLUMN, TRIGGER)
- [DDL Non-standard](#ddl-non-standard)

### Inicio y configuración del servidor y del DBMS

```sql
-- Iniciar el servidor (Apache, Nginx, etc.) y DBMS (MariaDB, PostgreSQL, SQL Server) a través de GUI o CLI

-- XAMPP en Windows
PS C:\> cd C:\xampp\mysql\bin\  # On Linux: /opt/lampp/mysql/bin
PS C:\> ./mysql -u root -p
```

### CREATE

- Database

```sql
CREATE DATABASE test;
CREATE DATABASE databasename;
```

- Table

```sql
CREATE TABLE IF NOT EXISTS Persons (
    ID INT AUTO_INCREMENT,
    Country INT,
    Company INT,
    Nombre VARCHAR(30),
    Apellido VARCHAR(30),
    PRIMARY KEY (ID),
    CONSTRAINT FK_Persons_Country FOREIGN KEY (Country) REFERENCES Country(ID),
    CONSTRAINT FK_Persons_Company FOREIGN KEY (Company) REFERENCES Company(ID)
) AUTO_INCREMENT = 1;

SHOW CREATE TABLE Orders;
```

- Function

```sql
CREATE FUNCTION NombreFuncion(@Parametro TipoDato)
RETURNS TipoDatoRetorno
AS
BEGIN
    DECLARE @Variable TipoDato;
    SET @Variable = (SELECT Columna FROM Tabla WHERE Condicion = @Parametro);
    RETURN @Variable;
END;

SELECT dbo.NombreFuncion(Valor);
```

- Index

```sql
CREATE INDEX IX_NombreIndice
ON Tabla(Columna);
```

- View

```sql
CREATE VIEW VistaCliente AS
SELECT NombreCliente, NombreContacto
FROM Cliente
WHERE Country = 'Brasil';
```

- Procedure

```sql
CREATE PROCEDURE NombreProcedimiento
    @Parametro1 TipoDato,
    @Parametro2 TipoDato
AS
BEGIN
    SELECT Columna1, Columna2
    FROM Tabla
    WHERE Condicion = @Parametro1;
END;
```

> **Note:** In MySQL, use `DELIMITER $` to create a procedure.

- Trigger

```sql
DELIMITER $$

CREATE TRIGGER tr_change_price
BEFORE INSERT
ON article FOR EACH ROW
BEGIN
    IF NEW.price < 0 THEN
        SET NEW.price = 0;
    ELSEIF NEW.price > 1000 THEN
        SET NEW.price = 1000;
    END IF;
END;
$$
```

### ALTER

```sql
ALTER DATABASE comp SET DEFAULT CHARACTER SET LATIN9;

ALTER TABLE Persons
ADD FOREIGN KEY (Country) REFERENCES Country(ID);
```

### DROP

```sql
DROP DATABASE databasename;
DROP TABLE tablename;
DROP COLUMN columna;
DROP TRIGGER IF EXISTS tr_change_price;
```

---

## Data Manipulation Language (DML)

- [SELECT](#select)
- [INSERT](#insert)
- [UPDATE](#update)
- [DELETE](#delete)

### SELECT

```sql
SELECT d.department_name, COUNT(e.employee_id) AS num_employees
FROM departments d
INNER JOIN employees e ON d.department_id = e.department_id
WHERE d.department_id IN (
    SELECT department_id
    FROM employees
    GROUP BY department_id
    HAVING COUNT(*) >= 3
)
GROUP BY d.department_name
ORDER BY d.department_name ASC;
```

### INSERT

```sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
```

### UPDATE

```sql
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;
```

### DELETE

```sql
DELETE FROM table_name WHERE condition;
```

---

## Transaction Control Language (TCL)

### COMMIT, ROLLBACK, SAVEPOINT

```sql
START TRANSACTION;
COMMIT;
ROLLBACK;
SAVEPOINT savepoint_name;
ROLLBACK TO SAVEPOINT savepoint_name;
```

---

## Comandos útiles

### SHOW

```sql
SHOW databases;

SHOW PROCEDURE STATUS;
```

### USE

```sql
USE biblioteca;
```

### DESCRIBE OR DESC

```sql
DECRIBE Persona;

DESC Persona;
```

### EXPLAIN

```sql
EXPLAIN SELECT * FROM mytable WHERE id = 1;
```

### DELIMITER

```sql
DELIMITER $$
```

---

This document provides a structured overview of SQL commands categorized under DCL, DDL, DML, DQL, and TCL for easy reference.

## Referencias

- [SQL - W3School](https://www.w3schools.com/sql/default.asp)
- [MySQL - W3School](https://www.w3schools.com/mysql/)
- [PostgreSQL - W3School](https://www.w3schools.com/postgresql/index.php)
- [SQL Server - W3School](https://www.w3schools.com/sql/sql_server.asp)
- [Jose Juan Sancez - Unidad 12](https://josejuansanchez.org/bd/unidad-12-teoria/index.html)
