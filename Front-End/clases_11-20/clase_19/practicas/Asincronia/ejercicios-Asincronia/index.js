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
