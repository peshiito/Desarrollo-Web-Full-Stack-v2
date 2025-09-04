//EJERCICIO 1
let persona = {
  nombre: "Pedro",
  edad: 20,
  ciudad: "Buenos Aires",
};

console.log(persona.nombre);
console.log(persona.edad);
console.log(persona.ciudad);

// EJERCICIO 2
let persona2 = {
  nombre: "Juan",
  edad: 17,
  ciudad: "merlo",
  frase: function () {
    console.log("Si lo puedes soñar lo puedes hacer");
  },
};

console.log(persona2.nombre);
console.log(persona2.edad);
console.log(persona2.ciudad);
console.log(persona2.frase); //Esta mal asi
//Asi esta bien :
persona2.frase();

//EJERCICIO 3
let auto = {
  marca: "volkswagen",
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

console.log(
  `El veiculo de ${this.nombre} y este es un ${this.marca} ${this.modelo}`
); //Esta mal asi, estaba usando el this fuera del objeto entonces no funciona
//asi se hace:

console.log(
  `El vehículo de ${auto.propietario.nombre} es un ${auto.marca} ${auto.modelo}`
);

//EJERCICIO 4
let producto = {
  nombre: "Fideos",
  precio: 1500,
  stock: 10,
};

for (let clave in producto) {
  console.log(clave + ": " + producto[clave]);
}

//EJERCICIO 5
let estudiantes = [
  { nombre: "Pedro", edad: 20, nota: 10 },
  { nombre: "Florencia", edad: 19, nota: 9 },
];

for (let clave in estudiantes) {
  console.log(clave + ": " + estudiantes[clave]);
}
// asi esta mal
//❌ Problema: for...in sobre arrays no es lo mejor, te devuelve los índices, y al imprimir
// estudiantes[clave] muestra objetos enteros, no las notas/nombres como pedía
// el ejercicio.

//✔️ Corrección con for...of:
for (let estudiante of estudiantes) {
  console.log(`${estudiante.nombre} tiene una nota de ${estudiante.nota}`);
}

//EJERCICIO 6

let persona6 = {
  nombre: "Matias",
  edad: 20,
  saludar: function () {
    console.log(`Mi nombre es ${this.nombre} y mi edad es ${this.edad}`);
  }
}

persona6.saludar();

// EJERCICIO 7

// // let usuario = {
//   nombre: "Miguel",
//   saldo: 2200,
// };

function depositar(num) {
  usuario.saldo = usuario.saldo + num;
  return usuario.saldo; 
}

function retirar(num) {
  if (usuario.saldo < num) {
    console.log("El saldo que desea retirar no es posible con sus fondos");
  } else {
    usuario.saldo = usuario.saldo - num;
    return usuario.saldo;
  }
}

//Esta bien asi pero podriamos hacerlo asi :
let usuario = {
  nombre: "Miguel",
  saldo: 2200,
  depositar: function(num) { this.saldo += num; return this.saldo; },
  retirar: function(num) { 
    if(num > this.saldo){ console.log("Fondos insuficientes"); } 
    else { this.saldo -= num; return this.saldo; } 
  }
};
//Para que dentro de todo el objeto este las funciones
console.log("Saldo inicial:", usuario.saldo); // 2200
console.log("Se depositan 500:", depositar(500)); // 2700
console.log("Saldo actual:", usuario.saldo); // 2700

console.log("Se retiran 300:", retirar(300)); // 2400
console.log("Saldo actual:", usuario.saldo); // 2400

console.log("Se intenta retirar 5000:");
retirar(5000); // Muestra el mensaje de error
console.log("Saldo final:", usuario.saldo); // 2400 (el saldo no cambia)


//EJERCICIO 8
// 📚 Ejercicio 8: Array de objetos con búsqueda

// Creamos el array de objetos "biblioteca"
let biblioteca = [
  { nombre: "Mejores Recetas", epoca: 2005, stock: 10 },
  { nombre: "Peores Recetas", epoca: 2000, stock: 5 },
  { nombre: "Media Recetas", epoca: 2002, stock: 0 },
];

// Función para buscar un libro por nombre
function buscar_libro(libro_deseado) {
  // bandera para saber si encontramos el libro
  let encontrado = false;

  // recorremos cada objeto del array
  for (let libro of biblioteca) {
    // comparamos la propiedad 'nombre' del objeto con el libro deseado
    if (libro.nombre === libro_deseado) {
      console.log(` El libro "${libro_deseado}" está disponible`);
      encontrado = true; // cambiamos la bandera
      break; // ya lo encontramos, no hace falta seguir recorriendo
    }
  }

  // si al final no se encontró el libro
  if (!encontrado) {
    console.log(` El libro "${libro_deseado}" no está en la biblioteca`);
  }
}

// ✅ Probamos la función
buscar_libro("Media Recetas"); // libro que sí existe
buscar_libro("Recetas Malas"); // libro que no existe


//EJERCICIO 9
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


//EJERCICIO 10
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

// for (let key ) {
//   console.log(`${estudiante.nombre} tiene una nota de ${estudiante.nota}`);
// } //no pude seguir porque no se como hacer el for