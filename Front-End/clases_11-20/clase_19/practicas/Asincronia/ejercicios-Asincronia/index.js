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
//
let numeros = [5, 6, 100, 0.2];

const CargarDatos = new Promise((resolve, reject) => {
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

CargarDatos.then((msj) => {
  console.log("Funciono bien");
}).catch((msj) => {
  console.log("funciono mal");
});
