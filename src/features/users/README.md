# Feature: Users

## 📁 Estructura

Esta feature sigue el patrón **Feature-Based Architecture**, siendo completamente autónoma y portable.

```
users/
├── components/           # Componentes UI específicos de usuarios
│   ├── UserCard.jsx      # Tarjeta individual de usuario
│   ├── UserList.jsx      # Lista de usuarios con lazy loading
│   ├── SkeletonCard.jsx  # Skeleton para estado de carga
│   └── SkeletonGrid.jsx  # Grid de skeletons
├── hooks/                # Hooks específicos de la feature
│   └── useUserFetching.js # Hook para fetch y gestión de estado
├── UserSearch.jsx        # Componente principal (container)
├── usersSlice.js         # Redux slice (estado + acciones)
└── index.js              # Public API de la feature
```

## 🎯 Responsabilidades

Esta feature maneja todo lo relacionado con:
- Búsqueda de usuarios de GitHub
- Visualización de lista de usuarios
- Estados de carga y error
- Navegación a detalle de usuario

## 📦 Exportaciones Públicas

```javascript
import { 
  UserSearch,      // Componente principal
  UserCard,        // Tarjeta de usuario
  useUserFetching, // Hook de fetching
  fetchUsers       // Redux action
} from '@/features/users';
```

## 🔗 Dependencias

### Internas (dentro de la feature):
- Todas las importaciones entre archivos de esta feature usan **rutas relativas**

### Externas (fuera de la feature):
- `@/hooks/useDebouncedSearch` - Hook global de debounce
- `@/hooks/useIntersectionObserver` - Hook global de lazy loading
- `@/components/layout/*` - Componentes de layout globales
- `@/services/userService` - Servicio de API

## ✅ Principios Aplicados

1. **Autonomía**: La feature puede funcionar independientemente
2. **Encapsulación**: Lógica interna no expuesta al exterior
3. **Portabilidad**: Puede moverse a otro proyecto fácilmente
4. **Single Responsibility**: Solo maneja usuarios y búsqueda
