# 🚀 API - GitHub Users

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![React Version](https://img.shields.io/badge/React-18-blue)
![Vite Version](https://img.shields.io/badge/Vite-5.x-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

> **Una Single Page Application (SPA) moderna para explorar perfiles de GitHub, construida con React 18, RTK y Tailwind CSS v4 (Utility-First).**

🏆 **Logro Arquitectónico:** Este proyecto fue sometido a una auditoría estricta, migrando iterativamente de una UI acoplada a un modelo puro **Feature-Sliced Design (FSD)** apoyado al 100% por utilitarios nativos de Tailwind. Cero _Vendor Lock-In UI_.

---

## 📖 Documentación Completa

La documentación detallada del proyecto se encuentra centralizada en la carpeta [`src/docs/`](./src/docs/):

- 🔍 **[Diagnóstico Técnico](./src/docs/00-diagnostico-tecnico.md)**: Análisis forense del estado del proyecto y plan de despido del UI antiguo.
- 🔭 **[Overview del Sistema](./src/docs/01-overview-del-sistema.md)**: Visión general, propósito y stack.
- 🏗️ **[Arquitectura](./src/docs/02-arquitectura.md)**: Estructura de carpetas, The Container/Presenter pattern.
- 📋 **[Casos de Uso](./src/docs/03-casos-de-uso.md)**: Interactions macro.
- 📊 **[Requerimientos](./src/docs/04-requerimientos.md)**: FR y NFR atados al nuevo rating de Tailwind v4.
- 🔄 **[Flujo de Datos](./src/docs/05-flujo-de-datos.md)**: Cómo viajan los datos (Store, Hooks, Props tree ASCII).
- 👩‍💻 **[Guía Devs](./src/docs/06-guia-para-desarrolladores.md)**: Leyes de `cn()`, Tailwind, DRY.
- 🩺 **[Calidad y Riesgos](./src/docs/07-calidad-y-riesgos.md)**: Mitigación residual.
- 🏁 **[Cierre del Proyecto](./src/docs/08-cierre-del-proyecto.md)**: Conclusiones de la auditoría.
- 🎨 **[Auditoría Diseño](./src/docs/09-auditoria-diseño.md)**: System Design, Paleta Semántica y Layout.
- 🎓 **[Tutorial Magistral](./src/docs/tutorial_completo.md)**: Cátedra explicativa de la asincronía y porqués analíticos.
- 📚 **[Glosario](./src/docs/GLOSSARY.md)**: Theming, FSD, DRY, Native Tailwind.

---

## 🛠️ Stack Tecnológico

| Categoría      | Tecnologías                                                          |
| -------------- | -------------------------------------------------------------------- |
| **Core**       | React 18.3, Vite 5                                                   |
| **Estilos**    | Tailwind CSS v4 Puro (Utility-first) _(Mui/Material UI descartados)_ |
| **Estado**     | Redux Toolkit, Redux Thunk                                           |
| **Networking** | Fetch API (Nativo)                                                   |
| **Iconos**     | React Icons                                                          |

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
