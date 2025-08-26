// PUNTO 1
document
  .querySelector("#registro_multiplicacion")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const numero = parseInt(document.querySelector("#numero1").value);
    const tabla = document.querySelector("#tabla_multiplicacion");

    tabla.innerHTML = "";

    for (let i = 1; i <= 10; i++) {
      let multiplo = numero * i;

      tabla.innerHTML += `<p>${numero} x ${i} = ${multiplo}</p>`;
    }
  });
// PUNTO 2

const array_numeros = [];

//  funcion para sumar arrays
function sumarArray(arr) {
  return arr.reduce((acc, num) => acc + num, 0);
}

document
  .querySelector("#registro_sumador")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const numero2 = parseInt(document.querySelector("#numero2").value);

    if (!isNaN(numero2) && array_numeros.length < 5) {
      array_numeros.push(numero2);
    }

    const tabla_sumadora = document.querySelector("#mensaje_suma");

    if (array_numeros.length === 5) {
      const suma = sumarArray(array_numeros);
      tabla_sumadora.innerHTML = `
          <p>Números ingresados: ${array_numeros.join(", ")}</p>
          <p><strong>Suma total: ${suma}</strong></p>
        `;
    } else {
      tabla_sumadora.innerHTML = `
          <p>Números ingresados: ${array_numeros.join(", ")}</p>
          <p>Faltan ${5 - array_numeros.length} números por ingresar</p>
        `;
    }
  });

// PUNTO 3
let array_aelatorios_par = [];
let array_aelatorios_impar = [];

document
  .querySelector("#formulario_generador")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    array_aelatorios_par = [];
    array_aelatorios_impar = [];

    const mensaje_random = document.querySelector("#mensaje_punto3");

    for (let i = 1; i <= 5; i++) {
      let random = Math.floor(Math.random() * 100);
      // array_numeros_aelatorios.push(random);
      if (random % 2 === 0) {
        array_aelatorios_par.push(random);
      } else if (random % 2 !== 0) {
        array_aelatorios_impar.push(random);
      } else {
        mensaje_random.innerHTML = `
          <p>Numero no valido</p>`;
      }
    }

    mensaje_random.innerHTML = `
          <p>Números ingresados pares: ${array_aelatorios_par}</p>
          <p>Números ingresados impares: ${array_aelatorios_impar}</p> `;
  });

// PUNTO 4
let biblioteca_palabras = [];

document
  .querySelector("#formulario_palabras")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let palabra = document.querySelector("#input_palabras").value;
    let array_palabras = palabra.split(",");

    biblioteca_palabras.push(array_palabras);

    console.log(array_palabras);
  });
