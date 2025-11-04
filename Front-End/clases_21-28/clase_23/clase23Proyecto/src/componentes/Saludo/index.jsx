const Saludo = ({ nombre, edad, profesion }) => {
  return (
    <div>
      <h2>Bienvenido {nombre}</h2>
      <p>
        Me entere que eres un {profesion} de {edad}
      </p>
      <h3>Felicidades</h3>
    </div>
  );
};

export default Saludo;
