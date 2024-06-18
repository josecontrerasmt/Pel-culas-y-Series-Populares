import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProvedorCard from "../Components/ProvedorCard";
import NavBar from "../Components/Navegacion/NavBar";
import Loader from "../Components/Loader";
import AppContext from "../context/AppContext";

export default function Info() {
  const {
    dataOption,
    setLoadingWatch,
    listWatch,
    setAgregarElemento,
    setMenuMobile,
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState({});
  const id = useParams().id;
  let navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    buscarId(id);
  }, [id]);
  const buscarId = async (datoId) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjNjODI1YmMxNTNlZjRjNTQ0YTQyMWM4OTI4OWVkZSIsInN1YiI6IjY1YjdlZWZkMTA4OWJhMDE2NGY5MTUxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H8d3JNhSWROU7gobtmTpbCKRjEFj6kHw0b5vDaX_xFw",
      },
    };
    try {
      const res1 = fetch(
        `https://api.themoviedb.org/3/${dataOption}/${datoId}?language=es-MX`,
        options
      );
      const res2 = fetch(
        `https://api.themoviedb.org/3/${dataOption}/${datoId}/watch/providers`,
        options
      );
      const res3 = fetch(
        `https://api.themoviedb.org/3/${dataOption}/${datoId}/videos`,
        options
      );

      const responses = await Promise.all([res1, res2, res3]);
      if (responses.some((response) => !response.ok)) {
        throw new Error("Una o más peticiones fallaron");
      }
      const data = await responses[0].json();
      const data2 = await responses[1].json();
      const data3 = await responses[2].json();

      const dataProve = data2.results.MX ? data2.results.MX : "Sin datos";
      data.buy = [];
      data.online = [];
      data.videosColl = [];

      dataProve.buy
        ? dataProve.buy.forEach((compra) => {
            data.buy = [...data.buy, compra];
          })
        : (data.buy = []);

      dataProve.flatrate
        ? dataProve.flatrate.forEach((online) => {
            data.online = [...data.online, online];
          })
        : (data.flatrate = []);

      data3.results.length > 0
        ? data3.results.forEach((item) => {
            data.videosColl = [...data.videosColl, item];
          })
        : (data.videosColl = []);

      data.online = data.online.slice(0, 4);
      data.buy = data.buy.slice(0, 4);
      setInfo(data);
      setIsLoading(false);
    } catch (error) {}
  };

  const agregarElemento = (id) => {
    setLoadingWatch(true);
    listWatch(id, true);
    setAgregarElemento(true);
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen grid items-center ">
          <Loader />
        </div>
      ) : (
        <div className="w-full">
          <div className="relative">
            {/* Fondo  */}
            {/* <div className="absolute inset-0">
              <img
                className="w-full h-full object-cover "
                src={
                  info.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${info.backdrop_path}`
                    : ""
                }
                alt="info.title"
              />
              <div className="absolute inset-0 bg-[#000000f1] flex flex-col gap-2"></div>
            </div> */}

            <div className=" md:px-24 px-5 pt-10 pb-20">
              <div className="flex justify-end items-center">
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="md:hidden text-3xl lg:text-3xl md:text-2xl hover:text-red-600 transition absolute top-10 left-5 z-40"
                >
                  <i className="bi bi-caret-left-fill"></i>
                </button>
                <button
                  onClick={() => {
                    setMenuMobile(true);
                  }}
                  className="text-3xl cursor-pointer md:hidden"
                >
                  <i className="bi bi-list"></i>
                </button>
                <NavBar />
              </div>
              <div className="mt-10">
                <div className="flex flex-col gap-8">
                  <div className="relative md:h-[30vh] lg:h-[50vh]">
                    <div className="md:h-full">
                      <img
                        className="rounded-md md:hidden w-full object-cover"
                        src={`https://image.tmdb.org/t/p/w300/${info.poster_path}`}
                        alt="info.title"
                      />
                      <img
                        className="rounded-md hidden md:block md:h-full w-full object-cover"
                        src={`https://image.tmdb.org/t/p/original/${info.backdrop_path}`}
                        alt="info.title"
                      />
                      <div className="absolute rounded-md inset-0 bg-black opacity-80"></div>
                      <div className="absolute inset-0 z-20 text-center flex flex-col gap-8 lg:gap-4 justify-center px-2 md:py-1 overflow-hidden lg:px-10">
                        <div>
                          <h1 className="font-bold text-3xl ">
                            {info.title || info.name}
                          </h1>
                          {info.tagline ? (
                            <h2 className="text-base italic font-semibold mt-3">
                              {info.tagline}
                            </h2>
                          ) : null}
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex justify-center gap-2 items-center text-2xl md:text-xl">
                            <i className="bi bi-star-fill text-[#ffd700]"></i>
                            <span className="font-bold">
                              {Math.round(info.vote_average * 10) / 10}
                            </span>
                          </div>
                          <div className="flex items-center justify-center gap-5 lg:gap-4 text-3xl md:text-xl">
                            {info.homepage ? (
                              <a
                                className="text-white bg-black w-12 h-12 lg:w-10 lg:h-10 flex items-center justify-center rounded-md"
                                href={info.homepage}
                                target="_blank"
                              >
                                <i className="bi bi-info-circle-fill"></i>
                              </a>
                            ) : null}
                            <button
                              className="text-white bg-red-600 w-12 h-12 lg:w-10 lg:h-10 flex items-center justify-center rounded-md pr-0.5 pb-0.5"
                              onClick={() => agregarElemento(info.id)}
                            >
                              <i className="bi bi-plus-circle-fill"></i>
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col text-sm text-gray-300 font-semibold  items-center ">
                          {dataOption === "tv" ? (
                            <>
                              <h2>Temporadas: {info.number_of_seasons}</h2>
                              <h2>Episodios: {info.number_of_episodes}</h2>
                              {info.episode_run_time.length > 0 ? (
                                <h2>Duración: {info.episode_run_time}min</h2>
                              ) : null}
                            </>
                          ) : (
                            <h2>Duración: {info.runtime}min</h2>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full relative">
                    <div className="text-base w-full">
                      <h2 className="font-bold text-base text-red-600 uppercase">
                        Sinopsis
                      </h2>
                      {info.overview ? (
                        <p className="font-semibold">{info.overview}</p>
                      ) : (
                        <p className="font-semibold italic text-gray-500">
                          Sin Sinopsis
                        </p>
                      )}
                    </div>
                    {info.videosColl.length > 0 ? (
                      <div className=" w-full lg:w-[550px] mt-8 lg:my-9 lg:m-auto">
                        <iframe
                          className="rounded-md w-full h-[350px]"
                          // width=""
                          // height="315"
                          src={`https://www.youtube.com/embed/${info.videosColl[0].key}`}
                          title={info.videosColl[0].name}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : null}

                    <div className="text-xs mt-5">
                      <h2 className="font-bold text-base text-red-600 uppercase">
                        Donde Ver
                      </h2>
                      {info.buy.length <= 0 && info.online.length <= 0 ? (
                        <h1 className="text-gray-500 italic text-base font-bold lg:text-sm">
                          Sin Plataformas
                        </h1>
                      ) : (
                        <div className="lg:flex lg:flex-wrap lg:gap-28">
                          <ProvedorCard
                            title={"Stream"}
                            isLoading={isLoading}
                            info={info.online}
                          />
                          <ProvedorCard
                            title={"Compra"}
                            isLoading={isLoading}
                            info={info.buy}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
