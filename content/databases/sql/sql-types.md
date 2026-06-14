---
title: SQL Types
---

SQL (Structured Query Language) includes multiple command categories for interacting with databases.

## Data Control Language (DCL)

- GRANT
- REVOKE
- LOCK TABLE

### DCL examples

```sql
GRANT SELECT, INSERT ON testdb.* TO 'app_user'@'localhost';
REVOKE INSERT ON testdb.* FROM 'app_user'@'localhost';
LOCK TABLES Persons READ;
UNLOCK TABLES;
```

## Data Definition Language (DDL)

- CREATE (DATABASE, TABLE, FUNCTION, INDEX, VIEW, PROCEDURE, TRIGGER)
- ALTER (DATABASE, TABLE, COLUMN, CONSTRAINT)
- DROP (DATABASE, TABLE, COLUMN, TRIGGER)

### Server and DBMS Startup/Configuration

```sql
-- Start web server and DBMS through GUI or CLI

-- XAMPP on Windows
PS C:\> cd C:\xampp\mysql\bin\
PS C:\> ./mysql -u root -p
```

### CREATE examples

```sql
CREATE DATABASE test;

CREATE TABLE IF NOT EXISTS Persons (
    ID INT AUTO_INCREMENT,
    Country INT,
    Company INT,
    FirstName VARCHAR(30),
    LastName VARCHAR(30),
    PRIMARY KEY (ID),
    CONSTRAINT FK_Persons_Country FOREIGN KEY (Country) REFERENCES Country(ID),
    CONSTRAINT FK_Persons_Company FOREIGN KEY (Company) REFERENCES Company(ID)
) AUTO_INCREMENT = 1;
```

### ALTER and DROP examples

```sql
ALTER DATABASE comp SET DEFAULT CHARACTER SET LATIN9;

ALTER TABLE Persons
ADD FOREIGN KEY (Country) REFERENCES Country(ID);

DROP DATABASE databasename;
DROP TABLE tablename;
DROP TRIGGER IF EXISTS tr_change_price;
```

## Data Manipulation Language (DML)

- SELECT
- INSERT
- UPDATE
- DELETE

### DML examples

```sql
SELECT * FROM Persons;

INSERT INTO Persons (Country, Company, FirstName, LastName)
VALUES (1, 2, 'John', 'Doe');

UPDATE Persons
SET LastName = 'Smith'
WHERE ID = 1;

DELETE FROM Persons
WHERE ID = 1;
```

## Transaction Control Language (TCL)

- START TRANSACTION
- COMMIT
- ROLLBACK
- SAVEPOINT

### TCL examples

```sql
START TRANSACTION;

UPDATE Persons
SET Company = 3
WHERE ID = 1;

SAVEPOINT before_commit;
COMMIT;

ROLLBACK;
```

## Useful Commands

- SHOW
- USE
- DESC
- EXPLAIN
- DELIMITER

### Useful command examples

```sql
USE test;
SHOW TABLES;
DESC Persons;
EXPLAIN SELECT * FROM Persons;
DELIMITER //
```

## References

- [SQL - W3Schools](https://www.w3schools.com/sql/default.asp)
- [MySQL - W3Schools](https://www.w3schools.com/mysql/)
- [PostgreSQL - W3Schools](https://www.w3schools.com/postgresql/index.php)
- [SQL Server - W3Schools](https://www.w3schools.com/sql/sql_server.asp)
- [Jose Juan Sanchez - Unit 12](https://josejuansanchez.org/bd/unidad-12-teoria/index.html)
