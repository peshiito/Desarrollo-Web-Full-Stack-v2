import { useState } from "react";

function ShowHidden() {
  const [show, setShow] = useState(true);

  function mostrarOcultar() {
    setShow(!show);
  }

  return (
    <div>
      <h2>
        Bueno en esta parte vamos a utilizar useState para ocultar este texto
      </h2>
      <button onClick={mostrarOcultar}>{show ? "Ocultar" : "Mostrar"}</button>
      {show && <p>Aparece y desaparece que les parece ajajajajja</p>}
    </div>
  );
}

export default ShowHidden;
