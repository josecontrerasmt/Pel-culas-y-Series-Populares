import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";

export default function AddList() {
  const { agregarElemento, setAgregarElemento, ocultarWatch } =
    useContext(AppContext);
  useEffect(() => {
    if (agregarElemento) {
      const timer = setTimeout(() => {
        setAgregarElemento(false);
      }, 2000);
      // Limpia el temporizador si el componente se desmonta o `agregarElemento` cambia
      return () => clearTimeout(timer);
    }
  }, [agregarElemento]);

  return (
    <div
      className={`fixed top-48 z-50 ${
        agregarElemento ? "right-0" : "-right-full"
      } bg-[#ff000098] text-center  rounded-tl-md rounded-bl-md transition-all flex flex-col items-center justify-center py-3 px-5 `}
    >
      <h2 className="flex items-center gap-2">
        <i className="bi bi-bookmark-check-fill text-2xl"></i>
        <button
          onClick={ocultarWatch}
          className="text-lg lg:text-base font-semibold italic border-b-2 cursor-pointer"
        >
          Ver WatchList
        </button>
      </h2>
    </div>
  );
}
