# Promesas y Asincronía — Explicación completa para principiantes (sin ejercicios)

**Lectura pensada para alguien que no sabe nada del tema.** Aquí se explica desde cero, con ejemplos prácticos y muchas analogías de la vida real. No hay ejercicios, solo explicación.

---

## 1) ¿Qué es *asincronía*? (explicación simple)
- **Síncrono:** cada instrucción se ejecuta una después de la otra. El programa espera a que una termine para empezar la siguiente.  
  Ejemplo simple: preparar un sándwich siguiendo pasos uno por uno.

- **Asíncrono:** podemos iniciar tareas que tardan y seguir con otras cosas sin bloquear la ejecución. Cuando la tarea termina, recibimos el resultado y lo procesamos.  
  Ejemplo: mandar a imprimir un documento y mientras se imprime, seguir respondiendo mensajes en tu teléfono.

**Analogía rápida:** si pedís comida por delivery:
- Pedís la comida (inicias una tarea que tardará).
- Sigues viendo Netflix (tu programa no queda detenido).
- Cuando llega la comida, te avisan y la retiras (callback / promesa se cumple).

---

## 2) ¿Por qué JavaScript necesita asincronía?
- JavaScript corre en **un solo hilo** (single-thread). Si hicieras operaciones lentas (ej: descargar un archivo grande) de forma síncrona, la interfaz se congelaría.
- La asincronía permite: peticiones web, timers, lectura/escritura de archivos (en Node), y otras operaciones que tardan, sin bloquear la interfaz.

---

## 3) El **Event Loop** (paso a paso, claro)
El *Event Loop* es el mecanismo que coordina todo:

1. **Call Stack**: cola de ejecución actual (lo que el motor está ejecutando ahora).
2. **Web APIs** (o APIs del entorno): temporizadores, `fetch`, eventos del navegador. Estas APIs corren fuera del Call Stack y notifican cuando algo terminó.
3. **Microtask Queue**: promesas resueltas `.then(...)`, `queueMicrotask`, etc. Se ejecutan con **alta prioridad**.
4. **Task Queue / Macrotasks**: `setTimeout`, `setInterval`, eventos DOM. Se procesan después de las microtasks.

**Orden de ejecución** (simplificado):
- Ejecuta lo que está en el Call Stack.
- Cuando queda vacío: procesa todas las microtasks (promesas resueltas).
- Luego toma una macrotask y ejecuta.
- Repite.

Esto explica porqué `Promise.resolve().then(...)` corre antes que `setTimeout(..., 0)`.

---

## 4) Callbacks (la forma original)
Un *callback* es simplemente una función que pasa como argumento para ejecutarla más tarde.

Ejemplo corto:  
```js
function esperar(ms, callback) { // (1)
  setTimeout(callback, ms);      // (2)
}                                // (3)

esperar(1000, () => {            // (4)
  console.log("1 segundo pasó"); // (5)
});                              // (6)
```
**Línea por línea:**
1. Definimos la función `esperar` con `ms` y `callback`.
2. Usamos `setTimeout` para pedir al navegador que llame `callback` después de `ms` ms.
3. Fin de la función.
4. Llamamos `esperar` con 1000 ms y un callback.
5. El callback imprime el mensaje cuando se ejecuta.
6. Fin.

**Problemas con callbacks:**
- Anidamiento excesivo → código difícil de leer: el famoso *callback hell*.
- Manejo de errores y flujo complejo.

---

## 5) Promesas — la idea central (analogía y definición)
**Analogía:** una promesa es como un *vale* o *ticket* que te dan cuando pides algo.  
- Ese ticket promete: "cuando esté listo, te aviso y te doy el resultado".  
- Mientras tanto, vos podés hacer otras cosas.
- Cuando el resultado llega, podés usar `.then()` para recibirlo, o `.catch()` si hubo un problema.

**Definición técnica:**  
Una `Promise` es un objeto que representa la eventual finalización (o fallo) de una operación asincrónica. Tiene 3 estados: `pending` (pendiente), `fulfilled` (resuelta) o `rejected` (rechazada).

---

## 6) Crear una promesa: ejemplo y explicación línea por línea

```js
const promesa = new Promise((resolve, reject) => { // (1)
  const exito = true;                              // (2)
  setTimeout(() => {                               // (3)
    if (exito) resolve("Resultado OK");            // (4)
    else reject("Algo salió mal");                 // (5)
  }, 1500);                                        // (6)
});                                                // (7)
```

**Explicación:**
1. `new Promise((resolve, reject) => {` — creamos una promesa; le pasamos una función *executor* con dos funciones: `resolve` (para indicar éxito) y `reject` (para indicar fallo).
2. `const exito = true;` — variable de ejemplo que decide si la operación "fue bien".
3. `setTimeout(..., 1500)` — simulamos una operación que tarda 1.5s.
4. `if (exito) resolve("Resultado OK");` — llamamos a `resolve` con el valor resultante.
5. `else reject("Algo salió mal");` — si no, rechazamos.
6. 1500 ms de espera.
7. Fin del constructor de la promesa.

**Qué pasa al utilizarla:**
```js
promesa
  .then(valor => console.log("Promesa resuelta con:", valor))
  .catch(err  => console.error("Promesa rechazada:", err));
```
- Si se llama `resolve("Resultado OK")`, el `.then` se ejecuta con `"Resultado OK"`.
- Si se llama `reject("Algo salió mal")`, el `.catch` se ejecuta con el error.

---

## 7) `.then`, `.catch`, `.finally` — ¿qué hace cada uno?

- `.then(callback)` — se ejecuta cuando la promesa se resuelve; recibe el valor de `resolve`.
- `.catch(callback)` — captura cualquier rechazo o error ocurrido en la cadena de promesas.
- `.finally(callback)` — se ejecuta al final, tanto si la promesa se resolvió como si se rechazó. Sirve para limpieza (ej: ocultar un loader).

**Notas clave:**
- `.then` puede retornar un valor (o una nueva promesa). Ese retorno pasa al siguiente `.then`.
- Si dentro de `.then` lanzás un error (throw) o retornás una promesa que se rechaza, el control salta al `.catch`.

---

## 8) Encadenamiento de promesas (chaining) — ejemplo y explicación

```js
cargarAlgo() // devuelve una promesa
  .then(resultado => {
    console.log("Paso 1:", resultado); // (1)
    return procesar(resultado);        // (2) -> puede devolver valor o promesa
  })
  .then(valorProcesado => {
    console.log("Paso 2:", valorProcesado); // (3)
  })
  .catch(err => {
    console.error("Capturado error:", err); // (4)
  });
```

**Explicación rápida:**
1. Primer `.then` recibe el resultado de `cargarAlgo`.
2. Retornamos algo (valor o promesa). Si retornamos una promesa, la cadena espera hasta que se resuelva.
3. Siguiente `.then` recibe lo que devolvimos.
4. `.catch` captura cualquier error anterior.

---

## 9) Convertir un callback a promesa (ejemplo práctico)

Callback original:
```js
function leerArchivo(ruta, callback) {
  // simulación
  setTimeout(() => {
    if (ruta === "ok.txt") callback(null, "contenido");
    else callback("no existe", null);
  }, 1000);
}
```

Versión con promesa:
```js
function leerArchivoPromesa(ruta) {
  return new Promise((resolve, reject) => { // (1)
    setTimeout(() => {                      // (2)
      if (ruta === "ok.txt") resolve("contenido"); // (3)
      else reject("no existe");                    // (4)
    }, 1000);
  });
}
```
- (1) Creamos y retornamos la promesa.
- (2) Simulamos la operación asíncrona.
- (3) En caso de éxito llamamos `resolve`.
- (4) En caso de fallo llamamos `reject`.

Uso:
```js
leerArchivoPromesa("ok.txt")
  .then(contenido => console.log(contenido))
  .catch(err => console.error(err));
```

---

## 10) `async` / `await` — cómo lo pienses y cómo usarlo

**Idea:** `async/await` es una forma más legible y parecida a código síncrono para trabajar con promesas.

- `async` antes de una función convierte la función para que devuelva siempre una promesa.
- `await` "espera" a que una promesa se resuelva y devuelve su valor. Solo funciona dentro de funciones `async` o en módulos con *top-level await*.

Ejemplo con explicación:

```js
async function obtenerUsuario() {              // (1)
  try {                                        // (2)
    const res = await fetch("/usuario/1");    // (3)
    if (!res.ok) throw new Error("HTTP " + res.status); // (4)
    const data = await res.json();            // (5)
    return data;                              // (6)
  } catch (err) {                              // (7)
    console.error("Error en obtenerUsuario:", err); // (8)
    throw err;                                 // (9)
  }
}
```
1. `async function` devuelve una promesa.
2. `try` para capturar errores (sincrónicos y de `await`).
3. `await fetch(...)` espera la promesa devuelta por `fetch`.
4. Chequeo de status HTTP; si falla, lanzamos error.
5. `await res.json()` espera otra promesa que convierte la respuesta a objeto.
6. `return` devuelve el dato; la promesa de la función se resuelve con ese valor.
7-9. Manejo y relanzamiento del error.

Uso:
```js
obtenerUsuario()
  .then(u => console.log(u))
  .catch(e => console.error(e));
```

O directamente dentro de otra `async`:
```js
async function ejecutar() {
  const usuario = await obtenerUsuario();
  console.log(usuario);
}
```

---

## 11) Manejo de errores (por qué `try/catch` con async es importante)
- Si `await` produce una promesa rechazada, se lanza una excepción dentro de la función `async`.  
- Por eso conviene envolver con `try/catch`.  
- Además, es buena idea `throw` o `return` errores de forma explícita para que quien llama pueda manejar el fallo.

---

## 12) Combinadores de promesas: `Promise.all`, `Promise.race`, `Promise.allSettled`, `Promise.any`

- `Promise.all([...])` — espera a que **todas** las promesas se resuelvan. Si alguna falla, falla todo. Útil cuando necesitas todos los resultados.  
- `Promise.race([...])` — se resuelve/rechaza con la **primera** promesa que termine. Útil para timeouts o primeros en responder.  
- `Promise.allSettled([...])` — espera todas y devuelve un array con el estado de cada una (útil cuando no querés que una falla arruine todo).  
- `Promise.any([...])` — se resuelve con la **primera** promesa que se resuelva correctamente; ignora rechazos, y si todas fallan, rechaza.

**Ejemplo ilustrativo (sin código extenso):**
- Tenés 3 servidores para obtener un dato. Si querés cualquiera que responda rápido, `Promise.race` te da el primero. Si necesitás los 3 resultados, `Promise.all`. Si querés saber el estado de cada uno sin fallar todo, `allSettled`.

---

## 13) Ejemplos de la vida real que ayudan a entender

1. **Pedido de comida (promesa):**  
   - Pedís la comida (creás la promesa).  
   - Mientras tanto, hacés otras cosas.  
   - Cuando llega, la promesa se "resuelve" y recibís la comida (valor).  
   - Si el repartidor se pierde, la promesa se "rechaza".

2. **Caja postal (correo):**  
   - Dejas una carta en el buzón (inicias la tarea).  
   - La carta puede tardar días (operación asíncrona).  
   - Te notifican cuando llega (callback/promesa resuelta) o te avisan si se perdió (rechazada).

3. **Cocinar varias cosas (Promise.all):**  
   - Haces arroz, guiso y ensalada en paralelo. Si necesitás que todo esté listo para servir, esperás a que **las tres** terminen (Promise.all). Si una se quema y no lo manejás, todo se arruina (rechazo).

4. **Subasta / quien responde primero (Promise.race):**  
   - Si necesitas la respuesta más rápida entre varios proveedores, usás `race` y tomás la primera.

5. **Promesa como factura:**  
   - Comprás algo online; te dan un número de pedido (promesa). El pedido puede tardar, pero el sistema te permite seguir navegando. Cuando el pedido se envía, el sistema actualiza el estado y podés hacer seguimiento (como `.then`).

---

## 14) Errores comunes (y cómo evitarlos)

- **Olvidar manejar rejections:** siempre `.catch` o `try/catch` en `async`.
- **Pensar que `fetch` lanza en 404:** no lo hace; hay que verificar `response.ok`.
- **No retornar promesas en `.then`:** provoca que la cadena no espere lo que debería.
- **Intentar usar `await` fuera de `async` (en archivos sin top-level await):** producirá error.
- **Mezclar demasiado callbacks y promesas sin orden:** confusión y bugs.

---

## 15) Buenas prácticas (resumido)

- Prefiere `async/await` para flujos secuenciales legibles.
- Usa `Promise.all` para tareas paralelas independientes y `allSettled` cuando quieras tolerar fallos parciales.
- Maneja siempre errores.
- No olvides comprobar `response.ok` con `fetch`.
- Si convertís APIs viejas basadas en callbacks, envolverlas en promesas mejora la legibilidad.

---

## 16) Mini-Guía de "cómo pensar" al encarar un problema asincrónico

1. Identificá qué partes tardan (peticiones, archivos, timers).
2. Decidí si esas partes pueden correr en paralelo o deben ser secuenciales.
3. Para paralelo, usa `Promise.all` / `allSettled`. Para secuencial, usa `await` en orden.
4. Manejá errores en cada paso y proveé fallback si es necesario (ej: reintentos).
5. Evitá efectos colaterales compartidos sin sincronización.

---

## 17) Conclusión y siguiente paso recomendado
- La promesa es simplemente una forma de representar "algo que estará disponible en el futuro".
- `async/await` hace que el código asincrónico se parezca más al código síncrono y sea más legible.
- Practicar con ejemplos simples (peticiones `fetch`, `setTimeout`) ayuda muchísimo.

---

**Si querés, puedo:**
- Agregar estos textos al archivo MD que ya tenés, y generar el nuevo MD para que lo descargues.  
- Convertirlo a PDF listo para imprimir.  
- Explicar con más ejemplos la parte del `Event Loop` o del `Promise.all` con diagramas.

(Te dejé esto sin ejercicios, tal como pediste).  
