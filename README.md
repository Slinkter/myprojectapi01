# 🚀 API - GitHub Users

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![React Version](https://img.shields.io/badge/React-18-blue)
![Vite Version](https://img.shields.io/badge/Vite-5.x-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

> **Una Single Page Application (SPA) moderna para explorar perfiles de GitHub, construida con React, Redux Toolkit y Tailwind CSS.**

---

## 📖 Documentación Completa

La documentación detallada del proyecto se encuentra centralizada en la carpeta [`src/docs/`](./src/docs/):

- 🔍 **[Diagnóstico Técnico](./src/docs/00-diagnostico-tecnico.md)**: Análisis forense del estado del proyecto.
- 🔭 **[Overview del Sistema](./src/docs/01-overview-del-sistema.md)**: Visión general, propósito y stack.
- 🏗️ **[Arquitectura](./src/docs/02-arquitectura.md)**: Estructura de carpetas, patrones y diagramas.
- 📋 **[Requerimientos y Casos de Uso](./src/docs/03-casos-de-uso.md)**: Definiciones funcionales.
- 🔄 **[Flujo de Datos](./src/docs/05-flujo-de-datos.md)**: Cómo viajan los datos (Redux, API).
- 👩‍💻 **[Guía para Desarrolladores](./src/docs/06-guia-para-desarrolladores.md)**: Setup, scripts y convenciones.

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnologías |
|-----------|-------------|
| **Core** | React 18, Vite |
| **Estilos** | Tailwind CSS, Material Tailwind |
| **Estado** | Redux Toolkit, Redux Thunk |
| **Networking** | Fetch API (Nativo) |
| **Iconos** | React Icons |

## 🚀 Quick Start

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/tu-usuario/myprojectapi01.git
    cd myprojectapi01
    ```

2.  **Instalar dependencias**
    ```bash
    pnpm install
    # o
    npm install
    ```

3.  **Iniciar servidor (Modo Desarrollo)**
    ```bash
    pnpm dev
    ```

4.  **Construir para Producción**
    ```bash
    pnpm build
    ```

## 📂 Estructura del Proyecto

```
src/
├── app/                  # Configuración del Store
├── components/           # Componentes UI reutilizables
├── features/             # Módulos de dominio (Users, Search)
├── hooks/                # Custom Hooks (Lógica reutilizable)
├── services/             # Integración con APIs externas
└── docs/                 # Documentación centralizada (La Biblia del Proyecto)
```

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

