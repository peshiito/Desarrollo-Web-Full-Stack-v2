num1 = prompt ("Introdusca un numero: ")

// USUARIOS

usuario = ("Peshiito")
contra= ("1234")
if (usuario == "Peshiito" && contra == "1234") {
    console.log ("Llego el admin");
} else {
    console.log ("QUIEN SOOOOO")
}

// ARRAY Y COLECCIONES

juegos = ["COD", "FORNITE", "BATTLEFIELD", "FREE FIRE"];
console.log(juegos[0]);
console.log(juegos[1]);
console.log(juegos[2]);
console.log(juegos[3]);

// push(): agrega al final
// pop(): quita el último
// shift(): quita el primero
// unshift(): agrega al inicio
// length: cantidad de elementos

juegos.push("MINECRAFT");
console.log(juegos);

// enunmera la cantidad de elementos en un ARRAY
console.log(juegos.length);

// ARRAY de notas de materias
let mate= 7;
let lengua= 9;
let ingles = 3;
let geo= 6;

let prom = (mate + lengua + ingles + geo) / 4;

console.log(mate);
console.log(lengua);
console.log(ingles);
console.log(geo);

if (prom > 6) {
    console.log("APROBASTE");
    console.log(prom);

} else if (prom == 6) {
    console.log("Uyyyy hay que mejorar");
    console.log(prom);
    
} else if (prom < 6) {
    console.log("Perdiste pa")
    console.log(prom);

}

// PRUEBA DE FORMULARIO

document.querySelector("#formulario_inform")