import MiComponente from "./componentes/msj/msj";
import Contador from "./componentes/Contador/contador";
import ShowHidden from "./componentes/Mostrar_Ocultar/index";
import Saludo from "./componentes/Saludo";
import TextH2 from "./componentes/input_text";

function App() {
  return (
    <div>
      <MiComponente />
      <Saludo nombre="Juan" profesion="gordo teton" edad={21} />
      <Contador />
      <ShowHidden />
      <TextH2 />
    </div>
  );
}

export default App;
