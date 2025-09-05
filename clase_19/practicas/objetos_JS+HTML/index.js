// EJERCICIO 1
const persona1 = {
    nombre: "Pedro",
    edad: 20,
};

let resul1 = document.querySelector("#resultado1");

const boton1 = document.querySelector("#boton_datos1");

boton1.addEventListener("click", function (){
    resul1.innerHTML = `
    <h3>Información del objeto</h3>
    <p><strong>Nombre:</strong> ${persona1.nombre}</p>
    <p><strong>Edad:</strong> ${persona1.edad}</p>
`;
})