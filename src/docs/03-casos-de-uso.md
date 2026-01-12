# Casos de Uso y Reglas de Negocio

## 1. Casos de Uso Principales

### CU-01: Buscar Usuarios
- **Actor:** Usuario Final
- **Descripción:** El usuario ingresa texto en el campo de búsqueda para encontrar perfiles de GitHub.
- **Flujo:**
  1. Usuario escribe en el input.
  2. Sistema espera 300ms (debounce) desde la última tecla presionada.
  3. Sistema realiza petición a la API.
  4. Sistema muestra indicador de carga (*Skeleton*).
  5. Sistema presenta lista de tarjetas de usuario o mensaje "No encontrado".

### CU-02: Visualizar Perfil
- **Actor:** Usuario Final
- **Descripción:** El usuario visualiza los detalles básicos y accede al perfil completo en GitHub.
- **Flujo:**
  1. Usuario hace scroll hasta visualizar una tarjeta.
  2. Sistema anima la entrada de la tarjeta (*Scale in*).
  3. Usuario hace clic en "Profile Github".
  4. Sistema redirige a `github.com` en una nueva pestaña.

### CU-03: Cambiar Tema (Dark/Light)
- **Actor:** Usuario Final
- **Descripción:** El usuario alterna entre modo claro y oscuro.
- **Flujo:**
  1. Usuario hace clic en el botón de tema (Sol/Luna).
  2. Sistema invierte el esquema de colores globlal.
  3. Sistema guarda la preferencia en `localStorage`.

## 2. Reglas de Negocio

### RN-01: Optimización de Búsqueda
- **Regla:** No se debe llamar a la API por cada tecla pulsada.
- **Implementación:** Se requiere un retraso (*debounce*) mínimo de 300ms.

### RN-02: Manejo de Errores de API
- **Regla:** Si la API falla (ej. límite de *rate limit* excedido), se debe informar al usuario amigablemente y permitir reintentar, sin romper la aplicación.

### RN-03: Persistencia de Preferencias
- **Regla:** La elección de tema visual debe recordarse entre sesiones del navegador.

### RN-04: Carga Eficiente
- **Regla:** Las imágenes de avatares no deben cargarse si no están en el *viewport* visible del usuario.
