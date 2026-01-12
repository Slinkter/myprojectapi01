# Requerimientos del Sistema

## 1. Requerimientos Funcionales (RF)

| ID | Requerimiento | Prioridad |
|----|---------------|-----------|
| **RF-01** | El sistema debe permitir buscar usuarios de GitHub por nombre de usuario *login*. | Alta |
| **RF-02** | La búsqueda debe implementar un mecanismo de *debounce* para optimizar llamadas. | Alta |
| **RF-03** | Se debe mostrar una lista de resultados con: Avatar, Login y Enlace al perfil. | Alta |
| **RF-04** | El sistema debe mostrar *Skeletons* o indicadores visuales durante la carga de datos. | Media |
| **RF-05** | Se debe notificar al usuario si no se encuentran resultados (`User Not Found`). | Media |
| **RF-06** | Se debe manejar y mostrar errores de conexión o API de forma explícita. | Media |
| **RF-07** | El sistema debe permitir alternar entre tema Claro y Oscuro. | Baja |
| **RF-08** | La preferencia de tema debe persistir al recargar la página. | Baja |

## 2. Requerimientos No Funcionales (RNF)

### RNF-01: Performance (Rendimiento)
- **LCP (Largest Contentful Paint):** < 2.5s.
- **Optimización:** Uso de `React.memo` para evitar re-renders masivos en listas largas.
- **Carga de Recursos:** Imágenes con `loading="lazy"` y componentes animados con `IntersectionObserver`.

### RNF-02: Usabilidad (UX)
- **Feedback:** El usuario siempre debe conocer el estado del sistema (Cargando, Error, Éxito, Vacío).
- **Animaciones:** Transiciones suaves (*Scale In*) al mostrar resultados para mejorar la percepción de fluidez.

### RNF-03: Mantenibilidad
- **Código:** Adherencia a arquitectura modular (*Feature-Based*) y principios *Clean Code*.
- **Tecnología:** Uso de librerías estándar y modernas (Redux Toolkit, Vite).

### RNF-04: Responsividad
- La interfaz debe adaptarse fluidamente a dispositivos:
  - Móvil (< 640px)
  - Tablet (640px - 1024px)
  - Desktop (> 1024px)

### RNF-05: Seguridad
- **Sanitización:** Los términos de búsqueda deben ser codificados (`encodeURIComponent`) antes de enviarse a la API para prevenir inyecciones básicas en URLs.
