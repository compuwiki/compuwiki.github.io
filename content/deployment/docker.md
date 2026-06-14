---
title: Docker
tags: [docker, containers, devops]
---

Docker is a platform for building, shipping, and running applications in containers. It improves portability and scalability across development and production environments.

## Main Components

- **Dockerfile**: File that defines a container image.
- **Docker Compose**: Tool to define and run multi-container applications.
- **Docker Hub**: Public registry for sharing Docker images.

## Basic Usage

### Create an Image with Dockerfile

Example `Dockerfile`:

```dockerfile
FROM ubuntu:latest
RUN apt-get update && apt-get install -y nginx
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:

```sh
docker build -t my-server .
docker run -p 80:80 my-server
```

### Container Management

```sh
docker ps       # List running containers
docker stop ID  # Stop a container
docker rm ID    # Remove a container
```

### Docker Compose

Example `docker-compose.yml`:

```yaml
version: "3"
services:
  web:
    image: nginx
    ports:
      - "80:80"
```

Start services:

```sh
docker-compose up -d
```

## Additional Resources

- [Docker Official Documentation](https://docs.docker.com/)
