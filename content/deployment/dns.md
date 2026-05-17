---
title: DNS (Domain Name System)
tags: [dns, networking, bind, iis]
---

El **Sistema de Nombres de Dominio (DNS)** es un servicio que traduce nombres de dominio en direcciones IP, facilitando la navegación en la web y la gestión de redes.

## Implementaciones de DNS

### BIND (Linux)

BIND (Berkeley Internet Name Domain) es la implementación más utilizada en sistemas Linux. Se configura mediante archivos de zona y un archivo de configuración principal (`named.conf`).

Ejemplo de configuración básica en `/etc/named.conf`:

```conf
options {
    directory "/var/named";
    allow-query { any; };
};
```

### IIS (Windows)

En entornos Windows, el servicio DNS se gestiona a través de **Microsoft DNS Server**, integrado en **IIS (Internet Information Services)** y administrado desde la consola de administración de DNS.

## Tipos de Zonas DNS

- **Zona Master**: Contiene los registros originales y distribuye información a los servidores secundarios.
- **Zona Slave**: Replica datos desde una zona maestra y responde consultas DNS.

Ejemplo de definición de zona en BIND:

```conf
zone "example.com" IN {
    type master;
    file "/etc/bind/db.example.com";
};
```
