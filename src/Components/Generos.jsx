import { useContext, useState } from "react";
import { useEffect } from "react";
import Loader from "./Loader";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";

export default function Generos() {
  const { dataOption,updateGenero,setUpdateGenero,setPageGen,setMenuMobile } = useContext(AppContext);

  const [isLoadingGen, setIsLoadingGen] = useState(true);
  const [generos, setGeneros] = useState([]);

  const generosBtnFetch = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjNjODI1YmMxNTNlZjRjNTQ0YTQyMWM4OTI4OWVkZSIsInN1YiI6IjY1YjdlZWZkMTA4OWJhMDE2NGY5MTUxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H8d3JNhSWROU7gobtmTpbCKRjEFj6kHw0b5vDaX_xFw",
      },
    };
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/${dataOption}/list?language=es-MX`,
        options
      );
      if (!res.ok) return;
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const cargarGeneros = async () => {
    setIsLoadingGen(true);
    const data = await generosBtnFetch();
    setGeneros(data.genres);
    setIsLoadingGen(false);
  };
  useEffect(() => {
    cargarGeneros();
  }, [dataOption]);

  return (
    <>
      {isLoadingGen ? (
        <Loader />
      ) : (
        <div className="font-bold flex flex-col gap-2">
          {generos.map((genero) => (
            <Link onClick={()=>{
              setUpdateGenero(!updateGenero)
              setPageGen(1)
              setMenuMobile(false)
            }} key={genero.id} className="hover:text-black hover:bg-white transition-all p-2  md:text-sm text-lg  rounded-sm " to={`/${dataOption}/${genero.name}/${genero.id}`}>
            {genero.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
