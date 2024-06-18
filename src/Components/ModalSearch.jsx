import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import PeliForm from "./PeliForm";

export default function ModalSearch() {
  const { modalSearch, dataOption, setModalSearch } = useContext(AppContext);
  return (
    <div
      className={`${
        modalSearch ? "opacity-100" : "opacity-0 pointer-events-none"
      } bg-black fixed top-0 z-50 w-full h-[100vh] grid place-content-center transition-all gap-5`}
    >
      <h1 className="text-2xl text-center">Buscar {dataOption === "movie" ? "Pelicula" : "Serie Tv"}</h1>
      <PeliForm />
      <button
        onClick={() => setModalSearch(false)}
        className="absolute top-10 right-10 text-3xl"
      >
        <i className="bi bi-x-lg"></i>
      </button>
    </div>
  );
}
