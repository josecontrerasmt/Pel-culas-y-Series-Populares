import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import dataGeneros from "../dataGeneros";
import Loader from "../Components/Loader";
import NavBar from "../Components/Navegacion/NavBar";
import PeliculaCard from "../Components/PeliculaCard";
import imgUrl from "/fondoGeneros.jpg";
import { data } from "autoprefixer";

export default function SearchPage() {
  const { dataOption, updateSearch, pageSearch, setPageSearch, setMenuMobile } =
    useContext(AppContext);
  const [dataContainer, setDataContainer] = useState([]);
  const query = useParams().query;
  const title = useParams().query;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    cargarDatos();
  }, [updateSearch, query, pageSearch]);

  const cargarDatos = async () => {
    const datos = await fetchBusqueda(query);
    setDataContainer(datos);
    setIsLoading(false);
  };
  const fetchBusqueda = async (search) => {
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
        `https://api.themoviedb.org/3/search/${dataOption}?query=${search}&include_adult=false&language=es-MX&page=${pageSearch}`,
        options
      );
      if (!res.ok) return;
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSiguiente = () => {
    if (pageSearch + 1 <= dataContainer.total_pages) {
      setPageSearch(pageSearch + 1);
      setDataContainer([]);
    }
  };
  const handleAnterior = () => {
    if (pageSearch - 1 > 0) {
      setPageSearch(pageSearch - 1);
      setDataContainer([]);
    }
  };
  return (
    <div>
      {isLoading ? (
        <div className="pt-40">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="relative py-10 lg:h-[50vh] md:h-[25vh] h-[50vh] px-5 md:px-20 w-full">
            <div className="relative z-30 w-full flex justify-end items-center">
              <button
                onClick={() => {
                  setMenuMobile(true);
                }}
                className="md:hidden text-3xl cursor-pointer"
              >
                <i className="bi bi-list"></i>
              </button>
              <NavBar />
            </div>
            <div className="absolute inset-0">
              <img
                className="w-full h-full object-cover object-center "
                src={imgUrl}
                alt="FondoGeneros"
              />
              <div className="absolute inset-0 bg-[black] opacity-80"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a090c] via-transparent to-transparent grid place-content-center">
                <h1 className="font-bold text-4xl text-red-600">{title}</h1>
                <h3 className="font-semibold italic text-center text-gray-500">
                  {dataOption === "movie" ? "Película" : "Serie Tv"}
                </h3>
                <div className="mt-10 flex flex-col gap-2 absolute bottom-5 md:right-20 right-5">
                  <h2 className="text-gray-500 italic text-center font-semibold text-sm">
                    Pagina: {pageSearch}
                  </h2>
                  <div className="flex items-center gap-3 text-lg">
                    <button onClick={handleAnterior}>
                      <i className="hover:text-red-600 transition-colors p-2 bi bi-caret-left-fill"></i>
                    </button>
                    <button onClick={handleSiguiente}>
                      <i className="hover:text-red-600 transition-colors p-2 bi bi-caret-right-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:px-20 px-5 mb-10">
            <div className="w-full grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-5">
              {dataContainer.results && dataContainer.results.length > 0 ? (
                dataContainer.results.map((item) => {
                  return <PeliculaCard key={item.id} item={item} />;
                })
              ) : (
                <h1 className="font-bold text-2xl col-span-full text-center">No se Encontraron resultados</h1>
              )}
            </div>
            <div className="mt-10 w-full flex justify-center items-center gap-5 text-2xl">
              <button onClick={handleAnterior}>
                <i className="hover:text-red-600 transition-colors p-2 bi bi-caret-left-fill"></i>
              </button>
              <button onClick={handleSiguiente}>
                <i className="hover:text-red-600 transition-colors p-2 bi bi-caret-right-fill"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
