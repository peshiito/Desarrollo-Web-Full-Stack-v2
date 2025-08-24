
document.querySelectorAll("#registro_multiplicacion").addEventListener('submit', function (e) {
    e.preventDefault();

    const numero = document.querySelector('#numero1').value;

    for (let i = 0; i < 11; i++){
        document.querySelector(
            '#tabla_multiplicacion'
          ).textContent = `¡Hola, ${nombre}! Tienes ${edad} años.`;
    }

});