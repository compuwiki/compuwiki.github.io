---
title: SQL database
---

## Relational databases

In a relational database, primary keys and foreign keys play a crucial role in structuring tables and establishing relationships between them.

- **Primary Key:** A primary key is a field or set of fields that uniquely identifies each record in a table. Its use ensures data integrity and facilitates efficient querying.
- **Foreign Key:** A foreign key is a field or set of fields in a table that establishes a relationship with the primary key of another table. This allows for linking between tables and performing relational operations.

### Importance of Primary and Foreign Keys

While not mandatory, it's recommended that each table has a primary key to ensure record uniqueness. Foreign keys are used to establish relationships between tables, enabling efficient querying and maintaining referential integrity in the database.

### Concept of tables

- Column: Attribute or Field / (Columna = atributo = campo)
- Row: Record or Tuple / (Fila = Registro = Tupla)
_Cell = value of a field_

### Establishing Relationships Without Foreign Keys

Although using foreign keys is standard for defining table relationships, there are alternative methods to relate data:

1. **Manual Column Matching:** Relating data based on comparing values in specific columns, although this requires careful management to maintain integrity.

2. **Joining Tables Using Queries (JOIN):** It's possible to relate tables in SQL queries using JOIN clauses, without explicit foreign keys.

## Steps to Designing and Creating a Database

1. Defining the Discourse Universe: Identify the scope and requirements of the database, including the type of information to store and end-users.

2. Entity-Relationship (ER) Model Design: Create an ER diagram representing entities, attributes, and key relationships.

3. Normalization: Ensure the ER model is in a normalized form to reduce redundancy and improve data structure.

4. Relational Model Design: Transform the ER design into relational tables that comply with referential integrity rules.

5. Logical Model: Define the data structure with data types, primary keys, foreign keys, and constraints.

6. Physical Model: Decide how the database will be implemented in a specific database management system (DBMS), considering storage, performance, and indexing.

7. Database Creation and SQL: Execute SQL statements to create the database based on the physical design, including table creation, indexes, views, and query/stored procedure definitions.


## Installing an SQL Database

To use an SQL database on a computer, you only need to install 2 things:
- **database server**
    - database server: SQL-Server instance
    - web server: apache-http-server, nginx, IIS-windows-server
- **database client**: phpMyAdmin, DBeaver, Navicat, SQL-Server-Management-Studio

Here are some examples of the complete infrastructure of an SQL Database
    - MySQL with Apache HTTP Server via XAMPP: MySQL + Apache HTTP Server
    - SQL Server with Microsoft IIS: SQL Server + Microsoft IIS
    - PostgreSQL with Nginx: PostgreSQL + Nginx
    - Oracle Database with Oracle HTTP Server: Oracle Database + Oracle HTTP Server

### Using an SQL Database

- **GUI Application (e.g., XAMPP with PHPMyAdmin)**: Launch a graphical interface to manage the web server and connect to the database client for executing queries.

- **Command Line Interface (CLI)**: Start the web server and the database client and interact with the database directly from the terminal (cmd, PowerShell, or bash) using the following commands. This is useful for computer servers. To interact with MySQL you can do `mysql -h localhost -u root -p` or for SQL-server `sc start MSSQLSERVER`. Here are two scripts, one for CMD and the other for bash.

```batch
@echo off
REM Iniciar Apache (XAMPP)
echo Iniciando Apache...
cd "C:\xampp\apache\bin"
httpd.exe
REM Iniciar MySQL (XAMPP)
echo Iniciando MySQL...
cd "C:\xampp\mysql\bin"
mysql_start.bat
echo Servicios de Apache y MySQL iniciados correctamente.
```

```sh
#!/bin/bash
# Función para verificar la existencia de un directorio
check_directory() {
    if [ -d "$1" ]; then
        echo "Directorio $1 encontrado."
        return 0
    else
        echo "Directorio $1 no encontrado."
        return 1
    fi
}
# Verificar la existencia de directorios de configuración de Apache
if check_directory "/etc/httpd"; then
    APACHE_CMD="httpd"
elif check_directory "/etc/apache2"; then
    APACHE_CMD="apache2"
else
    echo "No se encontraron directorios de configuración de Apache (/etc/httpd o /etc/apache2)."
    exit 1
fi
# Iniciar el servicio de Apache
echo "Iniciando Apache ($APACHE_CMD)..."
sudo systemctl start $APACHE_CMD
# Iniciar mariadb versión open-source de mariadb
echo "Iniciando MySQL (mariadb)..."
sudo systemctl start mariadb
echo "Servicios de Apache ($APACHE_CMD) y MySQL iniciados correctamente."
```
