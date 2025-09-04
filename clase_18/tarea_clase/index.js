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
// objeto_tarea
function nueva_tarea() {
  const tarea = {
    nombre: " ",
    estado: " ",
  };
}

// ARRAY TAREAS
const tareas = [];
// SUMAR TAREA

// CAMBIAR ESTADO TAREA

// BORRAR TAREA
