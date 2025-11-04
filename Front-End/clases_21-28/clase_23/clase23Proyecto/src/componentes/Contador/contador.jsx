import { useState } from "react";
import "./cont.css";
function Contador() {
  const [numero, setNumero] = useState(0);
  return (
    <div className="divContador">
      <h2>Este va a ser nuestro contador</h2>
      <h3>{numero}</h3>
      <p>Con los botones Sumar y Restar vamos a modificar nuestro contador</p>

      <button onClick={() => setNumero(numero + 1)}>Sumar</button>

      <button onClick={() => setNumero(numero - 1)}>Restar</button>
    </div>
  );
}

export default Contador;
