# Quartz Wiki

Quartz es un generardor de sitios estáticos que sirve para crear wikis personales con archivos Markdown.

## Instalación y Configuración

### 1. Clonar el repositorio de Quartz

```sh
git clone https://github.com/jackyzha0/quartz.git my-wiki
cd my-wiki
```

### 2. Instalar dependencias

```sh
yarn install
```

### 3. Iniciar el servidor local

```sh
yarn dev
```

El servidor se ejecutará en `http://localhost:8080`.

### 4. Desplegar en GitHub Pages

```sh
git add .
git commit -m "Deploy Quartz Wiki"
git push origin main
```

## Estructura del Proyecto

```
my-wiki/
│── content/          # Archivos Markdown de la wiki
│── assets/           # Recursos estáticos (imágenes, estilos, etc.)
│── layouts/          # Plantillas HTML personalizadas
│── quartz.config.ts  # Configuración de Quartz
│── README.md         # Este archivo
│── package.json      # Dependencias del proyecto
```

## Personalización

- Modificar `quartz.config.ts` para cambiar la configuración.
- Editar archivos en `content/` para agregar nuevos artículos.
- Personalizar estilos en `assets/`.

## Comandos Útiles

| Comando | Descripción |
|---------|------------|
| `yarn dev` | Inicia el servidor de desarrollo |
| `yarn build` | Genera los archivos estáticos |
| `yarn deploy` | Publica la wiki en GitHub Pages |

Para más detalles, consulta la [documentación oficial](https://quartz.jzhao.xyz/).
