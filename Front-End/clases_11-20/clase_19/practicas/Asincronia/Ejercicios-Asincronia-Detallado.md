# 🚀 Ejercicios y Explicación Línea por Línea: Asincronía en JavaScript

**Objetivo:** Este archivo explica, **línea por línea**, los conceptos más importantes de asincronía en JavaScript y contiene ejercicios prácticos. Lee despacio: cada bloque de código tiene anotaciones numeradas y después la explicación de cada número.

---

## 🧭 Conceptos clave (breve)

- **Síncrono**: el programa espera a que cada instrucción termine antes de seguir.
- **Asíncrono**: el programa puede iniciar tareas que terminan luego (promesas, timers, peticiones) sin bloquear el resto del código.
- **Call Stack (pila de llamadas)**: donde se ejecuta el código ahora mismo.
- **Web APIs**: funciones del navegador (timers, fetch, eventos) que corren "fuera" del motor JS.
- **Task Queue (macrotasks)**: `setTimeout`, manejadores de eventos, etc.
- **Microtask Queue**: promesas resueltas (`.then`) y otros microtasks; tienen prioridad sobre macrotasks.

---

## 🔁 Event Loop — el orden importante

1. El motor JavaScript ejecuta lo que está en el *Call Stack*.
2. Cuando el *Call Stack* queda vacío, el Event Loop procesa **todas las microtareas** (promesas resueltas).
3. Luego toma **una** macrotarea (ej: `setTimeout`) y la ejecuta.
4. Repite.

Esto explica por qué `Promise.resolve().then(...)` se ejecuta antes que un `setTimeout(..., 0)` aunque ambos parezcan "inmediatos".

---

## 🧩 Callbacks — ejemplo y explicación línea por línea

```js
function esperar(ms, callback) { // (1)
  setTimeout(callback, ms);      // (2)
}                                // (3)

esperar(1500, () => {            // (4)
  console.log("Pasaron 1.5s");   // (5)
});                              // (6)

console.log("Esto sale antes");   // (7)
```

**Explicación:**

1. `function esperar(ms, callback) {` — defines una función llamada `esperar` con dos parámetros: `ms` (milisegundos) y `callback` (función a ejecutar).
2. `setTimeout(callback, ms);` — solicita al navegador ejecutar `callback` después de `ms` milisegundos. **No bloquea**; `setTimeout` delega la espera a la Web API.
3. `}` — fin de la función.
4. `esperar(1500, () => {` — llamás a `esperar`: se programa el callback para ejecutarse en 1500 ms.
5. `console.log("Pasaron 1.5s");` — el mensaje que se imprimirá cuando se ejecute el callback.
6. `});` — cierre.
7. `console.log("Esto sale antes");` — se ejecuta inmediatamente; aparecerá en consola **antes** del mensaje de 1.5s porque el callback fue programado y la ejecución siguió sin esperar.

---

## 🔗 Promesas — creación y encadenamiento

```js
const promesa = new Promise((resolve, reject) => { // (1)
  const ok = true;                                // (2)
  setTimeout(() => {                              // (3)
    if (ok) resolve("Hecho");                     // (4)
    else reject("Error");                         // (5)
  }, 1000);                                       // (6)
});                                               // (7)

promesa                                           // (8)
  .then(value => { console.log("Éxito:", value); return "siguiente"; }) // (9)
  .then(v2 => console.log("Cadena:", v2))                                 // (10)
  .catch(err => console.error("Catch:", err))                            // (11)
  .finally(() => console.log("Terminado"));                              // (12)
```

**Explicación:**

1. `new Promise((resolve, reject) => {` — creás una promesa; el callback (executor) recibe `resolve` y `reject`.
2. `const ok = true;` — variable simulada para decidir éxito o fallo.
3. `setTimeout(() => {` — simula operación asincrónica (ej: petición).
4. `if (ok) resolve("Hecho");` — si todo bien, se resuelve la promesa con el valor `"Hecho"`.
5. `else reject("Error");` — si falla, se rechaza con `"Error"`.
6. `}, 1000);` — tiempo de espera simulado (1s).
7. `});` — fin del constructor de la promesa.
8. `promesa` — la variable que guarda la promesa creada.
9. `.then(value => { ... })` — se ejecuta cuando la promesa se resuelve; recibe el valor de `resolve`. Lo que retornes aquí viaja al siguiente `.then`.
10. `.then(v2 => ...)` — siguiente eslabón del encadenamiento; recibe lo retornado por el `.then` anterior.
11. `.catch(err => ...)` — captura errores ocurridos en cualquier `.then` anterior o el `reject` original.
12. `.finally(() => ...)` — se ejecuta al final, tanto si la promesa se resolvió como si se rechazó.

**Punto clave:** si retornás una promesa dentro de `.then`, la cadena esperará a que esa promesa se resuelva antes de pasar al siguiente `.then`.

---

## 🧪 Microtasks vs Macrotasks — ejemplo que confunde

```js
console.log("start");                      // (1)

setTimeout(() => console.log("timeout"), 0); // (2)

Promise.resolve().then(() => console.log("promise")); // (3)

console.log("end");                        // (4)
```

**Salida esperada en consola:**
```
start
end
promise
timeout
```

**¿Por qué?**

1. `start` se imprime primero.
2. `setTimeout(...,0)` agenda una macrotarea; se ejecutará después de que el Call Stack quede vacío **y** de que se procesen las microtareas.
3. `Promise.resolve().then(...)` crea una microtarea que se ejecuta **antes** de las macrotareas.
4. `end` se imprime inmediatamente después de `start`. Luego el Event Loop: primero las microtareas (promise), luego la macrotarea (timeout).

---

## ⚡ async / await — ejemplo y línea por línea

```js
async function obtenerAlgo() {             // (1)
  try {                                     // (2)
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu"); // (3)
    if (!response.ok) throw new Error("HTTP " + response.status);           // (4)
    const data = await response.json();     // (5)
    return data;                            // (6)
  } catch (err) {                           // (7)
    console.error("Error interno:", err);   // (8)
    throw err;                              // (9)
  }                                         // (10)
}                                           // (11)

// Uso:
obtenerAlgo()
  .then(pokemon => console.log(pokemon.name)) // (12)
  .catch(e => console.error("Falló:", e));    // (13)
```

**Explicación:**

1. `async function obtenerAlgo()` — define una función asíncrona que siempre devuelve una promesa.
2. `try {` — bloque para capturar errores sincronícos y asincrónicos (cuando se usa `await`).
3. `const response = await fetch(...)` — `await` pausa la ejecución de **esta función** hasta que la promesa de `fetch` se resuelva; **no bloquea** el hilo principal.
4. `if (!response.ok) throw new Error(...)` — si la respuesta HTTP no es 2xx, lanzamos un error para manejarlo.
5. `const data = await response.json()` — `response.json()` devuelve otra promesa; la esperamos.
6. `return data` — esto hace que la promesa devuelta por `obtenerAlgo()` se resuelva con `data`.
7. `} catch (err) {` — si `fetch` falla o `response.json()` lanza, cae aquí.
8. `console.error("Error interno:", err)` — mostramos el error localmente.
9. `throw err` — re-lanzamos para que quien llamó a `obtenerAlgo()` pueda manejar el error.
10-11. cierre de bloques.
12. `.then(pokemon => ...)` — uso de la promesa devuelta por la función async.
13. `.catch(e => ...)` — captura errores re-lanzados.

**Tip:** `await` sólo puede usarse dentro de `async` (salvo top-level await en módulos modernos).

---

## 📦 fetch y JSON — puntos a notar

```js
const res = await fetch(url);         // (1)
if (!res.ok) throw new Error(...);    // (2)
const json = await res.json();        // (3)
```

1. `fetch(url)` devuelve una promesa que resuelve con un `Response` (aunque el HTTP sea 404 — eso no genera excepción automática).
2. `res.ok` revisa si el status está entre 200-299; si no, conviene lanzar error.
3. `res.json()` devuelve una promesa que, al resolverse, te da el objeto JS resultante del JSON. No uses `JSON.parse` sobre `res`, `res.json()` ya lo hace.

---

## ⚖️ Promise.all, Promise.race, Promise.allSettled

- `Promise.all([p1, p2])` → se resuelve cuando **todas** las promesas se resuelven; si **una** rechaza, rechaza todo.
- `Promise.race([p1, p2])` → se resuelve o rechaza con la primera promesa que termine.
- `Promise.allSettled([p1, p2])` → espera a todas y devuelve estados individuales (útil cuando no querés que un fallo detenga todo).

**Ejemplo:**

```js
const p1 = fetch(url1).then(r => r.json());
const p2 = fetch(url2).then(r => r.json());

const todos = await Promise.all([p1, p2]); // si p2 falla, todos falla
```

---

## 🐞 Errores comunes y cómo evitarlos

- **No devolver (return) en un `.then`**: si no retornás, el siguiente `.then` recibe `undefined`.
- **Asumir que `fetch` lanza en 404**: no lo hace; hay que chequear `res.ok`.
- **Mezclar callbacks y promesas sin orden**: puede generar lógica confusa.
- **No usar `try/catch` con `async/await`**: los errores pueden quedar sin manejar.
- **Ignorar rejections de promesas**: siempre `.catch` o usar `try/catch` en async.

---

## ✅ Buenas prácticas (rápidas)

- Usa `async/await` para código secuencial y `.then` cuando necesites encadenar de forma explícita.
- Maneja errores con `try/catch` y/o `.catch`.
- Valida `response.ok` en `fetch`.
- Para múltiples requests independientes, usa `Promise.all` para mejor rendimiento.
- Evita efectos secundarios compartidos sin control concurrente.

---

## 📝 Ejercicios (con pistas y soluciones breves)

> **Nota:** si querés, te doy las soluciones completas después; aquí encontrarás pistas y código ejemplo para aprender línea por línea.

### Nivel 1 — Callbacks
**Ej 1:** `esperar(ms, callback)`  
**Pista:** usa `setTimeout`.  

**Solución ejemplo:**
```js
function esperar(ms, callback) {           // (1)
  setTimeout(() => {                       // (2)
    callback();                            // (3)
  }, ms);                                  // (4)
}

esperar(2000, () => console.log("2s"));    // (5)
```
Explicación: (1) definís la función, (2) creás un timer, (3) ejecutás callback cuando termine, (4) tiempo en ms, (5) llamado.

---

### Nivel 2 — Promesas
**Ej 2:** Crea una promesa que se resuelva en 2s con "Datos cargados".  
**Solución ejemplo:**
```js
function cargarDatos() {
  return new Promise((resolve) => {         // (1)
    setTimeout(() => resolve("Datos cargados"), 2000); // (2)
  });
}

cargarDatos().then(msg => console.log(msg));
```

---

### Nivel 3 — Async/Await y fetch
**Ej 3:** Usa `async/await` para pedir un Pokémon por nombre y mostrar `id`, `name`, `height`.

**Solución ejemplo:**
```js
async function getPokemon(name) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`); // (1)
    if (!res.ok) throw new Error("HTTP " + res.status);                  // (2)
    const data = await res.json();                                       // (3)
    console.log(data.id, data.name, data.height);                       // (4)
    return data;
  } catch (err) {
    console.error("Error fetch:", err);                                  // (5)
    throw err;
  }
}

getPokemon("pikachu");
```

---

### Nivel 4 — Promise.all
**Ej 4:** Crea `getPokemons(names)` que obtenga varios pokémon con `Promise.all`.

**Solución ejemplo:**
```js
async function getPokemons(names) {
  const promesas = names.map(n => getPokemon(n));  // getPokemon devuelve promesa // (1)
  const results = await Promise.all(promesas);     // (2)
  return results;
}

getPokemons(["bulbasaur","charmander","squirtle"])
  .then(res => console.table(res.map(r => ({id: r.id, name: r.name}))))
  .catch(e => console.error(e));
```

---

## 📚 Recursos recomendados
- MDN — Promises, Fetch, Async/Await  
- Artículos y tutoriales interactivos (practicar en la consola del navegador o en Node)

---

Si querés, te dejo también la **versión imprimible (PDF)** o puedo **añadir soluciones completas** a cada ejercicio dentro del mismo md.  
Te lo guardé como archivo para que lo descargues y lo leas en tu editor.

