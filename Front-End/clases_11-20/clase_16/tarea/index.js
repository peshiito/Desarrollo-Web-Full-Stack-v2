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

function busqueda(palabra) {
  return biblioteca_palabras.includes(palabra);
}

document
  .querySelector("#formulario_palabras")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let palabraInput = document.querySelector("#input_palabras").value;
    let array_palabras = palabraInput.split(",").map((p) => p.trim());

    biblioteca_palabras.push(...array_palabras);

    let palabraBuscada = document.querySelector("#input_buscador").value.trim();
    let existe = busqueda(palabraBuscada);

    const mensaje = document.querySelector("#mensaje_punto4");
    mensaje.innerHTML = `
      <p><strong>Palabras ingresadas:</strong> ${biblioteca_palabras.join(
        ", "
      )}</p>
      <p><strong>Palabra buscada:</strong> ${palabraBuscada} ${
      existe ? " está en la lista" : " no está en la lista"
    }</p>
    `;

    document.querySelector("#input_palabras").value = "";
    document.querySelector("#input_buscador").value = "";
  });

// PUNTO 5

function factorialize(num) {
  let resultado = 1;
  let cadena = "";

  for (let i = num; i >= 1; i--) {
    resultado *= i;
    cadena += i;
    if (i > 1) cadena += " x ";
  }

  return cadena + " = " + resultado;
}

document
  .querySelector("#formulario_punto5")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let numero = parseInt(document.querySelector("#input_vectorial").value, 10);
    let resultadoFactorial = factorialize(numero);

    document.querySelector("#mensaje_punto5").innerHTML = resultadoFactorial;
  });
// let numero_factorizado=factorialize(21);
// console.log(numero_factorizado)

// PUNTO 6
