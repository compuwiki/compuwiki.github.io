---
title: Kubernetes
tags: [kubernetes, devops, containers]
---

Kubernetes es una plataforma de orquestación de contenedores que permite automatizar la implementación, gestión y escalado de aplicaciones en contenedores.

## Componentes Principales

- **Pods**: Unidad más pequeña en Kubernetes, contiene uno o más contenedores.
- **Deployments**: Controla la gestión de Pods y sus actualizaciones.
- **Services**: Expone aplicaciones dentro o fuera del clúster.
- **Namespaces**: Permiten la segmentación de recursos dentro del clúster.

## Herramientas Relacionadas

- **kubectl**: Línea de comandos para interactuar con Kubernetes.
- **Minikube**: Herramienta para ejecutar Kubernetes localmente.
- **Docker + Kubernetes**: Kubernetes puede integrarse con Docker para gestionar contenedores de manera más eficiente.

## Comandos Básicos de kubectl

```sh
kubectl get pods           # Listar pods en ejecución
kubectl create -f app.yaml # Crear recursos desde un archivo YAML
kubectl delete pod mi-pod # Eliminar un pod específico
kubectl apply -f app.yaml # Aplicar cambios a una configuración
```

## Recursos Adicionales

- [Documentación Oficial de Kubernetes](https://kubernetes.io/docs/)
