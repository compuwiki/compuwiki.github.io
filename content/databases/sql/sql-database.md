---
title: Relational Databases
---

## Relational Databases

In relational databases, primary keys and foreign keys are essential for structuring tables and defining relationships.

- **Primary key**: A field or set of fields that uniquely identifies each row in a table.
- **Foreign key**: A field or set of fields that references a primary key in another table.

## Why Keys Matter

A primary key is strongly recommended to guarantee uniqueness. Foreign keys enforce referential integrity and make relationships explicit.

## Table Concepts

- **Column**: Attribute or field.
- **Row**: Record or tuple.
- **Cell**: Value of a field in a row.

## Relationships Without Explicit Foreign Keys

Although foreign keys are the standard mechanism, relationships can also be inferred at query time:

1. **Manual column matching** through value comparisons.
2. **JOIN-based relationships** without explicit foreign key constraints.

## Steps to Design and Build a Database

1. Define scope and requirements.
2. Create an Entity-Relationship (ER) model.
3. Normalize the schema.
4. Convert ER to relational tables.
5. Define logical model details (types, keys, constraints).
6. Define physical model details (storage, indexing, performance).
7. Implement schema objects with SQL.

## Installing a SQL Database Environment

At minimum, you need:

- A **database server** (e.g., SQL Server, PostgreSQL, MySQL/MariaDB).
- A **database client** (e.g., phpMyAdmin, DBeaver, Navicat, SSMS).

Example stacks:

- MySQL + Apache (XAMPP)
- SQL Server + IIS
- PostgreSQL + Nginx

## Running Database Services

### Example (Windows CMD)

```batch
@echo off
REM Start Apache (XAMPP)
echo Starting Apache...
cd "C:\xampp\apache\bin"
httpd.exe

REM Start MySQL (XAMPP)
echo Starting MySQL...
cd "C:\xampp\mysql\bin"
mysql_start.bat

echo Apache and MySQL services started successfully.
```

### Example (Linux bash)

```sh
#!/bin/bash

check_directory() {
    if [ -d "$1" ]; then
        echo "Directory $1 found."
        return 0
    else
        echo "Directory $1 not found."
        return 1
    fi
}

if check_directory "/etc/httpd"; then
    APACHE_CMD="httpd"
elif check_directory "/etc/apache2"; then
    APACHE_CMD="apache2"
else
    echo "No Apache configuration directory found (/etc/httpd or /etc/apache2)."
    exit 1
fi

echo "Starting Apache ($APACHE_CMD)..."
sudo systemctl start $APACHE_CMD

echo "Starting MySQL (mariadb)..."
sudo systemctl start mariadb

echo "Apache ($APACHE_CMD) and MySQL services started successfully."
```

![sql-diagram](./img/sql-diagram.webp)
