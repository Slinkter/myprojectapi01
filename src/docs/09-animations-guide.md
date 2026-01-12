# 🎬 Guía Completa de Animaciones - De Cero a Master

## 📋 Índice
- [Fundamentos de Animaciones en Web](#fundamentos-de-animaciones-en-web)
- [Configuración en Tailwind](#configuración-en-tailwind)
- [Animaciones del Proyecto](#animaciones-del-proyecto)
- [Técnicas Avanzadas](#técnicas-avanzadas)
- [Performance y Optimización](#performance-y-optimización)
- [Ejercicios Prácticos](#ejercicios-prácticos)

---

## 🎯 Fundamentos de Animaciones en Web

### **¿Qué son las animaciones CSS?**

Las animaciones CSS permiten cambiar propiedades de elementos a lo largo del tiempo. Hay **2 formas principales**:

#### **A. Transitions (Transiciones)**
Cambios suaves entre estados (hover, focus, etc.)

```css
/* Ejemplo básico */
.button {
  background-color: blue;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: red;
}
```

**Propiedades de transition:**
- `transition-property`: Qué propiedad animar (color, transform, etc.)
- `transition-duration`: Cuánto dura (0.3s, 500ms)
- `transition-timing-function`: Cómo se anima (ease, linear, ease-in-out)
- `transition-delay`: Cuándo empieza (0s, 100ms)

#### **B. Keyframes (Animaciones)**
Secuencias de cambios más complejas

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* O con porcentajes */
@keyframes slideIn {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(10px); }
  100% { transform: translateX(0); }
}

.element {
  animation: fadeIn 0.5s ease-out;
}
```

**Propiedades de animation:**
- `animation-name`: Nombre del keyframe
- `animation-duration`: Duración total
- `animation-timing-function`: Curva de velocidad
- `animation-delay`: Retraso antes de empezar
- `animation-iteration-count`: Cuántas veces (1, infinite)
- `animation-direction`: Dirección (normal, reverse, alternate)
- `animation-fill-mode`: Estado antes/después (none, forwards, backwards, both)

---

## ⚙️ Configuración en Tailwind

### **En `tailwind.config.cjs`**

```javascript
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  theme: {
    extend: {
      // 1. Definir los keyframes
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      
      // 2. Crear clases de animación
      animation: {
        "skeleton-loading": "fade-in-up 0.5s ease-out forwards",
        "not-foundName": "fade-in 0.5s ease-in-out forwards",
        "scale-in": "scaleIn 0.3s ease-out",
      },
    },
  },
});
```

**📚 Anatomía de una animación:**
```
"skeleton-loading": "fade-in-up 0.5s ease-out forwards"
       ↓                ↓         ↓      ↓       ↓
   Nombre clase     Keyframe  Duración Timing  Fill-mode
```

### **Uso en componentes:**

```javascript
// Clase directa
<div className="animate-skeleton-loading">
  Contenido
</div>

// Con delay dinámico
<div 
  className="animate-skeleton-loading"
  style={{ animationDelay: `${index * 150}ms` }}
>
  Contenido
</div>
```

---

## 🎨 Animaciones del Proyecto

### **Animación 1: Fade-In-Up (Skeleton Loading)**

**Ubicación:** `UserList.jsx`, `SkeletonGrid.jsx`

```javascript
<li
  className="animate-skeleton-loading flex justify-center"
  style={{
    animationDelay: `${index * 150}ms`,
    animationFillMode: "backwards",
  }}
>
  <UserCard user={user} />
</li>
```

**¿Cómo funciona?**

1. **Keyframe `fade-in-up`:**
   ```css
   0%: opacity: 0, translateY(10px)  // Invisible, 10px abajo
   100%: opacity: 1, translateY(0)    // Visible, posición normal
   ```

2. **Animación `skeleton-loading`:**
   - **Duración:** `0.5s` (500 milisegundos)
   - **Timing:** `ease-out` (empieza rápido, termina lento)
   - **Fill-mode:** `forwards` (mantiene estado final)

3. **Animation Delay (Efecto Cascada):**
   ```javascript
   animationDelay: `${index * 150}ms`
   ```
   - Card 0: 0ms (inmediato)
   - Card 1: 150ms
   - Card 2: 300ms
   - Card 3: 450ms
   - **Resultado:** Aparición escalonada ✨

4. **Animation Fill Mode:**
   ```javascript
   animationFillMode: "backwards"
   ```
   - Aplica estilos del 0% **antes** de que empiece la animación
   - Evita "flash" de contenido visible antes del delay
   - Esencial cuando usas `animationDelay`

**Flujo temporal:**
```
t=0ms:    Card 0 empieza animación
t=150ms:  Card 1 empieza animación
t=300ms:  Card 2 empieza animación
t=450ms:  Card 3 empieza animación
t=500ms:  Card 0 termina animación
t=650ms:  Card 1 termina animación
...
```

**Resultado visual:**
```
Card 1: [invisible, abajo] ──────► [visible, arriba]
          ↓ 150ms
Card 2: [invisible, abajo] ──────► [visible, arriba]
          ↓ 150ms
Card 3: [invisible, abajo] ──────► [visible, arriba]
```

---

### **Animación 2: Fade-In (Not Found)**

**Ubicación:** `NotFound.jsx`

```javascript
<div className="animate-not-foundName flex items-center">
  <Typography>No se encontraron usuarios...</Typography>
</div>
```

**¿Cómo funciona?**

1. **Keyframe `fade-in`:**
   ```css
   0%: opacity: 0    // Completamente invisible
   100%: opacity: 1  // Completamente visible
   ```

2. **Animación `not-foundName`:**
   - **Duración:** `0.5s`
   - **Timing:** `ease-in-out` (suave inicio y fin)
   - **Fill-mode:** `forwards` (mantiene opacidad 1)

**Diferencia con fade-in-up:**
- ❌ No hay movimiento (translateY)
- ✅ Solo cambio de opacidad
- 🎯 Más sutil y elegante para mensajes

---

### **Animación 3: Scale-In (UserCard con Intersection Observer)**

**Ubicación:** `UserCard.jsx`

```javascript
const cardRef = useRef(null);
const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });

const animationClass = isVisible
  ? "animate-scale-in opacity-100"
  : "opacity-0";

return (
  <Card ref={cardRef} className={animationClass}>
    {/* contenido */}
  </Card>
);
```

**¿Cómo funciona?**

1. **Keyframe `scaleIn`:**
   ```css
   0%: scale(0.9), opacity: 0  // 90% tamaño, invisible
   100%: scale(1), opacity: 1  // 100% tamaño, visible
   ```

2. **Intersection Observer:**
   ```javascript
   const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
   ```
   - Detecta cuando el elemento es **10% visible** en viewport
   - `threshold: 0.1` = Trigger cuando 10% del elemento es visible
   - Cuando es visible → `isVisible = true` → agrega clase `animate-scale-in`

3. **Custom Hook `useIntersectionObserver`:**
   ```javascript
   const useIntersectionObserver = (elementRef, { threshold = 0.1 } = {}) => {
     const [isIntersecting, setIsIntersecting] = useState(false);

     useEffect(() => {
       const observer = new IntersectionObserver(
         ([entry]) => {
           setIsIntersecting(entry.isIntersecting);
         },
         { threshold }
       );

       if (elementRef.current) {
         observer.observe(elementRef.current);
       }

       return () => observer.disconnect();
     }, [elementRef, threshold]);

     return isIntersecting;
   };
   ```

4. **Timing:**
   - **Duración:** `0.3s` (más rápido que fade-in-up)
   - **Timing:** `ease-out`

**Ventajas:**
- ✅ Solo anima cuando el usuario puede verlo
- ✅ Mejor rendimiento (no anima elementos fuera de pantalla)
- ✅ Experiencia más fluida al hacer scroll

**Resultado:** Cards "crecen" al entrar en pantalla mientras haces scroll

---

### **Animación 4: Transiciones Globales**

**Ubicación:** `index.css`

```css
@layer base {
  * {
    @apply transition-colors duration-300 ease-in-out;
  }
}
```

**¿Qué hace?**
- Aplica transición de **colores** a **todos** los elementos (`*`)
- **Duración:** `300ms`
- **Timing:** `ease-in-out`
- **Propiedades afectadas:** `color`, `background-color`, `border-color`

**Ejemplo en acción:**
```javascript
// Al cambiar tema con ThemeToggle
<body className="bg-gray-50 dark:bg-dark-bg">
  // El fondo cambia suavemente en 300ms
</body>

<Typography className="text-gray-900 dark:text-white">
  // El color de texto cambia suavemente
</Typography>
```

**Por qué solo `transition-colors`:**
- ✅ Cambios de tema suaves
- ✅ No afecta otras propiedades (transform, opacity)
- ✅ Mejor rendimiento que `transition: all`

---

### **Animación 5: Hover States (UserCard)**

**Ubicación:** `UserCard.jsx`

```javascript
<Button className="transition-transform hover:scale-[1.02] focus:scale-[1.02] active:scale-100">
  Ver Detalles
</Button>
```

**¿Cómo funciona?**

1. **Estado normal:**
   ```css
   transform: scale(1)  // 100% tamaño
   ```

2. **Al hacer hover:**
   ```css
   transform: scale(1.02)  // 102% tamaño (2% más grande)
   ```

3. **Al hacer focus (teclado):**
   ```css
   transform: scale(1.02)  // Mismo efecto para accesibilidad
   ```

4. **Al hacer click (active):**
   ```css
   transform: scale(1)  // Vuelve a tamaño normal
   ```

5. **Transition:**
   ```css
   transition: transform 200ms ease
   ```
   - Solo anima `transform` (no color, opacity, etc.)
   - Duración: `200ms` (más rápido para interacciones)
   - Timing: `ease` (suave)

**Micro-interacciones:**
```
Normal → Hover: scale(1) → scale(1.02) [200ms]
Hover → Click: scale(1.02) → scale(1) [200ms]
Click → Normal: scale(1) → scale(1) [sin cambio]
```

**Resultado:** Botón "crece" ligeramente al pasar el mouse, dando feedback visual

---

## 🚀 Técnicas Avanzadas

### **Técnica 1: Staggered Animations (Animaciones Escalonadas)**

```javascript
{users.map((user, index) => (
  <li
    key={user.id}
    className="animate-skeleton-loading"
    style={{
      animationDelay: `${index * 150}ms`,
      animationFillMode: "backwards",
    }}
  >
    <UserCard user={user} />
  </li>
))}
```

**Por qué funciona:**
1. Cada elemento tiene un `animationDelay` diferente basado en su `index`
2. `animationFillMode: "backwards"` evita que se vean antes de animar
3. Crea efecto de "cascada" o "ola"

**Variaciones:**
```javascript
// Delay lineal (constante)
animationDelay: `${index * 150}ms`  // 0, 150, 300, 450...

// Delay exponencial (acelerando)
animationDelay: `${index * index * 50}ms`  // 0, 50, 200, 450...

// Delay con máximo
animationDelay: `${Math.min(index * 150, 1000)}ms`  // Max 1s
```

---

### **Técnica 2: Intersection Observer Animations**

**Hook completo:**
```javascript
const useIntersectionObserver = (elementRef, { threshold = 0.1 } = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const card = elementRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold]);

  return isIntersecting;
};
```

**Uso avanzado:**
```javascript
// Animar solo una vez
const [hasAnimated, setHasAnimated] = useState(false);
const isVisible = useIntersectionObserver(cardRef);

useEffect(() => {
  if (isVisible && !hasAnimated) {
    setHasAnimated(true);
  }
}, [isVisible, hasAnimated]);

const animationClass = hasAnimated ? "animate-scale-in" : "opacity-0";
```

**Opciones de threshold:**
```javascript
{ threshold: 0 }     // Trigger cuando 1 pixel es visible
{ threshold: 0.5 }   // Trigger cuando 50% es visible
{ threshold: 1.0 }   // Trigger cuando 100% es visible
{ threshold: [0, 0.5, 1] }  // Múltiples triggers
```

**Ventajas:**
- ✅ Anima solo cuando es visible
- ✅ Mejor rendimiento (lazy animations)
- ✅ Experiencia más fluida
- ✅ Funciona con scroll infinito

---

### **Técnica 3: Animation Fill Modes**

```javascript
// forwards - Mantiene estado final
animation: fadeIn 0.5s ease-out forwards;
// Resultado: opacity queda en 1 después de animar

// backwards - Aplica estado inicial antes de empezar
animationFillMode: "backwards";
// Resultado: opacity es 0 durante el delay

// both - Combina forwards y backwards
animation: fadeIn 0.5s ease-out both;
// Resultado: opacity 0 durante delay, 1 después

// none - No aplica estilos fuera de la animación (default)
animation: fadeIn 0.5s ease-out;
// Resultado: vuelve al estado original después
```

**Cuándo usar cada uno:**

| Fill Mode | Cuándo usar | Ejemplo |
|-----------|-------------|---------|
| `forwards` | Mantener estado final | Fade-in que debe quedar visible |
| `backwards` | Con `animationDelay` | Staggered animations |
| `both` | Delay + mantener final | Animaciones complejas |
| `none` | Animaciones repetidas | Loading spinners |

---

### **Técnica 4: Timing Functions**

```css
/* Linear - Velocidad constante */
animation: fadeIn 0.5s linear;
/* Gráfica: ────────── */

/* Ease - Suave inicio y fin (default) */
animation: fadeIn 0.5s ease;
/* Gráfica: ╭────╮ */

/* Ease-in - Empieza lento, termina rápido */
animation: fadeIn 0.5s ease-in;
/* Gráfica: ╰────── */

/* Ease-out - Empieza rápido, termina lento */
animation: fadeIn 0.5s ease-out;
/* Gráfica: ──────╮ */

/* Ease-in-out - Muy suave inicio y fin */
animation: fadeIn 0.5s ease-in-out;
/* Gráfica: ╭──╮ */

/* Cubic-bezier - Control total */
animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

**Recomendaciones del proyecto:**
- **Entrada (aparecer):** `ease-out` - Rápido al inicio, suave al final
- **Salida (desaparecer):** `ease-in` - Suave al inicio, rápido al final
- **Hover/Interacciones:** `ease` - Suave en ambos lados
- **Tema/Colores:** `ease-in-out` - Muy suave

**Cubic-bezier personalizados:**
```css
/* Material Design */
cubic-bezier(0.4, 0, 0.2, 1)  /* Standard */
cubic-bezier(0, 0, 0.2, 1)    /* Deceleration */
cubic-bezier(0.4, 0, 1, 1)    /* Acceleration */

/* iOS */
cubic-bezier(0.25, 0.1, 0.25, 1)  /* Ease */

/* Bounce */
cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

---

## ⚡ Performance y Optimización

### **Propiedades GPU-Accelerated**

```css
/* ✅ BUENO - GPU accelerated (60fps) */
transform: translateY(10px);
transform: scale(1.02);
transform: rotate(45deg);
opacity: 0;

/* ❌ MALO - Causa reflow/repaint (30fps o menos) */
top: 10px;
left: 10px;
width: 100px;
height: 100px;
margin: 10px;
```

**Por qué:**
- `transform` y `opacity` se procesan en la GPU
- No causan reflow (recalcular layout)
- No causan repaint (redibujar)
- Resultado: Animaciones suaves a 60fps

### **Will-change (Optimización Avanzada)**

```css
/* Indica al navegador que la propiedad va a cambiar */
.card {
  will-change: transform, opacity;
}

/* Remover después de animar */
.card.animated {
  will-change: auto;
}
```

**⚠️ Usar con cuidado:**
- Solo para animaciones frecuentes
- Consume memoria
- Remover cuando no se necesite

### **Reduce Motion (Accesibilidad)**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Agregar a `index.css`:**
```css
@layer base {
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}
```

---

## 📊 Resumen de Animaciones del Proyecto

| Animación | Ubicación | Trigger | Duración | Timing | Efecto |
|-----------|-----------|---------|----------|--------|--------|
| `skeleton-loading` | UserList, SkeletonGrid | Al montar | 0.5s | ease-out | Fade-in desde abajo |
| `not-foundName` | NotFound | Al montar | 0.5s | ease-in-out | Fade-in simple |
| `scale-in` | UserCard | Scroll (Intersection) | 0.3s | ease-out | Escala + fade-in |
| `transition-colors` | Global (*) | Cambio de tema | 0.3s | ease-in-out | Transición de colores |
| `hover:scale` | Botones | Hover/Focus | 0.2s | ease | Escala al 102% |

---

## 🎓 Ejercicios Prácticos

### **Nivel Básico:**

#### **Ejercicio 1: Modificar duración**
Cambia la duración de `skeleton-loading` a 1 segundo.

**Solución:**
```javascript
// tailwind.config.cjs
animation: {
  "skeleton-loading": "fade-in-up 1s ease-out forwards",  // ← Cambiar 0.5s a 1s
}
```

#### **Ejercicio 2: Cambiar delay**
Cambia el delay entre cards a 300ms en lugar de 150ms.

**Solución:**
```javascript
// UserList.jsx
animationDelay: `${index * 300}ms`,  // ← Cambiar 150 a 300
```

#### **Ejercicio 3: Crear fade-out**
Crea una animación de fade-out.

**Solución:**
```javascript
// tailwind.config.cjs
keyframes: {
  "fade-out": {
    "0%": { opacity: "1" },
    "100%": { opacity: "0" },
  },
},
animation: {
  "fade-out": "fade-out 0.5s ease-in forwards",
}
```

---

### **Nivel Intermedio:**

#### **Ejercicio 4: Bounce animation**
Crea una animación de "bounce" para los botones.

**Solución:**
```javascript
// tailwind.config.cjs
keyframes: {
  bounce: {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-10px)" },
  },
},
animation: {
  "bounce": "bounce 0.6s ease-in-out infinite",
}

// Uso
<Button className="animate-bounce">Click me</Button>
```

#### **Ejercicio 5: PageHeader animation**
Agrega animación de entrada para el PageHeader.

**Solución:**
```javascript
// PageHeader.jsx
<header className="animate-fade-in-up flex flex-col...">
  {/* contenido */}
</header>
```

#### **Ejercicio 6: NotFound exit animation**
Implementa animación de salida para NotFound.

**Solución:**
```javascript
// NotFound.jsx
const [isExiting, setIsExiting] = useState(false);

const handleExit = () => {
  setIsExiting(true);
  setTimeout(() => {
    // Limpiar o navegar
  }, 500);
};

return (
  <div className={isExiting ? "animate-fade-out" : "animate-not-foundName"}>
    {/* contenido */}
  </div>
);
```

---

### **Nivel Avanzado:**

#### **Ejercicio 7: Slide-in desde la izquierda**
Crea animación de "slide-in" desde la izquierda.

**Solución:**
```javascript
// tailwind.config.cjs
keyframes: {
  "slide-in-left": {
    "0%": {
      opacity: "0",
      transform: "translateX(-100%)",
    },
    "100%": {
      opacity: "1",
      transform: "translateX(0)",
    },
  },
},
animation: {
  "slide-in-left": "slide-in-left 0.5s ease-out forwards",
}
```

#### **Ejercicio 8: Flip animation**
Implementa animación de "flip" para las cards.

**Solución:**
```javascript
// tailwind.config.cjs
keyframes: {
  flip: {
    "0%": { transform: "rotateY(0deg)" },
    "100%": { transform: "rotateY(180deg)" },
  },
},
animation: {
  flip: "flip 0.6s ease-in-out",
}

// UserCard.jsx
const [isFlipped, setIsFlipped] = useState(false);

<Card 
  className={isFlipped ? "animate-flip" : ""}
  onClick={() => setIsFlipped(!isFlipped)}
>
  {/* contenido */}
</Card>
```

#### **Ejercicio 9: Pulse para búsqueda**
Agrega animación de "pulse" para el botón de búsqueda cuando está cargando.

**Solución:**
```javascript
// tailwind.config.cjs
keyframes: {
  pulse: {
    "0%, 100%": { opacity: "1" },
    "50%": { opacity: "0.5" },
  },
},
animation: {
  pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
}

// PageHeader.jsx
<Input
  className={isSearching ? "animate-pulse" : ""}
  // ...
/>
```

---

## 🔗 Recursos Adicionales

- [MDN: CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [MDN: CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
- [Cubic-bezier.com](https://cubic-bezier.com/) - Generador de timing functions
- [Animista](https://animista.net/) - Generador de animaciones CSS
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

**Última actualización:** 2026-01-12
