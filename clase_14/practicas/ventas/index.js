// Tasas de cambio
let euro = 1.17;
let peso_argentino = 1335;
let real_brasilero = 5.54;

// Obtener formulario (ojo: corregido el id)
const formulario_dolares_conversion =
  document.getElementById("fomulario_dolar");

formulario_dolares_conversion.addEventListener("submit", function (evento) {
  evento.preventDefault();

  // Obtener el valor ingresado
  const dolar = parseFloat(document.getElementById("dolar").value);

  // Validar número
  if (isNaN(dolar)) {
    alert("Por favor ingresa un número válido en dólares");
    return;
  }

  // Conversiones
  let cambio_peso = dolar * peso_argentino;
  let cambio_real = dolar * real_brasilero;
  let cambio_euro = dolar * euro;

  // Mostrar resultados en cada sección
  document.querySelector(".div_pesos").innerHTML = `
    <h3>Pesos Argentinos:</h3>
    <p>${cambio_peso.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    })}</p>
  `;

  document.querySelector(".div_brasil").innerHTML = `
    <h3>Real brasileño:</h3>
    <p>${cambio_real.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}</p>
  `;

  document.querySelector(".div_euro").innerHTML = `
    <h3>Euro:</h3>
    <p>${cambio_euro.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    })}</p>
  `;
});
