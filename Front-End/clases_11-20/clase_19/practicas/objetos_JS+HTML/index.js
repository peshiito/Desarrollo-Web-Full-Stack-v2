// EJERCICIO 1
const persona1 = {
  nombre: "Pedro",
  edad: 20,
};

let resul1 = document.querySelector("#resultado1");

const boton1 = document.querySelector("#boton_datos1");

boton1.addEventListener("click", function () {
  resul1.innerHTML = `
    <h3>Información del objeto</h3>
    <p><strong>Nombre:</strong> ${persona1.nombre}</p>
    <p><strong>Edad:</strong> ${persona1.edad}</p>
`;
});

//EJERCICIO 2

let objeto2 = {
  nombre: "bolsa",
};

let resul2 = document.querySelector("#resultado2");

document
  .querySelector("#formulario_ejer2")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // evita que se recargue la página

    let nuevo_dato = document.querySelector("#input_ejer2").value;

    objeto2.nombre = nuevo_dato;

    resul2.innerHTML = `
      <h3>Información del objeto</h3>
      <p><strong>Nombre:</strong> ${objeto2.nombre}</p>
    `;
  });

//EJERCICIO 3
let cuenta = {
  saldo: 100,
  depositar: function (dato_entrante) {
    this.saldo += dato_entrante;
    return this.saldo;
  },
  retirar: function (dato_entrante) {
    if (dato_entrante > this.saldo) {
      return "Fondos insuficientes";
    }
    this.saldo -= dato_entrante;
    return this.saldo;
  },
};

// capturamos el div donde mostramos los resultados
let resul3 = document.querySelector("#resultado3");

// capturamos botones
let botonDepositar = document.querySelector("#depositar");
let botonRetirar = document.querySelector("#retirar");

// evento para depositar
botonDepositar.addEventListener("click", function (e) {
  e.preventDefault();
  let dato_entrante = Number(document.querySelector("#input_ejer3").value);
  let nuevoSaldo = cuenta.depositar(dato_entrante);
  resul3.innerHTML = `<p>Nuevo saldo: ${nuevoSaldo}</p>`;
});

// evento para retirar
botonRetirar.addEventListener("click", function (e) {
  e.preventDefault();
  let dato_entrante = Number(document.querySelector("#input_ejer3").value);
  let nuevoSaldo = cuenta.retirar(dato_entrante);
  resul3.innerHTML = `<p>Nuevo saldo: ${nuevoSaldo}</p>`;
});
