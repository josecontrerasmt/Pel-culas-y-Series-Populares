import { useEffect, useState } from "react";
import Loader from "./Loader";
import fetchProvedores from "../fetchProvedores";

export default function Modal({ datoId, dataOption, setDatoId }) {
  const [info, setInfo] = useState({});
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    buscarId();
  }, []);
  const buscarId = async () => {
    setLoader(true);
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
        `https://api.themoviedb.org/3/${dataOption}/${datoId}?language=es-MX`,
        options
      );
      if (!res.ok) throw new Error("Error en la peticion");
      const data = await res.json();

      data.buy = [];
      data.online = [];
      const dataProve = await fetchProvedores(dataOption, datoId);
      dataProve.buy?.forEach((compra) => {
        data.buy = [...data.buy, compra];
      });
      dataProve.flatrate?.forEach((online) => {
        data.online = [...data.online, online];
      });

      setInfo(data);
      setLoader(false);
    } catch (error) {}
  };
  return (
    <div className="fixed bg-[#000c] inset-0 p-8 lg:px-8 lg:py-16 z-50 w-full h-full">
      {loader || !info ? (
        <div className=" h-full grid items-center">
          <Loader />
        </div>
      ) : (
        <div className="h-full rounded-md relative overflow-hidden lg:w-[800px] lg:m-auto">
          <div className="relative h-full">
            <img
              className="h-full w-full object-cover "
              src={
                info.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500/${info.backdrop_path}`
                  : "..."
              }
              alt="info.title"
            />
            <div className="absolute inset-0 bg-[#000000de]"></div>
          </div>
          <div className="w-full absolute top-0 p-4 lg:p-5 flex flex-col items-center">
            <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-5">
              <img
                className="w-28 rounded-md lg:w-40"
                src={`https://image.tmdb.org/t/p/w200/${info.poster_path}`}
                alt="info.title"
              />
              <div className="text-center ">
                <h1 className="mt-2 text-center font-bold text-lg">
                  {info.title || info.name}
                </h1>
                <h2 className="text-sm italic font-bold text-gray-400">
                  {info.tagline}
                </h2>
                {info.number_of_episodes ? (
                  <span className="text-xs font-semibold text-gray-400">
                    {info.number_of_episodes} episodios
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-gray-400">
                    {info.runtime} min
                  </span>
                )}
                <p className="text-sm font-semibold h-48 lg:h-36 overflow-auto mt-3">
                  {info.overview}
                </p>
              </div>
            </div>
            <div className="flex w-full h-52 flex-col gap-3 text-xs mt-5 lg:mt-0 pb-5 overflow-y-scroll lg:overflow-y-auto lg:flex-row lg:justify-center ">
              <div className="lg:w-[50%]">
                <h1 className="font-semibold text-sm text-center border-y lg:border-t-0 py-2">
                  Streaming
                </h1>
                <ul className="flex flex-wrap gap-5 mt-5 justify-center">
                  {info.online.length > 0 ? (
                    info.online.map((provedor) => {
                      return (
                        <li
                          className="flex flex-col justify-center items-center gap-2 font-bold text-2xs"
                          key={provedor.provider_id}
                        >
                          <img
                            className="w-10 rounded-md"
                            src={`https://image.tmdb.org/t/p/original/${provedor.logo_path}`}
                            alt={provedor.provider_name}
                          />
                          {provedor.provider_name}
                        </li>
                      );
                    })
                  ) : (
                    <span className="italic text-center">Sin Plataforma</span>
                  )}
                </ul>
              </div>
              <div className="lg:w-[50%]">
                <h1 className="font-semibold text-sm text-center border-y lg:border-t-0 py-2">
                  Compra
                </h1>
                <ul className="flex flex-wrap gap-5 mt-5 justify-center">
                  {info.buy.length > 0 ? (
                    info.buy.map((provedor) => {
                      return (
                        <li
                          className="flex flex-col justify-center items-center gap-2 font-bold"
                          key={provedor.provider_id}
                        >
                          <img
                            className="w-10 rounded-md"
                            src={`https://image.tmdb.org/t/p/original/${provedor.logo_path}`}
                            alt={provedor.provider_name}
                          />
                          {provedor.provider_name}
                        </li>
                      );
                    })
                  ) : (
                    <span className="italic text-center">Sin Plataforma</span>
                  )}
                </ul>
              </div>
            </div>
            <button
              onClick={() => {
                setDatoId(null);
                setInfo({});
              }}
              className="absolute top-1 right-2 text-2xl"
            >
              <i className="bi bi-x-circle"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
