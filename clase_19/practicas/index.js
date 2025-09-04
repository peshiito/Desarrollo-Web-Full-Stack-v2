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
estudiantes = [
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
