import logo from '../logo.svg';
import axios from 'axios';
import { useState, useEffect } from 'react';

const App = () => {
  const [favoritos, setFavoritos] = useState(JSON.parse(localStorage.getItem('favoritos')))
  const myObj = {
    "id": 0,
    "nombre": "Pedro"
  }
  const manejarClick = () => {
    const localInfo = JSON.parse(localStorage.getItem('miValor'));
    console.log(localInfo.nombre)
  }
  const guardarObjeto = () => {
    let toStore = JSON.stringify(myObj);
    localStorage.setItem('miValor', toStore);
  }

  return (
    <div>
      <button onClick={manejarClick}>Presioname para leer objeto</button>
      <button onClick={guardarObjeto}>Guardar</button>
    </div>
  );
}

export default App;
