import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import axios from 'axios';

const Equipo = () => {
  const [equipoActual, setEquipoActual] = useState(null);
  let { idEquipo } = useParams();
  useEffect(() => {
    if(!equipoActual){
      axios.get(`http://localhost:3000/equipos/${idEquipo}`)
        .then((res) => {
          setEquipoActual(res.data)
        })
    }
  }, [])
  console.log(equipoActual)
  return(
    <div>
      {
        equipoActual ?
        <div>
          <p>Nombre: {equipoActual.nombre}</p>
          <p>Colores: {equipoActual.colores.map((el) => `${el}, `)}</p>
          <p>Presidente: {equipoActual.presidente}</p>
        </div>
        : 'Loading...'
      }
    </div>
  )
}
export default Equipo;