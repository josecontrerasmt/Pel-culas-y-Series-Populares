import { useState } from "react";
import { useEffect } from "react";
import Loader from "./Loader";

export default function Generos({
  menuGenero,
  dataOption,
  search,
  elegirGenero,
  btnContainer
}) {
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
        `https://api.themoviedb.org/3/genre/${dataOption}/list?language=es`,
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
  }, [dataOption,search]);

  return (
    <div
      className={`w-full md:w-[40%] lg:w-full bg-[#130F16] fixed lg:static lg:bg-transparent top-0 bottom-0 ${
        menuGenero ? "left-0" : "-left-full"
      } z-40 p-8 flex flex-col gap-8 transition-all`}
    >
      <h1 className="text-center text-3xl font-semibold lg:hidden">Géneros</h1>
      <div
        ref={btnContainer}
        className="grid grid-cols-2 gap-x-5 gap-y-3 lg:flex lg:flex-wrap lg:gap-3 lg:justify-center"
      >
        {isLoadingGen? (
          <Loader />
        ) : (
          generos.map((genero) => (
            <button
              onClick={(e) => elegirGenero(e,genero)}
              className="bg-[#2C2A32] py-2 rounded-lg lg:text-sm font-bold lg:px-3 lg:py-1
              border-2 border-transparent hover:border-red-600 duration-300"
              id={genero.id} 
              key={genero.id}
            >
              {genero.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
