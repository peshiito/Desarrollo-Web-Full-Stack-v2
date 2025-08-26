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

//  función para sumar arrays
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
