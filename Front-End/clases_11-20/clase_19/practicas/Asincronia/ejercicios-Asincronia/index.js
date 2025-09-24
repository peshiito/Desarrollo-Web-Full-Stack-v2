//Ejercicio 1
function esperar(ms, callback) {
  setTimeout(callback, ms);
}
esperar(2000, () => {
  console.log("Pasaron 2 segundos");
});
//Ejercicio 1.5 (prueba de concepto)

function esperar_resultado(ms, callback) {
  setTimeout(callback, ms);
}

let num1 = 10;
let num2 = 20;

let res = 10 * 20;

esperar_resultado(10000, () => {
  console.log(
    "El resultado de la suma de " + num1 + " X " + num2 + " = " + res
  );
});

//Ejercicio 2
//Entendimiento de promesas
const PruebaPromesa = new Promise((resolve, reject) => {
  setTimeout(function () {
    console.log("Soy una promesa que no entiendo (todabia)");
    //Resolve envia informacion al .then ya que dice que esta resuelto y reject envia informacion al .catch para informar un problema
    resolve("Soy la Promesa Holaaaa :)");
  }, 5000);
});
//En el caso de que la promesa se resulva de manera exitosa .then me va a mostrar un mensaje de exito
PruebaPromesa.then((msj) => {
  console.log("La promesa si anda" + msj);
  //En el caso de que la promesa no se resuelva de manera exitosa .catch me va a mostrar un mensaje de fallo
}).catch(() => {
  console.log("La promesa me parece que no funciona");
});
//Otra prueba de concepto
let numeros = [5, 6, 100, 0.2];

const LecturaNumeros = new Promise((resolve, reject) => {
  setTimeout(function () {
    for (let i = 0; i < numeros.length; i++) {
      if (numeros[i] < 0.5) {
        console.log("Ningun numero del array es menor a 0.5");
        console.log(numeros);
        resolve("La promesa funciono");
      } else {
        console.log("Ocurrio un error ya que un numero es menor 0.5");
        console.log(numeros);
        reject("La promesa no funciono");
        break;
      }
    }
  }, 5000);
});

LecturaNumeros.then((msj) => {
  console.log("Funciono bien");
}).catch((msj) => {
  console.log("funciono mal");
});

//Ahora si Ejercicio 2

let numerosEjer2 = [];

document.querySelector("#fomulario2").addEventListener("submit", function (e) {
  e.preventDefault();

  const resul2 = document.querySelector("#resultado2");

  //Limpia la pantalla
  resul2.innerHTML = ``;

  const CargarDatos = new Promise((resolve, reject) => {
    setTimeout(function () {
      let numero_ingresado = parseFloat(
        document.querySelector("#numero2").value
      );

      if (numero_ingresado > 0.5) {
        numerosEjer2.push(numero_ingresado);
        resul2.innerHTML += `<p>${numerosEjer2}</p>`;
        // console.log(numerosEjer2);
        resolve("Funciono bien el numero");
      } else if (numero_ingresado < 0.5) {
        resul2.innerHTML += `<p>El numero ${numerosEjer2} no es mayor a 0.5</p>`;
        // console.log("El numero " + numero_ingresado + " no es mayor a 0.5");
        reject("Ingresaste mal el numero");
      } else {
        resul2.innerHTML += `<p>Una de dos o fue mal el numero o la promesa no funciona</p>`;
        // console.log("una de dos o fue mal el numero o la promesa no funciona");
        reject("XD");
      }
    }, 1000);
  });

  CargarDatos.then((msj) => {
    resul2.innerHTML += `<p>La Carga fue Exitosa</p>`;
    // console.log("La carga fue exitosa");
  }).catch((msj) => {
    resul2.innerHTML += `<p>Hubo un error </p>`;
    // console.log("No se cargo el dato");
  });
});

//Ejercicio 3
const persona = {
  nombre: "Matias",
  edad: 20,
  frase: "Yo soy gay",
};

const boton_ejercico3 = document.querySelector("#descargar");
const resul3 = document.querySelector("#resultado3");

boton_ejercico3.addEventListener("click", function () {
  resul3.innerHTML = `<p class="mensaje-info">Se está conectando...</p>`;

  const DescargarDatos = new Promise((resolve, reject) => {
    setTimeout(function () {
      if (2 > 1) {
        resolve();
      } else {
        reject();
      }
    }, 4000);
  });

  DescargarDatos.then(() => {
    resul3.innerHTML = `<p class="mensaje-exito">Conectado</p>`;

    const DatosDescargados = new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve();
      }, 10000);
    });

    DatosDescargados.then(() => {
      resul3.innerHTML = "";
      resul3.innerHTML += `<p class="mensaje-exito">Datos descargados</p>`;
      resul3.innerHTML += `<p class="mensaje-exito">Datos procesados</p>`;
      resul3.innerHTML += `<p class="datos-usuario">Los datos de su usuario son: Nombre: ${persona.nombre}, Edad: ${persona.edad}, Frase: "${persona.frase}"</p>`;
    });
  }).catch(() => {
    resul3.innerHTML = `<p class="mensaje-error">Hubo un error en la conexión</p>`;
  });
});
//TRATANDO DE ENTENDER ASYNC AWAIT
//La funcion Msj2 lo que hace es ponner un intervalo de tiempo y luego imprime "Mensaje 2"
function Msj2() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log("Mensaje 2");
      resolve();
    }, 10000);
  });
}
//El codigo asincrono o async/await sirve para poder hacer que nuestra funcion en este codigo se vuelva asincrono
//este codigo imprime el "Mensaje 1", utilizando await le dice a la funcion que se pare y que espere a que se ejecute esa linea
//Osea que ejecute la funcion Msj2 y luego pase a la siguiente linea
//Quedaria de la siguiente manera
//"Mensaje 1"
//"Mensaje 2" (Msj2 () )
//"Mensaje 3" (Espera a la ejecucion de Msj2 para imprimir este)

async function CodigoAsincrono() {
  console.log("Mensaje 1");
  await Msj2();
  console.log("Mensaje 3");
}

CodigoAsincrono();

//Esta forma de codigo no atrapa errores o cosas parecidas, para eso usamos en try catch

//TRY / CATCH
//Esta funcion imprime un mensaje "Mensaje de espera (Osea estamos dentro del Await)"
function Msj3() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log("Mensaje de espera (Osea estamos dentro del Await)");
      resolve();
    }, 30000);
  });
}
//El try intenta imprimir, esperar el funcionamiento de Msj3 y imprime el siguiente mensaje
//catch imprime el error en caso de haber  y un mensaje de mas
async function CodigoAsincrono2() {
  try {
    console.log("Este es el intento de un Try/Catch");
    await Msj3();
    console.log("Esto es despues del Await");
  } catch (e) {
    console.log(e);
    console.log("Error de codigo");
  }
}

CodigoAsincrono2();
//Ultimo Ejercicio pokedex

// https://pokeapi.co/api/v2/ability/{id o nombre}/const poke_api = "https://pokeapi.co/api/v2/pokemon/";
const poke_api = "https://pokeapi.co/api/v2/pokemon/";

const input_poke_busqueda = document.getElementById("busqueda");
const pokedexContainer = document.getElementById("container_pokedex");

async function buscar_pokemon() {
  const id_pokemon = input_poke_busqueda.value.trim();
  if (!id_pokemon) {
    pokedexContainer.innerHTML = `<p style="color:red;">Escribí un nombre o número</p>`;
    return;
  }

  const pokemonId = parseInt(id_pokemon) || id_pokemon.toLowerCase();

  try {
    const response = await fetch(poke_api + pokemonId);
    if (!response.ok) throw new Error("Pokémon no encontrado");

    const data = await response.json();

    pokedexContainer.innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      <p>ID: ${data.id}</p>
      <p>Altura: ${data.height / 10} m</p>
      <p>Peso: ${data.weight / 10} kg</p>
      <p>Tipo: ${data.types.map((t) => t.type.name).join(", ")}</p>
    `;
  } catch (error) {
    console.error(error);
    pokedexContainer.innerHTML = `<p style="color:red;">Pokémon no encontrado</p>`;
  }
}

document.getElementById("btn-search").addEventListener("click", buscar_pokemon);
