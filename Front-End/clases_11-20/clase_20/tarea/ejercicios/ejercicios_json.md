# 📘 Ejercicios de JSON en JavaScript

Aquí tienes **5 ejercicios prácticos** para entender y practicar cómo
funciona **JSON en JavaScript**. 🚀\
Están ordenados de lo más básico a lo más avanzado.

------------------------------------------------------------------------

## 📝 Ejercicio 1: Convertir un objeto a JSON

Tienes este objeto de usuario en JavaScript:

``` js
const usuario = {
  nombre: "Pedro",
  edad: 25,
  pais: "Argentina"
};
```

👉 Convierte este objeto a una cadena JSON usando `JSON.stringify()` y
muéstralo en consola.

------------------------------------------------------------------------

## 🔄 Ejercicio 2: Convertir JSON a objeto

Tienes esta cadena JSON:

``` json
{
  "producto": "Teclado mecánico",
  "precio": 120,
  "stock": true
}
```

👉 Convierte esta cadena a un objeto de JavaScript con `JSON.parse()` y
muestra el resultado.

------------------------------------------------------------------------

## 📋 Ejercicio 3: Recorrer datos en JSON

Tienes esta cadena JSON que representa una lista de frutas:

``` json
["🍎 Manzana", "🍌 Banana", "🍊 Naranja"]
```

👉 Convierte este JSON en un array de JavaScript y recórrelo con un
bucle mostrando cada fruta en consola.

------------------------------------------------------------------------

## 🧑‍💻 Ejercicio 4: JSON dentro de JSON

Tienes este JSON con datos anidados:

``` json
{
  "nombre": "María",
  "edad": 30,
  "direccion": {
    "calle": "Av. Siempre Viva",
    "numero": 742,
    "ciudad": "Springfield"
  }
}
```

👉 Convierte esta cadena a objeto de JavaScript y muestra en consola la
**calle** y la **ciudad**.

------------------------------------------------------------------------

## 🌐 Ejercicio 5: Simular respuesta de una API

Imagina que recibes esta respuesta JSON de un servidor:

``` json
{
  "usuarios": [
    { "id": 1, "nombre": "Ana" },
    { "id": 2, "nombre": "Carlos" },
    { "id": 3, "nombre": "Lucía" }
  ]
}
```

👉 Convierte este JSON en objeto y muestra en consola el nombre del
usuario con `id = 2`.

------------------------------------------------------------------------

✨ ¡Listo! Estos ejercicios te ayudarán a **dominar JSON en JavaScript**
practicando casos muy comunes. 💪🔥
