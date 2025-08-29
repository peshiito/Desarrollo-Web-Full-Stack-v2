// PUNTO 1
let contador = 0;

const mensaje_punto1 = document.querySelector("#p_contador");

function actualizarContador() {
  mensaje_punto1.textContent = contador;

  if (contador > 0) {
    mensaje_punto1.style.color = "green";
  } else if (contador < 0) {
    mensaje_punto1.style.color = "red";
  } else {
    mensaje_punto1.style.color = "black";
  }
}

document.querySelector("#incrementar").addEventListener("click", function (e) {
  e.preventDefault();
  contador++;
  actualizarContador();
});

document.querySelector("#restar").addEventListener("click", function (e) {
  e.preventDefault();
  contador--;
  actualizarContador();
});

document.querySelector("#reiniciar").addEventListener("click", function (e) {
  e.preventDefault();
  contador = 0;
  actualizarContador();
});

actualizarContador();

// PUNTO 2

let tareas = [];
let tareas_pendientes = [];
let tareas_completadas = [];

// SUMAR TAREA
document
  .querySelector("#formulario_tareas_nuevas")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const tarea = document.querySelector("#input_tareas_nuevas").value;
    tareas.push(tarea);

    console.log(tareas);
  });

// BORRAR TAREA
document.querySelectorAll("#");
