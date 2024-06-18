import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import dataGeneros from "../dataGeneros";
import Loader from "../Components/Loader";
import NavBar from "../Components/Navegacion/NavBar";
import PeliculaCard from "../Components/PeliculaCard";
import imgUrl from "/fondoGeneros.jpg";

export default function GenerosPage() {
  const { dataOption, updateGenero, pageGen, setPageGen, setMenuMobile } =
    useContext(AppContext);
  const [dataContainer, setDataContainer] = useState([]);
  const idGenero = useParams().id;
  const title = useParams().genero;
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    cargarDatos();
  }, [updateGenero, idGenero, pageGen]);

  const cargarDatos = async () => {
    const datos = await dataGeneros(dataOption, idGenero, pageGen);
    setDataContainer(datos);
    setIsLoading(false);
  };

  const handleSiguiente = () => {
    if (pageGen + 1 <= dataContainer.total_pages) {
      setPageGen(pageGen + 1);
      setDataContainer([]);
    }
  };
  const handleAnterior = () => {
    if (pageGen - 1 > 0) {
      setPageGen(pageGen - 1);
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
          <div className="relative py-10 lg:h-[50vh] md:h-[30vh] h-[40vh] px-5 md:px-20 w-full">
            <div className="relative z-30 w-full flex justify-between items-center">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="md:hidden text-3xl lg:text-3xl md:text-2xl hover:text-red-600 transition left-5 z-40"
              >
                <i className="bi bi-caret-left-fill"></i>
              </button>
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C10] via-transparent to-transparent grid place-content-center px-5 text-center">
                <h1 className="font-bold text-4xl text-red-600">{title}</h1>
                <div className="mt-10 flex flex-col gap-2 absolute bottom-5 md:right-20 right-5">
                  <h2 className="text-gray-500 italic text-center font-semibold text-sm">
                    Pagina: {pageGen}
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
              {dataContainer.results &&
                dataContainer.results.map((item) => {
                  return <PeliculaCard key={item.id} item={item} />;
                })}
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
