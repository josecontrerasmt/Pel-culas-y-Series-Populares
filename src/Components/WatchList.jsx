import { useEffect, useState } from "react";
import Loader from "./Loader";
import fetchProvedores from "../fetchProvedores";

export default function WatchList({
  menuWatch,
  listPelicula,
  updateWatch,
  dataOption,
  loadingWatch,
  setLoadingWatch,
}) {
  const [peliContainer, setPeliContainer] = useState({});

  useEffect(() => {
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
        dato.buy = dataProve.buy?.map((prove) => prove);
        dato.online = dataProve.flatrate?.map((prove) => prove);
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
      className={`w-full md:w-[50%] bg-[#130F16] fixed top-0 bottom-0 z-40 px-4 overflow-y-auto transition-all ${
        menuWatch ? "right-0" : "-right-full"
      } lg:w-[23%] ${menuWatch ? "lg:right-0" : "lg:-right-96"} `}
    >
      <div className="my-10">
        <h1 className="text-center text-3xl font-semibold lg:text-2xl">Ver mas tarde</h1>
        <h2 className="text-center text-2xl lg:text-xl mt-3 font-semibold text-red-400 italic">
          {dataOption === "movie" ? "Películas" : "Series"}
        </h2>
      </div>
      <div className="grid grid-cols-1 items-start overflow-y-auto pb-10 gap-4">
        {loadingWatch || !peliContainer ? (
          <Loader />
        ) : peliContainer.length === 0 ? (
          <span className="text-center text-gray-500 font-bold italic lg:text-xs">
            No haz agregado nada
          </span>
        ) : (
          peliContainer.map((dato) => {
            return (
              <div className="bg-[#060D17] lg:overflow-x-hidden" key={dato.id}>
                <div className="flex">
                  <img
                    className="rounded-md w-40 h-[250px] object-cover lg:w-24 lg:h-[130px]"
                    src={`https://image.tmdb.org/t/p/w200/${dato.poster_path}`}
                    alt={dato.title || dato.name}
                  />
                  <div className="px-5 w-full text-center">
                    <h3 className="text-xl font-bold mt-4 lg:mt-2 mb-2 lg:text-sm text-center">
                      {dato.title || dato.name}
                    </h3>
                    <button
                      className="bg-red-600 py-2 mt-2 rounded-md text-3xl lg:text-lg lg:py-1 w-full lg:w-14"
                      onClick={() => {
                        setLoadingWatch(true);
                        listPelicula(dato.id, false);
                      }}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
                <div className="px-3 my-5 flex flex-col gap-4">
                  <div>
                    <h1 className="font-bold lg:text-sm">Streaming</h1>
                    <ul className="flex flex-wrap items-center justify-center gap-3 mt-2">
                      {!dato.online ? (
                        <li className="text-gray-400 lg:text-xs italic">
                          Sin Plataforma
                        </li>
                      ) : (
                        dato.online.map((provedor) => {
                          return (
                            <li
                              className="flex flex-col items-center justify-start gap-2 font-bold text-xs text-gray-400"
                              key={provedor.provider_id}
                            >
                              <img
                                className="w-10 rounded-md lg:w-8"
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
                  <div>
                    <h1 className="font-bold lg:text-sm">Comprar</h1>
                    <ul className="flex flex-wrap items-center justify-center gap-3 mt-2">
                      {!dato.buy ? (
                        <li className="text-gray-400 lg:text-xs italic">
                          Sin Plataforma
                        </li>
                      ) : (
                        dato.buy.map((provedor) => {
                          return (
                            <li
                              className="flex flex-col items-center justify-start gap-2 font-bold text-xs text-gray-400"
                              key={provedor.provider_id}
                            >
                              <img
                                className="w-10 rounded-md lg:w-8"
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
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="pb-16 text-center flex flex-col text-xs italic font-bold gap-1 text-gray-500 opacity-40 lg:pb-5 lg:text-[0.7em]">
        <div className="flex gap-2 justify-center items-center">
        <span>Desarrollado por Jose Contreras Martínez</span>
        <a className="text-3xl lg:text-2xl" href="https://github.com/josecontrerasmt" target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i></a>
        </div>
        <span>Datos proporcionados por "The Movie Database" y "JustWatch"</span>
      </div>
    </div>
  );
}
