import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
const initialPelicula = {
  nombre: "",
  id: "",
};
export default function PeliForm({}) {
  const { dataOption, setModalSearch, setMenuMobile } = useContext(AppContext);
  const [pelicula, setPelicula] = useState(initialPelicula);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setPelicula({
      ...pelicula,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pelicula.nombre != "") {
      setMenuMobile(false);
      e.target.querySelector("input").value = "";
      navigate(`/${dataOption}/search/${pelicula.nombre}`);
      setModalSearch(false);
      setPelicula(initialPelicula);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex gap-2 items-center relative md:w-[250px] md:m-auto`}
    >
      <input
        className="w-full text-black text-xl lg:text-base font-semibold text-center rounded-md pr-8 py-2"
        type="text"
        name="nombre"
        onChange={handleChange}
        placeholder={`Buscar ${
          dataOption === "movie" ? "Película" : "Serie Tv"
        }`}
      />
      <button
        type="submit"
        value={"Buscar"}
        className="text-lg absolute text-black right-2"
      >
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
}
