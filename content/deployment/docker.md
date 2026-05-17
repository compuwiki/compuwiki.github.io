---
title: Docker
tags: [docker, containers, devops]
---

Docker es una plataforma para desarrollar, enviar y ejecutar aplicaciones dentro de contenedores. Facilita la portabilidad y escalabilidad de los entornos de desarrollo y producción.

## Componentes Principales

- **Dockerfile**: Archivo que define la imagen de un contenedor.
- **Docker Compose**: Herramienta para definir y ejecutar aplicaciones multicontenedor.
- **Docker Hub**: Repositorio público para compartir imágenes Docker.

## Uso Básico

### Creación de una imagen con Dockerfile

Ejemplo de `Dockerfile`:

```dockerfile
FROM ubuntu:latest
RUN apt-get update && apt-get install -y nginx
CMD ["nginx", "-g", "daemon off;"]
```

Para construir y ejecutar:

```sh
docker build -t mi-servidor .
docker run -p 80:80 mi-servidor
```

### Gestión de Contenedores

```sh
docker ps       # Listar contenedores en ejecución
docker stop ID  # Detener un contenedor
docker rm ID    # Eliminar un contenedor
```

### Uso de Docker Compose

Ejemplo de `docker-compose.yml`:

```yaml
version: "3"
services:
  web:
    image: nginx
    ports:
      - "80:80"
```

Para levantar los servicios:

```sh
docker-compose up -d
```

## Recursos Adicionales

- [Documentación Oficial de Docker](https://docs.docker.com/)
