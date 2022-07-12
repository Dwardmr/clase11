import React from 'react';
import Titulo from '../Components/Titulo';
import axios from 'axios';
import {
  Outlet
} from 'react-router-dom'

const Equipos = () => {
  const [equipos, setEquipos] = React.useState(null);
  const [equipoActivo, setEquipoActivo] = React.useState(null);
  const [favoritos, setFavoritos] = React.useState(JSON.parse(localStorage.getItem('favoritos')));

  React.useEffect(() => {
    if(!equipos){
      axios.get(`http://localhost:3000/equipos`)
        .then((res) => {
          setEquipos(res.data)
        })
    }
  }, [])

  const manejarClickLista = (id) => {
    setEquipoActivo(equipos.find((el) => el.id === id));
  }

  const agregarFavorito = () => {
    // console.log(localStorage.getItem('favoritos'))
    if(!localStorage.getItem('favoritos')){
      // case, no existe aun
      let data = JSON.stringify([equipoActivo])
      localStorage.setItem('favoritos', data)
      setFavoritos([equipoActivo]);
    } else{
      // patron inmutable de actualizar un array
      let data = JSON.parse(localStorage.getItem('favoritos'))
      let newData = JSON.stringify([...data, equipoActivo]);
      localStorage.setItem('favoritos', newData)
      let tempFavoritos = [...favoritos, equipoActivo];
      setFavoritos(tempFavoritos);
    }
  }

  const eliminarFavorito = (id) => {
    console.log({id})
    let temp_favoritos = [...favoritos]
    let nuevos_favoritos = temp_favoritos.filter((el) => el.id !== id);
    console.log(nuevos_favoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevos_favoritos))
    setFavoritos(nuevos_favoritos)
  }


  // actualizaciones sincronas
  const esFav = (id) => {
    let exists = favoritos.filter((el) => el.id === id);
    if(exists.length > 0){
      return true
    } else{
      return false
    }
  }
  console.log({favoritos})
  return(
    <div>
      <Titulo>Lista de equipo!</Titulo>
      <ul>
        {
          equipos ? 
            equipos.map((el, i) => <div>
              <li key={i} onClick={() => manejarClickLista(el.id)} style={{
              cursor: 'pointer'
            }}>{el.nombre}</li>
              {esFav(el.id) ? 'Es fav' : 'No es fav'}
              </div>) : 
          'Loading...'
        }
      </ul>

      {
        equipoActivo &&
        <div>
        <p>Nombre: {equipoActivo.nombre}</p>
        <p>Colores: {equipoActivo.colores.map((el) => `${el}, `)}</p>
        <p>Presidente: {equipoActivo.presidente}</p>
        {
          esFav(equipoActivo.id) ? <button onClick={() => eliminarFavorito(equipoActivo.id)}>Eliminar de favoritos</button> : <button onClick={agregarFavorito}>Agregar a Favoritos</button>
        }
       
      </div>
      }
      <hr />
      <h2>Mis favoritos</h2>
      <ul>
        {
          favoritos ? 
            favoritos.map((el, i) => <div key={i}>
            <li 
              style={{
                cursor: 'pointer'
              }}
              onClick={() => eliminarFavorito(el.id)}
            >{el.nombre}</li>
            <button onClick={() => eliminarFavorito(el.id)}>🗑</button>
            </div>) : 
          'Loading...'
        }
      </ul>
      <Outlet />
    </div>
  );
}
export default Equipos;