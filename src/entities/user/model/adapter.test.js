/**
 * @file adapter.test.js
 * @description Pruebas unitarias (Unit Tests) para el módulo del adaptador de usuarios.
 * Valida que la transformación de datos crudos de GitHub a nuestro Dominio funcione perfectamente.
 */

import { describe, it, expect } from "vitest";
import { userAdapter, usersCollectionAdapter } from "./adapter";

/**
 * 🎓 CONCEPTO JUNIOR: Unit Testing (Pruebas Unitarias)
 * - `describe`: Crea un bloque que agrupa varias pruebas relacionadas a una misma función (`userAdapter`).
 * - `it` (o `test`): Define el caso de prueba individual. Debe leerse como una frase ("debería adaptar los datos crudos...").
 * - `expect`: Es la aserción. Compara lo que de verdad devolvió nuestra función contra lo que NOSOTROS esperábamos que devolviera.
 */
describe("userAdapter", () => {
  
  it("debería adaptar los datos crudos de la API de GitHub correctamente", () => {
    // 1. Arrange (Preparar): Creamos el dato de entrada "falso" (Mock) que simula la respuesta de GitHub.
    const rawUser = {
      id: 12345,
      login: "testuser",
      avatar_url: "https://example.com/avatar.png",
      html_url: "https://github.com/testuser",
      type: "User",
      name: "Test User",
      bio: "Software developer",
      public_repos: 10,
      followers: 100,
      following: 50,
      public_gists: 2,
      location: "San Francisco",
      blog: "https://testuser.dev",
    };

    // 2. Act (Actuar): Ejecutamos nuestra función con el dato simulado.
    const adapted = userAdapter(rawUser);

    // 3. Assert (Afirmar): Verificamos que la salida coincida EXACTAMENTE con nuestra estructura requerida por FSD.
    expect(adapted).toEqual({
      id: 12345,
      username: "testuser",
      name: "Test User",
      photo: "https://example.com/avatar.png",
      profileUrl: "https://github.com/testuser",
      type: "User",
      bio: "Software developer",
      repos: 10,
      followers: 100,
      following: 50,
      gists: 2,
      location: "San Francisco",
      website: "https://testuser.dev",
      origin: "github",
    });
  });

  it("debería hacer fallback del nombre hacia el login si el nombre viene nulo", () => {
    // 🎓 CONCEPTO JUNIOR: Edge Cases (Casos límite)
    // No basta probar "el camino feliz". ¿Qué pasa si el usuario no tiene nombre en GitHub? 
    // Nuestra función debe atrapar el nulo y usar su 'login' (username) como nombre.
    const rawUser = {
      id: 12345,
      login: "testuser",
      avatar_url: "https://example.com/avatar.png",
      html_url: "https://github.com/testuser",
      type: "User",
      name: null, // Aquí está el caso límite
      bio: null,
      public_repos: 0,
      followers: 0,
      following: 0,
      public_gists: 0,
      location: null,
      blog: null,
    };

    const adapted = userAdapter(rawUser);
    
    // Verificamos que nuestro 'fallback' (||) en el adapter.js funciona
    expect(adapted.name).toBe("testuser");
    expect(adapted.bio).toBe("");
    expect(adapted.location).toBe("");
    expect(adapted.website).toBe("");
  });

  it("debería adaptar una lista de usuarios crudos correctamente usando usersCollectionAdapter", () => {
    const rawList = [
      {
        id: 1,
        login: "user1",
        avatar_url: "https://example.com/1.png",
        html_url: "https://github.com/user1",
      },
      {
        id: 2,
        login: "user2",
        avatar_url: "https://example.com/2.png",
        html_url: "https://github.com/user2",
      }
    ];

    const adaptedList = usersCollectionAdapter(rawList);
    
    expect(adaptedList).toHaveLength(2); // Comprueba el tamaño del arreglo
    expect(adaptedList[0].username).toBe("user1"); // Comprueba el primer elemento
    expect(adaptedList[1].username).toBe("user2"); // Comprueba el segundo elemento
  });
});
