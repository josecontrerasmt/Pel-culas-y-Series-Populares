import { useEffect, useRef, useState } from "react";
import { createContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [dataOption, setDataOption] = useState("movie");
  const [listOption, setListOption] = useState("now_playing");
  const [dataActive, setDataActive] = useState("Lista");
  const [title, setTitle] = useState("Now Playing");
  const btnActiveContain = useRef();
  const [menuWatch, setMenuWatch] = useState(false);
  const [loadingWatch, setLoadingWatch] = useState(true);
  const [updateWatch, setUpdateWatch] = useState(false);
  const [agregarElemento, setAgregarElemento] = useState(false);
  const [updateGenero, setUpdateGenero] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [updateSearch, setUpdateSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [pageGen, setPageGen] = useState(1);
  const [pageList, setPageList] = useState(1);
  const [pageSearch, setPageSearch] = useState(1);
  const [menuMobile, setMenuMobile] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const listWatch = async (id, opcion) => {
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

      // Actualizar el agregar o eliminar elementos
      setUpdateWatch(!updateWatch);
    } catch (error) {
      console.log(error);
    }
  };

  const ocultarWatch = (e) => {
    e.stopPropagation();
    setMenuWatch(!menuWatch);
    setMenuMobile(false);
  };

  const data = {
    dataOption,
    setDataOption,
    listOption,
    setListOption,
    dataActive,
    setDataActive,
    title,
    setTitle,
    btnActiveContain,
    menuWatch,
    setMenuWatch,
    loadingWatch,
    setLoadingWatch,
    updateWatch,
    setUpdateWatch,
    agregarElemento,
    setAgregarElemento,
    listWatch,
    ocultarWatch,
    updateGenero,
    setUpdateGenero,
    updateList,
    setUpdateList,
    page,
    setPage,
    pageGen,
    setPageGen,
    pageList,
    setPageList,
    menuMobile,
    setMenuMobile,
    modalSearch,
    setModalSearch,
    pageSearch,
    setPageSearch,
    updateSearch,
    setUpdateSearch,
  };
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export { AppProvider };
export default AppContext;
