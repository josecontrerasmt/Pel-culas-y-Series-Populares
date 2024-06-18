import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import Generos from "../Generos";
import ListOptions from "../ListOptions";
import PeliForm from "../PeliForm";

export default function NavBar() {
  const {
    ocultarWatch,
    setPage,
    setMenuWatch,
    menuWatch,
    menuMobile,
    setMenuMobile,
    setModalSearch,
    modalSearch,
  } = useContext(AppContext);
  const urlState = useParams();

  const [genOptions, setGenOptions] = useState(false);
  const [listOptions, setListOptions] = useState(false);
  const handleClickGen = (e) => {
    e.stopPropagation();
    setGenOptions(!genOptions);
    setMenuWatch(false);
    setListOptions(false);
  };
  const handleClickList = (e) => {
    e.stopPropagation();
    setListOptions(!listOptions);
    setMenuWatch(false);
    setGenOptions(false);
  };
  useEffect(() => {
    if (genOptions || listOptions || menuWatch || modalSearch) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [genOptions, listOptions, menuWatch, modalSearch]);

  const handleClickOutside = () => {
    setGenOptions(false);
    setListOptions(false);
    setMenuWatch(false);
    setModalSearch(false);
  };
  const closeNav = () => {
    setMenuMobile(false);
  };
  const styleDesktop =
    "md:flex-row md:text-sm md:items-center md:gap-12 md:h-auto md:static md:py-2 md:px-16 md:justify-center md:rounded-full md:w-auto md:m-auto md:bg-transparent";
  const styleMobile = `flex-col text-xl fixed w-full h-[100vh]  bg-[#000000f1] top-0 z-40 gap-5 py-28 px-8 justify-start items-start ${
    menuMobile ? "left-0" : "-left-full"
  } transition-all`;
  const styleLink =
    "flex items-center gap-1.5 p-1 transition-colors lg:px-4 md:px-2 text-gray-300 hover:text-white hover:border-white cursor-pointer";
  return (
    <nav className={`flex font-semibold ${styleMobile} ${styleDesktop} `}>
      <NavLink
        onClick={() => {
          setMenuMobile(false);
          if (Object.keys(urlState).length > 0) {
            setPage(1);
          }
        }}
        to="/"
        className={styleLink}
      >
        <i className="bi bi-house-fill"></i>
        Inicio
      </NavLink>
      <div className="relative">
        <button className={styleLink} onClick={handleClickGen}>
          <i
            className={`bi bi-caret-down-fill ${
              genOptions ? "rotate-180" : "rotate-0"
            } transition-transform`}
          ></i>
          Géneros
        </button>
        <div
          className={`absolute top-8 w-40 bg-[#0a090cf6] z-50 ${
            genOptions ? "h-96 md:80" : "h-0"
          } overflow-y-auto transition-all rounded-md`}
        >
          <Generos />
        </div>
      </div>
      <div className="relative">
        <button className={styleLink} onClick={handleClickList}>
          <i
            className={`bi bi-caret-down-fill ${
              listOptions ? "rotate-180" : "rotate-0"
            } transition-transform`}
          ></i>
          Lista
        </button>
        <div
          className={`absolute top-8 w-40 bg-[#0a090cf6] z-50 ${
            listOptions ? "h-52 md:h-44" : "h-0"
          } overflow-y-auto transition-all rounded-md flex flex-col`}
        >
          <ListOptions />
        </div>
      </div>
      <button onClick={ocultarWatch} className={styleLink}>
        <i className="bi bi-bookmark-plus-fill "></i>WatchList
      </button>
      <button
        onClick={closeNav}
        className="absolute top-8 right-10 p-2 md:hidden text-2xl"
      >
        <i className="bi bi-x-lg"></i>
      </button>

      {/* <div className="lg:relative lg:top-auto lg:w-auto  w-full md:absolute md:w-52 md:top-16">
          <PeliForm />
      </div> */}
    </nav>
  );
}
