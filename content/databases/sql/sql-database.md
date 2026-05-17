---
title: Bases de datos relacionales
---

## Bases de datos relacionales

En una base de datos relacional, las claves primarias y las claves externas desempeñan un papel crucial en la estructuración de las tablas y el establecimiento de relaciones entre ellas.

- Clave primaria:\*\* Una clave primaria es un campo o conjunto de campos que identifica de forma única cada registro de una tabla. Su uso garantiza la integridad de los datos y facilita una consulta eficiente.
- **Clave externa:** Una clave externa es un campo o conjunto de campos de una tabla que establece una relación con la clave primaria de otra tabla. Esto permite enlazar entre tablas y realizar operaciones relacionales.

### Importancia de las Claves Primaria y Foránea

Aunque no es obligatorio, se recomienda que cada tabla tenga una clave primaria para garantizar la unicidad de los registros. Las claves foráneas se utilizan para establecer relaciones entre tablas, permitiendo realizar consultas eficientes y mantener la integridad referencial en la base de datos.

### Concepto de tablas

- Columna: Atributo o campo / (Columna = atributo = campo)
- Fila: Registro o tupla / (Fila = Registro = Tupla)
  Celda = valor de un campo

### Establecimiento de Relaciones sin Claves Foráneas

Aunque el uso de claves foráneas es estándar para definir relaciones entre tablas, existen métodos alternativos para relacionar datos:

1. **Coincidencia Manual de Columnas:** Relacionar datos basándose en la comparación de valores en columnas específicas, aunque esto requiere una gestión cuidadosa para mantener la integridad.

2. **Joining Tables Using Queries (JOIN):** Es posible relacionar tablas en consultas SQL utilizando cláusulas JOIN, sin claves foráneas explícitas.

## Pasos para diseñar y crear una base de datos

1. Definir el universo del discurso: Identificar el alcance y los requisitos de la base de datos, incluyendo el tipo de información a almacenar y los usuarios finales.

2. Diseño del Modelo Entidad-Relación (ER): Crear un diagrama ER que represente entidades, atributos y relaciones clave.

3. Normalización: Asegurarse de que el modelo ER está en una forma normalizada para reducir la redundancia y mejorar la estructura de datos.

4. Diseño del modelo relacional: Transformar el diseño ER en tablas relacionales que cumplan con las reglas de integridad referencial.

5. Modelo lógico: Definir la estructura de datos con tipos de datos, claves primarias, claves foráneas y restricciones.

6. Modelo físico: Decidir cómo se implementará la base de datos en un sistema de gestión de bases de datos (SGBD) específico, teniendo en cuenta el almacenamiento, el rendimiento y la indexación.

7. Creación de la base de datos y SQL: Ejecutar sentencias SQL para crear la base de datos basada en el diseño físico, incluyendo la creación de tablas, índices, vistas y definiciones de consultas/procedimientos almacenados.

## Instalación de una base de datos SQL

Para utilizar una base de datos SQL en un ordenador, sólo es necesario instalar 2 cosas:

- **servidor de base de datos**
  - servidor de base de datos: instancia de SQL-Server
  - servidor web: apache-http-server, nginx, IIS-windows-server
- **cliente de base de datos**: phpMyAdmin, DBeaver, Navicat, SQL-Server-Management-Studio

He aquí algunos ejemplos de la infraestructura completa de una base de datos SQL - MySQL con Apache HTTP Server vía XAMPP: MySQL + Apache HTTP Server - SQL Server con Microsoft IIS: SQL Server + Microsoft IIS - PostgreSQL con Nginx: PostgreSQL + Nginx - Oracle Database con Oracle HTTP Server: Base de datos Oracle + Servidor HTTP Oracle

### Utilización de una base de datos SQL

- **AplicaciónGUI (por ejemplo, XAMPP con PHPMyAdmin)**: Lanza una interfaz gráfica para gestionar el servidor web y conectar con el cliente de base de datos para ejecutar consultas.

- Interfaz de línea de comandos (CLI)\*\*: Inicie el servidor web y el cliente de base de datos e interactúe con la base de datos directamente desde el terminal (cmd, PowerShell o bash) utilizando los siguientes comandos. Esto es útil para servidores informáticos. Para interactuar con MySQL puedes hacer `mysql -h localhost -u root -p` o para SQL-server `sc start MSSQLSERVER`. Aquí hay dos scripts, uno para CMD y el otro para bash.

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

![sql-diagram](./img/sql-diagram.webp)
