import { useState } from "react";

const initialPelicula = {
  nombre: "",
  id: "",
};
export default function PeliForm({buscarPelicula}) {
  const [pelicula, setPelicula] = useState(initialPelicula);
  const handleChange=(e)=>{
    setPelicula({
        ...pelicula,
        [e.target.name]:e.target.value
    })
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    buscarPelicula(pelicula)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input className="text-black" type="text" name="nombre" onChange={handleChange}/>
      <input type="submit" value={'Buscar'}/>
    </form>
  );
}
