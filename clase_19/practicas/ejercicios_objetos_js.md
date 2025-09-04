# 📝✨ Ejercicios de Objetos en JavaScript ✨

Este documento contiene **10 ejercicios** de práctica de objetos en JavaScript, desde lo más básico hasta clases y arrays de objetos.

Cada ejercicio tiene:
- **💡 Así lo hice:** tu versión inicial completa
- **✅ Resultado:** si estaba bien, dice que estaba correcto; si estaba mal, muestra el código completo corregido con comentarios explicativos
- **📚 Explicación:** teoría y motivo de las correcciones

---

## 1️⃣ Ejercicio 1: Crear un objeto simple
**💡 Así lo hice:**
```js
let persona = {
  nombre: "Pedro",
  edad: 20,
  ciudad: "Buenos Aires",
};

console.log(persona.nombre);
console.log(persona.edad);
console.log(persona.ciudad);
```
**✅ Resultado:** Estaba correcto ✅
**📚 Explicación:**
- Creación de objeto y acceso a propiedades con `obj.propiedad`.
- Perfecto para iniciarse en objetos.

---

## 2️⃣ Ejercicio 2: Métodos en objetos
**💡 Así lo hice:**
```js
let persona2 = {
  nombre: "Juan",
  edad: 17,
  ciudad: "Merlo",
  frase: function () {
    console.log("Si lo puedes soñar lo puedes hacer");
  },
};

console.log(persona2.frase);
```
**✅ Resultado:** ❌ Estaba mal
**✅ Corrección completa:**
```js
let persona2 = {
  nombre: "Juan",
  edad: 17,
  ciudad: "Merlo",
  frase: function () {
    console.log("Si lo puedes soñar lo puedes hacer");
  },
};

persona2.frase(); // ✅ Ejecuta el método correctamente
```
**📚 Explicación:**
- Para ejecutar un método se usan paréntesis `()`.

---

## 3️⃣ Ejercicio 3: Objetos anidados
**💡 Así lo hice:**
```js
let auto = {
  marca: "Volkswagen",
  modelo: "Polo 2022",
  propietario: {
    nombre: "Adrian",
    edad: 35,
    direccion: {
      calle: "13 de diciembre",
      numero: 1820,
    },
  },
};

console.log(`El veiculo de ${this.nombre} y este es un ${this.marca} ${this.modelo}`);
```
**✅ Resultado:** ❌ Estaba mal
**✅ Corrección completa:**
```js
let auto = {
  marca: "Volkswagen",
  modelo: "Polo 2022",
  propietario: {
    nombre: "Adrian",
    edad: 35,
    direccion: {
      calle: "13 de diciembre",
      numero: 1820,
    },
  },
};

console.log(`El vehículo de ${auto.propietario.nombre} es un ${auto.marca} ${auto.modelo}`);
```
**📚 Explicación:**
- `this` solo funciona dentro de métodos.
- Para acceder a propiedades de objetos anidados se usa `objeto.propiedad.propiedad`.

---

## 4️⃣ Ejercicio 4: Recorrer propiedades
**💡 Así lo hice:**
```js
let producto = {
  nombre: "Fideos",
  precio: 1500,
  stock: 10,
};

for (let clave in producto) {
  console.log(clave + ": " + producto[clave]);
}
```
**✅ Resultado:** Estaba correcto ✅
**📚 Explicación:**
- `for...in` recorre todas las propiedades de un objeto.
- `obj[clave]` accede a cada valor.

---

## 5️⃣ Ejercicio 5: Array de objetos
**💡 Así lo hice:**
```js
let estudiantes = [
  { nombre: "Pedro", edad: 20, nota: 10 },
  { nombre: "Florencia", edad: 19, nota: 9 },
];

for (let clave in estudiantes) {
  console.log(clave + ": " + estudiantes[clave]);
}
```
**✅ Resultado:** ❌ Estaba mal
**✅ Corrección completa:**
```js
let estudiantes = [
  { nombre: "Pedro", edad: 20, nota: 10 },
  { nombre: "Florencia", edad: 19, nota: 9 },
];

for (let estudiante of estudiantes) {
  console.log(`${estudiante.nombre} tiene una nota de ${estudiante.nota}`);
}
```
**📚 Explicación:**
- `for...in` devuelve índices del array.
- `for...of` devuelve directamente los objetos.

---

## 6️⃣ Ejercicio 6: Método con this
**💡 Así lo hice:**
```js
let persona6 = {
  nombre: "Matias",
  edad: 20,
  saludar: function () {
    console.log(`Mi nombre es ${this.nombre} y mi edad es ${this.edad}`);
  }
}
persona6.saludar();
```
**✅ Resultado:** Estaba correcto ✅
**📚 Explicación:**
- `this` apunta al objeto que ejecuta el método.

---

## 7️⃣ Ejercicio 7: Métodos para depositar y retirar
**💡 Así lo hice:**
```js
let usuario = {
  nombre: "Miguel",
  saldo: 2200,
};

function depositar(num){ usuario.saldo += num; return usuario.saldo; }
function retirar(num){
  if(num > usuario.saldo){ console.log("No hay fondos"); }
  else { usuario.saldo -= num; return usuario.saldo; }
}
```
**✅ Resultado:** ❌ Estaba mal
**✅ Corrección completa:**
```js
let usuario = {
  nombre: "Miguel",
  saldo: 2200,
  depositar: function(num) {
    this.saldo += num;
    return this.saldo;
  },
  retirar: function(num) {
    if(num > this.saldo){
      console.log("Fondos insuficientes ❌");
    } else {
      this.saldo -= num;
      return this.saldo;
    }
  }
};

console.log(usuario.depositar(500)); // 2700
console.log(usuario.retirar(300));   // 2400
console.log(usuario.retirar(5000));  // ❌ Fondos insuficientes, saldo no cambia
```
**📚 Explicación:**
- Mejor encapsular funciones como métodos dentro del objeto.
- `this` apunta al objeto y permite manejar sus propios datos.

---

## 8️⃣ Ejercicio 8: Array de objetos con búsqueda
**💡 Así lo hice:**
```js
function buscar_libro(libro_deseado){
  for(let libro of biblioteca){
    if(libro_deseado === nombre){
      console.log("El libro está");
    } else {
      console.log("El libro no está");
    }
  }
}
```
**✅ Resultado:** ❌ Estaba mal
**✅ Corrección completa:**
```js
let biblioteca = [
  { nombre: "Mejores Recetas", epoca: 2005, stock: 10 },
  { nombre: "Peores Recetas", epoca: 2000, stock: 5 },
  { nombre: "Media Recetas", epoca: 2002, stock: 0 },
];

function buscar_libro(libro_deseado){
  let encontrado = false;
  for(let libro of biblioteca){
    if(libro.nombre === libro_deseado){
      console.log(`✅ El libro "${libro_deseado}" está disponible`);
      encontrado = true;
      break;
    }
  }
  if(!encontrado){
    console.log(`❌ El libro "${libro_deseado}" no está en la biblioteca`);
  }
}

buscar_libro("Media Recetas"); // existe
buscar_libro("Recetas Malas"); // no existe
```
**📚 Explicación:**
- Se corrige el uso de propiedad `libro.nombre`.
- Uso de bandera para no imprimir "no está" varias veces.

---

## 9️⃣ Ejercicio 9: Carrito de compras
**💡 Así lo hice:**
```js
let carrito = {
  productos : [],
  agregar_pruducto : function (producto_ingresado) {
    this.productos.push(producto_ingresado);
  }
}

let manzana = {
  nombre: "manzana",
  precio : 1500,
}

carrito.agregar_pruducto(manzana);
console.log(carrito);
```
**✅ Resultado:** ❌ Tenías un typo en el método `agregar_pruducto`
**✅ Corrección completa:**
```js
let carrito = {
  productos : [],
  agregar_producto : function (producto_ingresado) { // corregido nombre
    this.productos.push(producto_ingresado);
  }
}

let manzana = {
  nombre: "manzana",
  precio: 1500,
}

carrito.agregar_producto(manzana);
console.log(carrito);
```
**📚 Explicación:**
- Importante cuidar nombres de métodos y consistencia.
- `this.productos.push` agrega elementos correctamente.

---

## 🔟 Ejercicio 10: Clases y objetos
**💡 Así lo hice:**
```js
let alumnos = [];

class alumno {
  constructor(nombre, edad, nota){
    this.nombre = nombre;
    this.edad = edad;
    this.nota = nota;
  }
  saludar
}

let manuel = new alumno ("manuel",21, 10);
alumnos.push(manuel);
let marcos = new alumno ("marcos",12, 6);
alumnos.push(marcos);
let julian = new alumno ("julian",55, 1);
alumnos.push(julian);

for (let key ) {
  console.log(`${estudiante.nombre} tiene una nota de ${estudiante.nota}`);
}
```
**✅ Resultado:** ❌ Estaba mal
**✅ Corrección completa:**
```js
let alumnos = [];

class Alumno {
  constructor(nombre, edad, nota){
    this.nombre = nombre;
    this.edad = edad;
    this.nota = nota;
  }
  saludar() {
    console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`);
  }
}

let manuel = new Alumno("Manuel",21,10);
alumnos.push(manuel);
let marcos = new Alumno("Marcos",12,6);
alumnos.push(marcos);
let julian = new Alumno("Julian",55,1);
alumnos.push(julian);

for (let estudiante of alumnos){
  console.log(`${estudiante.nombre} tiene una nota de ${estudiante.nota}`);
}
```
**📚 Explicación:**
- Corregido nombre de clase `Alumno` (clases con mayúscula inicial).
- Se agregó método `saludar()` correctamente.
- Se usa `for...of` para recorrer array de objetos.
- Se corrige el bucle `for` incompleto y variable `estudiante`.

