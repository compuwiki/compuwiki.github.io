---
title: DDL (Data Definition Language)
---


- [CREATE](DDL.md#create) (DATABASE, TABLE, FUNCTION, INDEX, VIEW, PROCEDURE, TRIGGER)
- [ALTER](DDL.md#alter) (DATABASE, TABLE, CONSTRAINT)
- [DROP](DDL.md#drop) (DATABASE, TABLE, COLUMN, TRIGGER)
- [DDL non standard](DDL.md#ddl-non-standard)

## Start and configure server and DBMS

```SQL
-- Firstly you need to start the server (Apache, nginx, etc) and Database management system  (MariaDB, PostgresSQL, SQLserver) via GUI o CLI

-- With XAMPP on Windows from the terminal use
PS C:\> cd C:\xampp\mysql\bin\ -- on Linux is /opt/lampp/mysql/bin
PS C:\> ./mysql -u root -p
```

## CREATE

- DATABASE

```sql
CREATE DATABASE test
CREATE DATABASE databasename;
```

- TABLE

```sql
CREATE TABLE IF NOT EXISTS Persons (
    ID INT AUTO_INCREMENT,
    Country INT,
    Company INT,
    Nombre VARCHAR(30),
    Apellido VARCHAR(30),
    PRIMARY KEY (ID),
    CONSTRAINT FK_Persons_Country FOREIGN KEY (Country) REFERENCES Country(ID),
    CONSTRAINT FK_Persons_Company FOREIGN KEY (Company) REFERENCES Company(ID),
) AUTO_INCREMENT = 1;

SHOW CREATE TABLE Orders;
```

- FUNCTION

```sql
CREATE FUNCTION NombreFuncion
    (@Parametro TipoDato)
RETURNS TipoDatoRetorno
AS
BEGIN
    DECLARE @Variable TipoDato;
    SET @Variable = SELECT Columna FROM Tabla WHERE Condicion = @Parametro;
    RETURN @Variable;
END;

SELECT dbo.NombreFuncion(Valor);
```

- INDEX

```sql
CREATE INDEX IX_NombreIndice
ON Tabla(Columna);

SELECT Columna1, Columna2
FROM Tabla
WHERE Columna = Valor;
```

- VIEW

```sql
CREATE VIEW VistaCliente AS
SELECT NombreCliente, NombreContacto
FROM Cliente
WHERE Country = "Brasil";
```

- PROCEDURE

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

-- In SQL server
EXEC sp_columns peliculas

-- In MySQL
DESCRIBE empleados;
SHOW COLUMNS FROM empleados;
```

> [!note] In MySQL you need to use Delimiters to CREATE PROCEDURE "DELIMITER $"

- TRIGGER

```sql
DELIMITER $$

CREATE OR REPLACE TRIGGER tr_change_price
BEFORE INSERT
ON article FOR EACH ROW
BEGIN
    IF NEW.price < 0 THEN
        set NEW.price = 0;
    ELSEIF NEW.price > 1000 THEN
        set NEW.price = 1000;
    END IF;
END
$$
```

## ALTER

- Database

```sql
ALTER DATABASE comp SET DEFAULT CHARACTER SET LATIN9;
```

- Table

```sql
ALTER DATABASE comp SET DEFAULT CHARACTER SET LATIN9;

ALTER TABLE Persons
ADD FOREIGN KEY (Country) REFERENCES Country(ID);

ALTER TABLE Persons
ADD Country INT;

ALTER TABLE Persons
DROP COLUMN Country;

ALTER TABLE Persons
RENAME COLUMN Country to CountryPersons;

-- para MySQL
ALTER TABLE Persons
MODIFY COLUMN Country int(13);

-- para SQL Server
ALTER TABLE Persons
ALTER COLUMN Country int(13);
```

- [CONSTRAINT](https://www.w3schools.com/mysql/mysql_constraints.asp):
  - [NOT NULL](https://www.w3schools.com/mysql/mysql_notnull.asp) - Ensures that a column cannot have a NULL value
  - [UNIQUE](https://www.w3schools.com/mysql/mysql_unique.asp) - Ensures that all values in a column are different
  - [PRIMARY KEY](https://www.w3schools.com/mysql/mysql_primarykey.asp) - A combination of a `NOT NULL` and `UNIQUE`. Uniquely identifies each row in a table
  - [FOREIGN KEY](https://www.w3schools.com/mysql/mysql_foreignkey.asp) - Prevents actions that would destroy links between tables
  - [CHECK](https://www.w3schools.com/mysql/mysql_check.asp) - Ensures that the values in a column satisfies a specific condition
  - [DEFAULT](https://www.w3schools.com/mysql/mysql_default.asp) - Sets a default value for a column if no value is specified
  - [CREATE INDEX](https://www.w3schools.com/mysql/mysql_create_index.asp) - Used to create and retrieve data from the database very quickly

- The CONSTRAINT constraint can be added:

```sql
-- 1. at the column definition
 CREATE TABLE Persons (
     ID int NOT NULL,
     LastName varchar(255) NOT NULL,
     FirstName varchar(255),
     Age int,
     PRIMARY KEY (ID)
 );

-- 2. at the end of table creation
 CREATE TABLE Persons (
     ID int NOT NULL,
     LastName varchar(255) NOT NULL,
     FirstName varchar(255),
     Age int,
     CONSTRAINT PK_Person PRIMARY KEY (ID,LastName)
 );

-- 3. outside the table with an ALTER TABLE (does not matter the order in which the tables were created, e.g. a FK referencing a PK).
 ALTER TABLE Persons
  ADD PRIMARY KEY (ID);

 ALTER TABLE Persons
  ADD CONSTRAINT PK_Person PRIMARY KEY (ID,LastName);
 ```

## DROP

```sql
DROP DATABASE databasename;

DROP TABLE tablename;

DROP COLUMN 'columna';

DROP TRIGGER IF EXISTS tr_change_price;
```

---

## DDL-non-standard

- RENAME

```sql
RENAME TABLE products
TO products_old, products_new TO products;
```

- TRUNCATE

 ```sql
TRUNCATE TABLE Categories;
```
