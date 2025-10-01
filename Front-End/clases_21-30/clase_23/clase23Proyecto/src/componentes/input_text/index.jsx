import { useState } from "react";

const TextH2 = () => {
  const [text, setText] = useState("");

  const changeText = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={changeText} />
      <h2>Hola bienvenido {text}</h2>
    </div>
  );
};

export default TextH2;
