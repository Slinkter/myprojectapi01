# Calidad, Riesgos y Mantenibilidad

## 1. Estrategia de Calidad
La calidad del proyecto se asegura mediante:
- **Linting Estático:** ESLint configurado con reglas para React y React Hooks.
- **Tipado Dinámico:** Uso de `PropTypes` en componentes para validar los datos de entrada en tiempo de ejecución.
- **Optimización Preventiva:** Implementación de `Debounce` y `Lazy Loading` para evitar cuellos de botella de rendimiento comunes.

## 2. Deuda Técnica Identificada
La siguiente deuda técnica debe ser abordada en futuros *sprints*:

| Ítem | Descripción | Prioridad |
|------|-------------|-----------|
| **Estilos Híbridos** | Eliminación de clases BEM en `index.css` y migración total a Tailwind. | Media |
| **Imports Relativos** | Configurar alias absolutos (`@/`) en Vite. | Baja |
| **Testing** | Ausencia de pruebas unitarias (Jest/Vitest) y de integración. | Alta |

## 3. Riesgos Técnicos

### Dependencia de API Pública (GitHub)
- **Riesgo:** La API de GitHub tiene límites de tasa (*rate limits*). Si muchos usuarios usan la app desde la misma IP (o sin token), las peticiones fallarán con 403.
- **Mitigación Actual:** Manejo de errores en UI (`ErrorDisplay`).
- **Mitigación Futura:** Implementar autenticación o un proxy con caché.

### Escalabilidad del Estado
- **Riesgo:** Si la aplicación crece, `usersSlice` puede volverse monolítico.
- **Mitigación:** Dividir el store en múltiples *slices* por dominio (ej: `authSlice`, `reposSlice`).

## 4. Recomendaciones Futuras
1. **Implementar CI/CD:** Automatizar el *linting* y el *build* en GitHub Actions antes del despliegue.
2. **Añadir Testing:** Incorporar Vitest y React Testing Library para cubrir, al menos, la lógica de los *reducers* y componentes críticos como `UserCard`.
3. **Accesibilidad (a11y):** Auditar el contraste de colores y la navegación por teclado en el modo Oscuro.
