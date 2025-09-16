# 🟨 Objetos en JavaScript

---

## 🔹 Definición de un objeto
Un objeto es una **colección de pares clave-valor**.  
Es como una caja donde guardamos información organizada.

```js
let mi_objeto = {
  name: "pedro",
  edad: 20,
  esEstudiante: true,
  carrera: "Desarrollador web full stack",
};
```

---

## 🔹 Acceder a propiedades
Podemos acceder de dos formas:  

```js
console.log(mi_objeto.nombre);    // Pedro (notación con punto)
console.log(mi_objeto["edad"]);  // 22 (notación con corchetes)
```

👉 La notación con **punto** es la más usada, pero los corchetes sirven si la clave está en una variable.

---

## 🔹 Modificar y agregar propiedades
```js
mi_objeto.edad = 23;         // Cambia edad a 23
mi_objeto.altura = 1.75;     // Agrega nueva propiedad
delete mi_objeto.esEstudiante; // Elimina propiedad
```

---

## 🔹 Métodos en objetos
Un método es una **función dentro de un objeto**.

```js
let perro = {
  nombre: "firulais",
  edad: 5,
  ladrar: function () {
    console.log("Guau guau");
  },
};

perro.ladrar(); // ¡Guau guau!
```

👉 `ladrar` es un **método** del objeto `perro`.

---

## 🔹 `this` en objetos
Dentro de un método, `this` hace referencia al **objeto mismo**.

```js
let persona = {
  nombre: "juan",
  saludar: function () {
    console.log("Hola, mi nombre es " + this.nombre);
  },
};

persona.saludar(); // Hola, mi nombre es juan
```

---

## 🔹 Objetos anidados
Un objeto puede contener otros objetos.

```js
let alumno = {
  nombre: "florencia",
  direccion: {
    calle: "Fray Mocho",
    numero: 1309,
  },
  edad: 19,
  apellido: "emilia",
};

console.log(alumno.direccion.calle);  // Fray Mocho
console.log(alumno.direccion.numero); // 1309
```

---

## 🔹 Recorrer un objeto
Podemos recorrer sus propiedades con `for...in` o usando funciones de `Object`.

```js
for (let clave in persona) {
  console.log(clave + ": " + persona[clave]);
}

// Métodos útiles
console.log(Object.keys(persona));   // ['nombre', 'saludar']
console.log(Object.values(persona)); // ['juan', ƒ]
console.log(Object.entries(persona));// [['nombre','juan'], ['saludar', ƒ]]
```

---

## 🔹 Objetos y arrays juntos
Muchas veces se usan objetos dentro de arrays.

```js
let productos = [
  { nombre: "Laptop", precio: 1000 },
  { nombre: "Mouse", precio: 25 },
];

console.log(productos[0].nombre); // Laptop
```

---

# 🏗️ Clases y Objetos (POO en JS)

---

## 🔹 Definir una clase
Una **clase** es como un **molde** para crear objetos.

```js
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
}
```

👉 Esta clase dice: *“toda persona tiene un nombre y una edad”*.

---

## 🔹 El `constructor`
El **constructor** es una función especial que se ejecuta automáticamente cuando creamos un objeto con `new`.

```js
let juansito = new Persona("Juan", 30);
console.log(juansito); // Persona { nombre: 'Juan', edad: 30 }
```

---

## 🔹 ¿Qué es `this`?
`this` hace referencia al **objeto actual** que se está creando o usando.

```js
constructor(nombre, edad) {
  this.nombre = nombre; // 'this' apunta al objeto actual
  this.edad = edad;
}
```

👉 Si creo `juansito`, `this` será ese objeto.  
👉 Si creo `maria`, `this` será ese otro objeto.

---

## 🔹 Métodos dentro de una clase
Podemos añadir funciones (métodos) dentro de la clase.

```js
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`);
  }
}

let maria = new Persona("María", 25);
maria.saludar(); // Hola, soy María y tengo 25 años
```

👉 El método `saludar()` usa `this` para acceder a las propiedades del objeto.

---

## 🔹 Crear varios objetos fácilmente
En lugar de escribirlos a mano:

```js
let persona1 = { nombre: "Ana", edad: 20 };
let persona2 = { nombre: "Luis", edad: 35 };
```

Con clases:

```js
let ana = new Persona("Ana", 20);
let luis = new Persona("Luis", 35);
```

✅ Mucho más práctico cuando hay que manejar muchos datos.

---

## 🔹 Ventajas de las clases
1️⃣ **Reutilización** → creás un molde y lo usás muchas veces.  
2️⃣ **Organización** → propiedades y métodos relacionados juntos.  
3️⃣ **POO (Programación Orientada a Objetos)** → forma estándar en muchos lenguajes.

---
