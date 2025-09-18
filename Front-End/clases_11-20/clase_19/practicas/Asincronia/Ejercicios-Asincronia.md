# 🚀 Ejercicios de Asincronía en JavaScript

---

## 📌 **Nivel 1 – Callbacks**

1. ✨ Crea una función `esperar(ms, callback)` que use `setTimeout` para ejecutar el callback después de cierto tiempo.  
   - Ejemplo: `esperar(2000, () => console.log("Pasaron 2s"));`

2. 💳 Simula un **cajero automático**:  
   - Una función que recibe un número de cuenta y, después de 3 segundos, devuelve un mensaje con el saldo.

---

## 📌 **Nivel 2 – Promesas**

3. ⏳ Crea una promesa que se resuelva después de 2 segundos con el mensaje `"Datos cargados"`.  

4. 🔗 Encadena promesas para simular:  
   - Conectar a un servidor  
   - Descargar datos  
   - Mostrar los datos en consola  

5. 🎲 Crea una función `randomPromesa()` que:  
   - Resuelva con `"Éxito"` si el número aleatorio es > 0.5  
   - Rechace con `"Error"` si es menor o igual  

---

## 📌 **Nivel 3 – Async/Await**

6. ⚡ Usa `async/await` para consumir la [PokeAPI](https://pokeapi.co/).  
   - Pide un Pokémon por nombre y muestra su `id`, `name` y `height`.  

7. 📊 Haz una función `getPokemons(names)` que reciba un array de nombres y obtenga todos con `Promise.all`.  

---

## 📌 **Nivel 4 – Prácticos con JSON y fetch**

8. 👤 Crea una función `crearUsuario(usuario)` que haga un `POST` a un endpoint falso (ejemplo: `https://jsonplaceholder.typicode.com/users`) enviando el usuario en formato JSON.  

9. 📰 Haz una función `getPosts()` que obtenga los posts desde `https://jsonplaceholder.typicode.com/posts` y muestre los primeros 5.  

10. ❌ Implementa un `try/catch` que capture si la API devuelve error (simula con un endpoint incorrecto).  

---

## 📌 **Nivel 5 – Proyecto mini**

11. 📦 Simula un **sistema de pedidos online**:  
    - Clase `Pedido` con id, producto y estado (`pendiente`, `enviado`, `entregado`)  
    - Usa `setTimeout` para que después de 2 segundos el pedido pase a `"enviado"`, y después de 4 segundos a `"entregado"`.  
    - Muestra los cambios en consola paso a paso.

---

✅ **Con estos ejercicios practicas:**  
- Callbacks  
- Promesas  
- Encadenamiento  
- Async/Await  
- Uso de APIs y JSON  
- Simulación de procesos reales
