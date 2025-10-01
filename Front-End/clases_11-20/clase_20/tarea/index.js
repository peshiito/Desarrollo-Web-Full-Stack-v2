const array = [
  { nombre: "Pedro", nota: 10 },
  { nombre: "Juan", nota: 2 },
  { nombre: "Peshiito", nota: 8 },
  { nombre: "Chanchis", nota: 6 },
];

console.log(array);

let arrayJSon = JSON.stringify(array);

for (const i of array) {
  console.log(`Nombre : ${i.nombre} y su nota es: ${i.nota}`);
}

console.log(arrayJSon);

let jsonArray = JSON.parse(arrayJSon);

console.log(jsonArray);

//EJERCICIO 1

const usuario = {
  nombre: "Pedro",
  edad: 25,
  pais: "Argentina",
};

const divEjer1 = document.querySelector("#midEjer1");

const jsonEjer1 = JSON.stringify(usuario);

console.log(jsonEjer1);

divEjer1.innerHTML = `Informacion del usuario en JSON: ${jsonEjer1}`;

//EJERCICIO 2

let xd2 = {
  producto: "Teclado mecánico",
  precio: 120,
  stock: true,
};

const divEjer2 = document.querySelector("#midEjer2");

let jsonEjer2 = JSON.stringify(xd2);

let ObjetoJsonEjer2 = JSON.parse(jsonEjer2);

divEjer2.innerHTML = `Este es el Json que ahora mismo es un objeto: ${ObjetoJsonEjer2.producto}, ${ObjetoJsonEjer2.precio}`;

//EJERCICIO 3

let xd3 = [["🍎 Manzana", "🍌 Banana", "🍊 Naranja"]];

const jsonEjer3 = JSON.stringify(xd3);

const divEjer3 = document.querySelector("#midEjer3");

console.log(jsonEjer3);

let frutasArray = JSON.parse(jsonEjer3);

for (const fruta of frutasArray) {
  divEjer3.innerHTML += `<p>Estos son los elementos que estan dentro del Array que anteriormente fue un JSON: ${fruta}</p>`;
}

//EJERCICIO 4

const divEjer4 = document.querySelector("#midEjer4");

const xd4 = {
  nombre: "María",
  edad: 30,
  direccion: {
    calle: "Av. Siempre Viva",
    numero: 742,
    ciudad: "Springfield",
  },
};

const json4 = JSON.stringify(xd4);

const jsonArray4 = JSON.parse(json4);

divEjer4.innerHTML = `El usuario:  ${jsonArray4.nombre} y su edad es ${jsonArray4.edad}, vive en la calle ${jsonArray4.direccion.calle}, ${jsonArray4.direccion.numero} de la ciudad de ${jsonArray4.direccion.ciudad}`;

//EJERCICIO 5

const xd5 = {
  usuarios: [
    { id: 1, nombre: "Ana" },
    { id: 2, nombre: "Carlos" },
    { id: 3, nombre: "Lucía" },
  ],
};

const jsonObject = JSON.stringify(xd5);
const divEjer5 = document.querySelector("#midEjer5");

const objectJson = JSON.parse(jsonObject);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function apiObject() {
  divEjer5.innerHTML = `Buscando datos del usuario en la base de datos...`;

  try {
    for (let y of objectJson) {
      await delay(1000);

      if (y.id === 2) {
        divEjer5.innerHTML = `Usuario encontrado: ${y.id}, Nombre: ${y.nombre}`;
        break;
      }
    }
  } catch (err) {
    console.log(err);
  }
}
