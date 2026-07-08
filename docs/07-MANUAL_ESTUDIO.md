# 7. Manual de Estudio de React e Ingeniería de Software — GitExplorer

Este documento funciona como una **guía educativa integral** para desarrolladores junior. Explica detalladamente los conceptos fundamentales de JavaScript, React, patrones de diseño de software y principios metodológicos aplicados en el desarrollo de **GitExplorer**.

---

## 📋 Índice
1. [Principios de Clean Code (DRY, KISS, SOLID)](#1-principios-de-clean-code-dry-kiss-solid)
2. [Conceptos Esenciales de JavaScript](#2-conceptos-esenciales-de-javascript)
3. [El Ciclo de Vida y los Hooks de React](#3-el-ciclo-de-vida-y-los-hooks-de-react)
4. [Gestión del Estado del Servidor y Caché](#4-gestión-del-estado-del-servidor-y-caché)
5. [Validación en Runtime e Integridad de Datos](#5-validación-en-runtime-e-integridad-de-datos)
6. [Patrones de Diseño (GoF y React)](#6-patrones-de-diseño-gof-y-react)
7. [Simulación de Red y Mocking con Service Workers](#7-simulación-de-red-y-mocking-con-service-workers)

---

## 1. Principios de Clean Code (DRY, KISS, SOLID)

El código limpio no es solo código que funciona; es código fácil de entender, mantener y cambiar por otros desarrolladores.

### DRY (Don't Repeat Yourself)
* **Concepto:** Evitar la duplicación de lógica de negocio o de presentación. Si tienes que cambiar una regla, deberías hacerlo en un solo lugar.
* **Aplicación en el Proyecto:** Centralizamos los estilos en tokens de Tailwind CSS globales (`tailwind-card`, `tailwind-input`) en lugar de repetir las mismas clases en cada componente.

### KISS (Keep It Simple, Stupid)
* **Concepto:** Diseñar sistemas simples y directos. Evitar la sobre-ingeniería innecesaria.
* **Aplicación en el Proyecto:** La inicialización de temas no utiliza complejos proveedores de contexto React con múltiples funciones internas; simplemente añade o remueve la clase `.dark` del elemento raíz del DOM (`<html>`).

### SOLID en el Frontend
* **S - Single Responsibility Principle (Responsabilidad Única):** Un componente o función debe hacer solo una cosa. `UserCard` solo pinta la UI de un perfil; no decide qué endpoint llamar ni hace peticiones de red.
* **O - Open/Closed Principle (Abierto/Cerrado):** Abierto a la extensión, cerrado a la modificación. El componente `ResultFactory` permite añadir un nuevo tipo de tarjeta (ej: `OrganizationCard`) extendiendo un caso de `switch` sin tener que reescribir la lógica interna de `UserCard`.
* **L - Liskov Substitution Principle (Sustitución de Liskov):** Las subclases o componentes de fábrica deben poder reemplazar a sus componentes base sin romper la aplicación. `OrganizationCard` puede usarse en cualquier lugar donde se espere un `UserCard` ordinario porque consume la misma interfaz de propiedades básicas.
* **I - Interface Segregation Principle (Segregación de Interfaces):** Es mejor tener interfaces pequeñas y específicas que una gran interfaz general. El adaptador de datos de usuario transforma el payload gigante del servidor en un objeto plano y específico (`UserProfile`) con solo las propiedades que usa la UI.
* **D - Dependency Inversion Principle (Inversión de Dependencias):** Los módulos de alto nivel no deben depender de los de bajo nivel; ambos deben depender de abstracciones. Las vistas de React no llaman a `fetch()` de forma directa; consumen funciones de servicio abstractas (`userService.js`) que pueden mockearse fácilmente en testing.

---

## 2. Conceptos Esenciales de JavaScript

Para dominar React, primero debes dominar la mecánica interna de JavaScript:

### Scope (Ámbito)
* **Definición:** Determina la visibilidad y accesibilidad de las variables en distintas partes del código.
* **Tipos:**
  * **Global:** Acceso desde cualquier parte.
  * **Function Scope:** Variables declaradas dentro de una función con `var`.
  * **Block Scope:** Variables creadas con `let` o `const` dentro de llaves `{}` (ej: un `if` o un `for`). No se puede acceder a ellas fuera de las llaves.

### Hoisting (Elevación)
* **Definición:** Comportamiento por el cual las declaraciones de variables y funciones son movidas físicamente al principio de su ámbito durante la fase de compilación de JavaScript.
* **Regla Práctica:** Las funciones declaradas tradicionalmente (`function miFuncion() {}`) sufren hoisting total, por lo que puedes llamarlas antes de definirlas en el archivo. Las variables declaradas con `let` y `const` no se elevan de la misma manera; intentar usarlas antes de su línea de asignación arroja un error de zona muerta temporal (`ReferenceError`).

### Closures (Clausuras)
* **Definición:** Un closure es una función que "recuerda" y tiene acceso a las variables de su ámbito externo inmediato, incluso después de que la función externa haya terminado de ejecutarse.
* **Ejemplo Práctico en React:**
  ```javascript
  function crearContador() {
    let cuenta = 0; // Variable privada del ámbito superior
    return function incrementar() {
      cuenta++;
      console.log(cuenta);
    };
  }
  const miContador = crearContador();
  miContador(); // Imprime: 1
  miContador(); // Imprime: 2 (recuerda el valor de 'cuenta')
  ```

### Inmutabilidad (Immutability)
* **Definición:** Significa no modificar el valor o estado de las variables y estructuras de datos originales directamente, sino crear una nueva copia modificada de las mismas.
* **Por qué importa en React:** React detecta cambios comparando referencias de objetos en memoria. Si mutas un array interno con `.push()`, la referencia en memoria sigue siendo la misma y React no redibujará el componente. En su lugar, usamos métodos no mutables como `.map()`, `.filter()` o el operador spread (`[...]`).
  ```javascript
  // ❌ INCORRECTO: Muta el array original
  usuarios.push(nuevoUsuario);

  // ✅ CORRECTO: Crea una copia con el nuevo elemento
  setUsuarios([...usuarios, nuevoUsuario]);
  ```

---

## 3. El Ciclo de Vida y los Hooks de React

Los hooks permiten a los componentes funcionales conectarse al estado interno y ciclo de vida de React:

### `useState`
* **Definición:** Hook que añade estado local reactivo a un componente funcional.
* **Mecánica:** Devuelve un array con dos elementos: el valor actual del estado y una función para actualizarlo. Las actualizaciones son asíncronas.

### `useEffect`
* **Definición:** Permite ejecutar efectos secundarios (peticiones de red, suscripciones a eventos, temporizadores) en componentes funcionales.
* **Array de Dependencias (`[]`):**
  * `useEffect(fn, [])`: Se ejecuta **únicamente una vez** tras el primer montaje del componente (ideal para inicializaciones de red).
  * `useEffect(fn, [variable])`: Se ejecuta cada vez que el valor de `variable` cambia.
  * **Función de Limpieza (Cleanup):** Si la función del efecto retorna una función, esta se ejecutará automáticamente justo antes de que el componente se desmonte o antes de volver a ejecutar el efecto. Esto previene fugas de memoria (memory leaks):
    ```javascript
    useEffect(() => {
      const handleResize = () => console.log(window.innerWidth);
      window.addEventListener("resize", handleResize);

      // Función de limpieza para remover el listener
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    ```

### `useRef`
* **Definición:** Hook que devuelve un objeto mutable con una propiedad `.current`.
* **Diferencia clave con useState:** Modificar la propiedad `.current` de una referencia **no provoca un renderizado** del componente. Se usa comúnmente para almacenar referencias físicas a elementos del DOM (ej: para hacer foco en un input) o para guardar valores persistentes entre renders.

---

## 4. Gestión del Estado del Servidor y Caché

En aplicaciones frontend modernas, la gestión de datos se divide en **estado local** (UI temporal, modales abiertos, etc.) y **estado del servidor** (datos persistidos en bases de datos externas). En GitExplorer usamos **TanStack Query** en lugar de Redux para manejar el estado del servidor.

### Conceptos Clave de TanStack Query
* **queryKey:** Array de identificadores únicos para cachear una consulta (ej: `["users", searchTerm]`). Si algún valor del array cambia, la consulta se vuelve a ejecutar automáticamente.
* **staleTime:** El tiempo (en milisegundos) que los datos se consideran "frescos". Durante este periodo, si se monta otro componente que requiere la misma consulta, los datos se sirven instantáneamente desde la caché sin hacer llamadas a la red.
* **gcTime (Garbage Collection Time):** El tiempo que los datos inactivos permanecen almacenados en caché antes de ser eliminados de la memoria para liberar recursos.
* **AbortSignal:** Mecanismo nativo del navegador que permite cancelar peticiones HTTP activas en curso. Si un usuario escribe rápido, las peticiones previas que aún no hayan completado se cancelan inmediatamente, ahorrando recursos del cliente y del servidor.

---

## 5. Validación en Runtime e Integridad de Datos

### ¿Por qué validar datos en runtime con Zod?
Normalmente, confiamos en TypeScript para el tipado estricto durante la compilación. Sin embargo, TypeScript desaparece una vez compilado a JavaScript de producción. Si la API externa cambia silenciosamente la estructura de un objeto (ej: renombrando un campo), la app puede fallar silenciosamente.

* **Zod** comprueba la estructura real de los datos JSON que entran a la aplicación en tiempo de ejecución. Si los datos no coinciden con el esquema esperado, Zod lanza un error capturable, evitando que datos corruptos lleguen a los componentes de presentación de React.

---

## 6. Patrones de Diseño (GoF y React)

### Adapter Pattern (Estructural)
* **Definición:** Convierte la interfaz de una clase o API externa en otra interfaz que el cliente espera. Permite que clases que no podrían colaborar por incompatibilidad de interfaces trabajen juntas.
* **Uso en GitExplorer:** La API de GitHub devuelve campos usando snake_case (ej: `avatar_url`, `public_repos`). Mediante `userAdapter`, mapeamos y transformamos estos objetos a variables camelCase estandarizadas (`photo`, `repos`), aislando por completo la lógica de presentación de la estructura de la base de datos externa.

### Facade Pattern (Estructural)
* **Definición:** Proporciona una interfaz unificada y simplificada para acceder a un subsistema complejo o grupo de librerías.
* **Uso en GitExplorer:** El componente visual `SearchPage` no debe preocuparse por cómo funciona TanStack Query, cómo se configura el debounce de tiempo, o cómo se gestiona el enrutamiento de la SPA. La clase `useUserSearchFacade` unifica toda esta complejidad y expone variables booleanas simples e intuitivas (`users`, `isLoading`, `isEmpty`).

### Factory Pattern (Creacional)
* **Definición:** Define una interfaz para crear un objeto, pero deja que las clases o la lógica condicional decidan qué clase instanciar.
* **Uso en GitExplorer:** `ResultFactory` evalúa en tiempo de ejecución la propiedad `type` del perfil descargado y decide de manera automatizada si debe instanciar e inyectar un componente `UserCard` o una tarjeta especial `OrganizationCard` (con badge morado).

### Compound Components Pattern (React)
* **Definición:** Patrón de React que permite que varios componentes colaboren compartiendo estado implícitamente, ofreciendo una sintaxis mucho más limpia y declarativa en el JSX.
* **Uso en GitExplorer:** En lugar de pasar 10 props de configuración a `UserCard`, estructuramos la tarjeta como:
  ```jsx
  <UserCard username="mojombo">
    <UserCard.Avatar avatarUrl="photo.jpg" />
    <UserCard.Header />
    <UserCard.Footer />
  </UserCard>
  ```
  Esto permite al desarrollador reordenar la estructura visual o inyectar elementos adicionales de forma flexible en el DOM intermedio.

---

## 7. Simulación de Red y Mocking con Service Workers

### Mock Service Worker (MSW)
A diferencia de los mocks tradicionales de Jest/Vitest que sobreescriben la función global `fetch` o `axios` en memoria, **MSW** intercepta las llamadas de red reales a nivel de navegador utilizando la API estándar de **Service Workers**.

1. El navegador realiza una llamada a `https://api.github.com/users/mojombo`.
2. El Service Worker de MSW (`public/mockServiceWorker.js`) intercepta la llamada saliente.
3. Evalúa si el endpoint coincide con alguno de nuestros controladores (`handlers.js`).
4. Si coincide, detiene la llamada de red hacia internet y responde localmente con el JSON de pruebas.
5. El navegador cree que la llamada HTTP realmente viajó por internet, lo que permite probar fallos de red reales, latencia simulada y códigos de estado (403, 404, 500) sin alterar ni una sola línea de código del negocio.
