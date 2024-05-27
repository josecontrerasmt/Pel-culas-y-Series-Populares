import { useEffect, useRef, useState } from "react";
// import PeliForm from "./Components/PeliForm";
import NavBar from "./Components/Navegacion/NavBar";
import Generos from "./Components/Generos";
import WatchList from "./Components/WatchList";
import Loader from "./Components/Loader";
import dataPopulares from "./dataPopulares";
import dataGeneros from "./dataGeneros";
import Modal from "./Components/Modal";
import PeliculaCard from "./Components/PeliculaCard";
import Header from "./Components/Header";

function App() {
  // Menu
  const [menuGenero, setMenuGenero] = useState(false);
  const [menuWatch, setMenuWatch] = useState(false);
  const [title, setTitle] = useState("Populares");
  // Contenedor
  const [dataPopular, setDataPopular] = useState([]);
  const [dataActive, setDataActive] = useState("Popular");
  const [dataOption, setDataOption] = useState("movie");
  // WatchList
  const [updateWatch, setUpdateWatch] = useState(false);
  // Otros
  const [pagina, setPagina] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [generoId, setGeneroId] = useState(null);
  const [datoId, setDatoId] = useState(null);
  const [loadingWatch, setLoadingWatch] = useState(true);
  const [search, setSearch] = useState(null);
  const btnContainer = useRef();
  const inputText = useRef();

  useEffect(() => {
    cargarInfo(dataActive, pagina);
  }, [dataOption, pagina, generoId, search]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 10 >=
          document.documentElement.offsetHeight &&
        !isLoading
      ) {
        setPagina((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const cargarInfo = async (active, page) => {
    setIsLoading(true);
    let datos;
    if (active === "Popular") {
      setTitle("Populares");
      datos = await dataPopulares(dataOption, page);
    } else if (active === "Genero") {
      datos = await dataGeneros(dataOption, generoId, page);
    } else {
      datos = await fetchBusqueda(search);
    }
    setDataPopular([...dataPopular, ...datos.results]);
    setIsLoading(false);
  };
  // MENU
  const ocultarGeneros = () => {
    setMenuGenero(!menuGenero);
    setMenuWatch(false);
  };
  const ocultarWatch = () => {
    setMenuWatch(!menuWatch);
    setMenuGenero(false);
  };
  // CATEGORÍA
  const cambiarCategoria = (categoria) => {
    if(categoria!==dataOption){
      setDataPopular([]);
      setDataOption(categoria);
      setPagina(1);
      setDataActive("Popular");
      if (btnContainer.current.querySelector(".bg-red-500")) {
        btnContainer.current
          .querySelector(".bg-red-500")
          .classList.remove("bg-red-500");
      }
    }
  };
  // WATCHLIST
  const listPelicula = async (id, opcion) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjNjODI1YmMxNTNlZjRjNTQ0YTQyMWM4OTI4OWVkZSIsInN1YiI6IjY1YjdlZWZkMTA4OWJhMDE2NGY5MTUxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H8d3JNhSWROU7gobtmTpbCKRjEFj6kHw0b5vDaX_xFw",
      },
      body: JSON.stringify({
        media_type: dataOption,
        media_id: `${id}`,
        watchlist: opcion,
      }),
    };
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/account/20954554/watchlist`,
        options
      );
      if (!res.ok) return;
      setUpdateWatch(!updateWatch);
    } catch (error) {
      console.log(error);
    }
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
        `https://api.themoviedb.org/3/search/${dataOption}?query=${search}&include_adult=false&language=es-MX&page=${pagina}`,
        options
      );
      if (!res.ok) return;
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const busqueda = (input) => {
    if (input !== "") {
      setPagina(1);
      setDataPopular([]);
      setDataActive("Search");
      setTitle(input);
      setSearch(input);
    } else {
      setDataActive("Popular");
      setTitle("Populares");
    }
  };
  const elegirGenero = (e, genero) => {
    if (btnContainer.current.querySelector(".bg-red-500")) {
      btnContainer.current
        .querySelector(".bg-red-500")
        .classList.remove("bg-red-500");
      e.target.classList.add("bg-red-500");
    } else {
      e.target.classList.add("bg-red-500");
    }
    if (generoId !== genero.id) {
      setMenuGenero(false);
      setPagina(1);
      setGeneroId(genero.id);
      setDataActive("Genero");
      setDataPopular([]);
      setTitle(genero.name);
      window.scrollTo({ top: 0 });
    }
  };
  const reset = () => {
    if (
      pagina != 1 ||
      dataActive !== "Popular" ||
      generoId !== null ||
      search !== null ||
      dataOption !== "movie"
    ) {
      setPagina(1);
      setDataPopular([]);
      setDataActive("Popular");
      setTitle("Populares");
      setDataOption("movie");
      setGeneroId(null);
      setSearch(null);
      if (btnContainer.current.querySelector(".bg-red-500")) {
        btnContainer.current
          .querySelector(".bg-red-500")
          .classList.remove("bg-red-500");
      }
    }
  };
  const buscarInput = () => {
    if (inputText.current) {
      inputText.current.focus();
      setMenuGenero(false);
      setMenuWatch(false);
    }
  };
  return (
    <>
      <NavBar
        ocultarGeneros={ocultarGeneros}
        menuGenero={menuGenero}
        ocultarWatch={ocultarWatch}
        menuWatch={menuWatch}
        buscarInput={buscarInput}
      />
      <WatchList
        menuWatch={menuWatch}
        listPelicula={listPelicula}
        updateWatch={updateWatch}
        dataOption={dataOption}
        loadingWatch={loadingWatch}
        setLoadingWatch={setLoadingWatch}
      />
      <main className="pt-8 px-5 pb-20 relative lg:px-20">
        <Header
          title={title}
          dataOption={dataOption}
          cambiarCategoria={cambiarCategoria}
          setMenuGenero={setMenuGenero}
          setMenuWatch={setMenuWatch}
          busqueda={busqueda}
          setSearch={setSearch}
          menuWatch={menuWatch}
          ocultarWatch={ocultarWatch}
          reset={reset}
          inputText={inputText}
        />
        <Generos
          menuGenero={menuGenero}
          dataOption={dataOption}
          search={search}
          elegirGenero={elegirGenero}
          btnContainer={btnContainer}
        />
        <h1 className={`${title==='Populares'?'hidden':'visible'} text-center text-3xl font-bold text-red-500 mt-6 lg:mt-0`}>{title}</h1>
        <section className="mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8 items-start text-center">
            {dataPopular &&
              dataPopular.map((popular) => {
                return (
                  <PeliculaCard
                    key={popular.id}
                    popular={popular}
                    listPelicula={listPelicula}
                    setMenuWatch={setMenuWatch}
                    setDatoId={setDatoId}
                    setLoadingWatch={setLoadingWatch}
                  />
                );
              })}
          </div>
          {isLoading && <Loader />}
        </section>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hidden lg:flex items-center py-1 px-3 fixed bottom-10 right-6 text-red-600"
        >
          <i className={`bi bi-arrow-up-circle-fill text-4xl`}></i>
        </button>
        {datoId && (
          <Modal
            datoId={datoId}
            dataOption={dataOption}
            setDatoId={setDatoId}
          />
        )}
      </main>
    </>
  );
}

export default App;
