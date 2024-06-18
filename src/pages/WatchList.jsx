import { useContext, useEffect, useState } from "react";
import Loader from "../Components/Loader";
import fetchProvedores from "../fetchProvedores";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";

export default function WatchList() {
  const {
    menuWatch,
    setMenuWatch,
    dataOption,
    listWatch,
    loadingWatch,
    setLoadingWatch,
    updateWatch,
  } = useContext(AppContext);
  const [peliContainer, setPeliContainer] = useState([]);
  useEffect(() => {
    setLoadingWatch(true);
    guardadasFetch();
  }, [updateWatch, dataOption]);

  const guardadasFetch = async () => {
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
        `https://api.themoviedb.org/3/account/20954554/watchlist/${
          dataOption === "movie" ? "movies" : dataOption
        }?language=es-MX&page=1&sort_by=created_at.asc'`,
        options
      );
      if (!res.ok) return;
      const data = await res.json();
      const promises = data.results.map(async (dato) => {
        const dataProve = await fetchProvedores(dataOption, dato.id);
        dato.buy = dataProve.buy?.map((prove) => prove).slice(0, 4);
        dato.online = dataProve.flatrate?.map((prove) => prove).slice(0, 4);
        return dato;
      });
      const newData = await Promise.all(promises);
      setPeliContainer(newData.reverse());
      setLoadingWatch(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`lg:w-[26%] md:w-[45%] w-full bg-[black] fixed top-0 bottom-0  overflow-y-auto transition-all z-50 ${
        menuWatch ? "right-0" : "-right-full"
      }`}
    >
      <div className="my-10 px-10">
        <h1 className="text-center text-3xl font-semibold lg:text-2xl">
          Ver mas tarde
        </h1>
        <h2 className="text-center text-2xl lg:text-lg mt-3 lg:mt-1 font-semibold text-red-400 italic">
          {dataOption === "movie" ? "Películas" : "Series"}
        </h2>
      </div>
      <div className="grid grid-cols-1 items-start overflow-y-auto pb-10 gap-5 px-8 ">
        {loadingWatch ? (
          <div>
            <Loader />
          </div>
        ) : peliContainer.length === 0 ? (
          <span className="text-center text-gray-500 font-bold italic lg:text-xs">
            No haz agregado nada
          </span>
        ) : (
          peliContainer.map((dato) => {
            return (
              <div
                className="lg:overflow-x-hidden rounded-lg relative border-2"
                key={dato.id}
              >
                <div className="md:h-[400px]">
                  <img
                    className="rounded-md h-full w-full object-cover cursor-pointer"
                    src={`https://image.tmdb.org/t/p/w300/${dato.poster_path}`}
                    alt={dato.title || dato.name}
                  />
                  <div className="absolute h-full rounded-md inset-0 bg-black opacity-80"></div>
                  <div className="absolute h-full inset-0 z-20 text-center overflow-x-hidden pt-16 md:pt-10 pb-4  overflow-y-auto px-1">
                    <h3 className="text-3xl md:text-xl font-bold text-center px-6">
                      {dato.title || dato.name}
                    </h3>
                    <button
                      className="bg-red-600 absolute top-0 right-0 p-2 pt-1 pb-1.5 grid items-center rounded-bl-lg rounded-tr-lg text-xl"
                      onClick={() => {
                        setLoadingWatch(true);
                        listWatch(dato.id, false);
                      }}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                    {!dato.buy && !dato.online ? (
                      <h1 className="text-gray-500 my-8 italic text-base font-bold lg:text-sm">
                        Sin Plataformas
                      </h1>
                    ) : (
                      <div className="px-2 flex gap-2 my-8 flex-wrap justify-center">
                          <ul className="flex flex-wrap items-start gap-3 mt-2">
                            {!dato.online ? (null
                            ) : (
                              dato.online.map((provedor) => {
                                return (
                                  <li
                                    className="flex flex-col items-center justify-start gap-2 font-bold text-xs text-gray-400 w-12 text-center"
                                    key={provedor.provider_id}
                                  >
                                    <img
                                      className="w-8 rounded-md"
                                      src={`https://image.tmdb.org/t/p/original/${provedor.logo_path}`}
                                      alt={provedor.provider_name}
                                    />
                                    <span className="text-[10px] font-bold">
                                      {provedor.provider_name}
                                    </span>
                                  </li>
                                );
                              })
                            )}
                          </ul>
                          <ul className="flex flex-wrap items-start  gap-3 mt-2">
                            {!dato.buy ? (null
                            ) : (
                              dato.buy.map((provedor) => {
                                return (
                                  <li
                                    className="flex flex-col items-center justify-start gap-2 font-bold text-xs text-gray-400 w-12 text-center"
                                    key={provedor.provider_id}
                                  >
                                    <img
                                      className="w-8 rounded-md"
                                      src={`https://image.tmdb.org/t/p/original/${provedor.logo_path}`}
                                      alt={provedor.provider_name}
                                    />
                                    <span className="text-[10px] font-bold">
                                      {provedor.provider_name}
                                    </span>
                                  </li>
                                );
                              })
                            )}
                          </ul>
                      </div>
                    )}

                    <Link
                      className="bg-[#ff00002d] py-2 px-5  font-semibold rounded-md"
                      onClick={() => setMenuWatch(false)}
                      to={`/${dataOption}/${dato.id}`}
                    >
                      Mas Informacion
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <button
        className="absolute top-9 left-5 text-4xl"
        onClick={() => setMenuWatch(false)}
      >
        <i className="bi bi-x"></i>
      </button>
      <div className="text-center flex flex-col text-xs italic font-bold gap-1 text-gray-500 opacity-30 pb-5 text-[0.7em] px-10">
        <div className="flex gap-2 justify-center items-center">
          <span>Desarrollado por Jose Contreras Martínez</span>
          <a
            className="text-3xl lg:text-2xl hover:text-white transition-colors"
            href="https://github.com/josecontrerasmt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-github"></i>
          </a>
        </div>
        <span>Datos proporcionados por "The Movie Database" y "JustWatch"</span>
      </div>
    </div>
  );
}
