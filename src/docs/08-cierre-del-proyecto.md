# Cierre y Mantenimiento del Proyecto

## 1. Estado Actual del Sistema
El proyecto se encuentra en una fase **estable** de MVP (Producto Mínimo Viable).
- ✅ Funcionalidad principal (Búsqueda) completa.
- ✅ Integración con API externa estable.
- ✅ Interfaz de usuario responsiva y con modo oscuro.
- ⚠️ Documentación y deuda técnica de estilos pendiente de refactorización final.

## 2. Limitaciones Conocidas
- **Límite de API:** La búsqueda puede fallar si se realizan más de 60 peticiones/hora desde la misma IP debido a las restricciones de la API pública de GitHub.
- **Persistencia:** Solo el tema se guarda. El historial de búsquedas o usuarios visitados se pierde al recargar.

## 3. Lecciones Aprendidas
- **Importancia del Debounce:** Crucial para evitar saturar la API y mejorar la UX al escribir.
- **Lazy Loading y UX:** La combinación de carga perezosa con animaciones mejora significativamente la percepción de calidad del producto.
- **Complejidad de Estilos:** Mezclar metodologías (CSS vs Tailwind) genera confusión a largo plazo; es vital definir una estrategia única desde el inicio.

## 4. Roadmap Futuro

### Corto Plazo:
- [ ] Refactorización de estilos a Tailwind CSS puro.
- [ ] Implementación de Alias `@/`.
- [ ] Estandarización completa de la documentación.

### Mediano Plazo:
- [ ] Añadir pruebas unitarias con Vitest.
- [ ] Implementar vista de detalle de usuario (`/user/:login`) con React Router.

### Largo Plazo:
- [ ] Integración con Firebase Auth para permitir "Guardar Favoritos".
- [ ] PWA (Progressive Web App) para instalación en móviles.
