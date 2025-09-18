# 📝 Ejercicios de Asincronía y Promesas en JavaScript

Estos ejercicios están basados en la explicación de asincronía, promesas y `async/await`.  
El objetivo es practicar paso a paso desde callbacks hasta `Promise.all` con `fetch`.

---

## 1️⃣ Callback básico (timer)
Crea una función `esperar(ms, callback)` que use `setTimeout` para ejecutar el callback después de cierto tiempo.  

**Requerimiento:**  
- Llamala con 2000 ms y que imprima:  
  ```
  Pasaron 2 segundos
  ```

---

## 2️⃣ Promesa con éxito o error
Crea una función `cargarDatos()` que devuelva una **promesa**.  

**Requerimiento:**  
- La promesa debe resolverse con `"Datos cargados"` después de 2 segundos.  
- Pero si un número aleatorio es menor a `0.5`, debe **rechazar** con `"Error en la carga"`.  
- Manejá los dos casos con `.then` y `.catch`.

---

## 3️⃣ Encadenamiento de promesas
Simula un flujo de operaciones con promesas:  

1. Conectar a un servidor (tarda 1s, devuelve `"Conectado"`).  
2. Descargar datos (tarda 2s, devuelve `"Datos descargados"`).  
3. Procesar los datos (tarda 1s, devuelve `"Datos procesados"`).  

👉 Usá encadenamiento `.then(...)` para que cada paso dependa del anterior.

---

## 4️⃣ Async/Await con fetch
Usando `async/await` y la [PokeAPI](https://pokeapi.co/):  

**Requerimiento:**  
- Escribe una función `getPokemon(nombre)` que:  
  1. Haga un `fetch` a `https://pokeapi.co/api/v2/pokemon/{nombre}`.  
  2. Obtenga `id`, `name` y `height`.  
  3. Los muestre en consola.  
- Manejá errores con `try/catch`.

---

## 5️⃣ Promise.all con varios requests
Crea una función `getPokemons(names)` que reciba un array de nombres de pokémon (por ejemplo:  
`["pikachu", "charmander", "squirtle"]`).  

**Requerimiento:**  
- La función debe hacer un `fetch` por cada nombre en paralelo usando `Promise.all`.  
- Al terminar, mostrar en una tabla (`console.table`) el nombre y la altura de cada pokémon.  
- Si alguno falla, que el error se capture y se muestre en consola.

---

## ✅ Con estos ejercicios practicas:
1. Callbacks y `setTimeout`.  
2. Creación y uso de promesas con `resolve` y `reject`.  
3. Encadenamiento `.then`.  
4. Uso de `async/await` y `try/catch`.  
5. Peticiones múltiples en paralelo con `Promise.all`.
