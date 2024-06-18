import { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import NavBar from "./Navegacion/NavBar";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";
import buscarInfo from "../buscarInfo";
import imgTvUrl from "/HeaderImg.jpg";
import imgMovieUrl from "/HeaderImgMovie.jpg";
import PeliForm from "./PeliForm";

export default function Header({ cambiarOpcion }) {
  const {
    dataOption,
    setLoadingWatch,
    listWatch,
    setAgregarElemento,
    setMenuMobile,
    ocultarWatch,
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const btnActive =
    "bg-red-600 font-bold text-base py-1 px-4  rounded-md transition-all";
  const btnDisactive =
    "text-sm text-gray-400 font-semibold py-1 px-4 transition-all hover:text-white hover:bg-red-600 rounded-md";
  // useEffect(() => {
  //   setIsLoading(true);
  //   const info = async () => {
  //     const data = await buscarInfo(
  //       dataOption,
  //       1,
  //       dataOption === "movie" ? "popular" : "top_rated"
  //     );
  //     const newData = data.results.slice(0, 3);
  //     setDataHeader(newData);
  //     setIsLoading(false);
  //   };
  //   info();
  // }, [dataOption]);

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [dataOption]);

  const agregarElemento = (id) => {
    setLoadingWatch(true);
    listWatch(id, true);
    setAgregarElemento(true);
  };
  return (
    <header className="relative py-10 lg:h-[80vh] md:px-20 px-5 md:h-[40vh] h-[100vh]">
      <div className="flex md:flex-row relative z-40 items-center justify-between">
        <button
          onClick={() => {
            setMenuMobile(true);
          }}
          className="text-3xl cursor-pointer md:hidden"
        >
          <i className="bi bi-list"></i>
        </button>
        <button onClick={ocultarWatch} className="md:hidden text-2xl">
          <i className="bi bi-stopwatch"></i>
        </button>
        <NavBar />
      </div>
      {isLoading ? (
        <div className="h-full grid items-center">
          <Loader />
        </div>
      ) : (
        <div className="absolute inset-0  overflow-hidden">
          <div className="relative h-full ">
            <div className='absolute inset-0'>
              <img
                className="w-full h-full object-cover object-top"
                src={dataOption === "movie" ? imgMovieUrl : imgTvUrl}
                alt=""
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C10] via-transparent to-transparent"></div>
              <div className="absolute inset-0 z-20 px-5 md:px-20 md:mt-20 grid place-content-center gap-14 md:gap-12">
                <div>
                  <h1 className="text-4xl font-bold text-center">
                    Te damos la bienvenida
                  </h1>
                  <h2 className="text-xl lg:text-lg text-center font-semibold mt-2 italic">
                    Millones de películas y series por descubrir. Explora ya.
                  </h2>
                </div>
                <div className="w-full">
                  <PeliForm />
                </div>
                <div className="flex flex-row items-center gap-3 justify-center ">
                  <button
                    onClick={() => cambiarOpcion("movie")}
                    className={
                      dataOption === "movie" ? btnActive : btnDisactive
                    }
                  >
                    Películas
                  </button>
                  <span className="lg:text-2xl text-lg text-gray-400">/</span>
                  <button
                    onClick={() => cambiarOpcion("tv")}
                    className={dataOption === "tv" ? btnActive : btnDisactive}
                  >
                    Series
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        // <div className="absolute inset-0">
        //   <div className="relative flex overflow-x-hidden lg:h-[100vh] md:h-[75vh] h-[100vh]">
        //     {/* {dataHeader.map((item, index) => {
        //       return (
        //         <div
        //           className={`absolute inset-0 min-w-full  transition-all duration-200 ${
        //             index !== indexImg ? "opacity-0" : "opacity-100"
        //           }`}
        //           key={item.id}
        //         >
        //           <img
        //             className="w-full h-full object-cover object-top"
        //             src={
        //               "https://image.tmdb.org/t/p/original" + item.backdrop_path
        //             }
        //             alt=""
        //           />
        //           <div className="absolute inset-0 bg-black opacity-80"></div>
        //           <div className="absolute inset-0 bg-gradient-to-t from-[#0a090c] via-transparent to-transparent"></div>
        //           <div className="absolute z-20 lg:top-44 md:top-52 lg:left-36 lg:w-[650px] md:left-0 md:right-0 md:px-20 px-5 top-32">
        //             <h1 className="md:text-4xl text-2xl uppercase text-center mb-3 font-bold">
        //               {item.title || item.name} (
        //               {item.release_date?.slice(0, 4) ||
        //                 item.first_air_date?.slice(0, 4)}
        //               )
        //             </h1>
        //             <div className=" flex justify-center gap-2 items-center ">
        //               <i className="bi bi-star-fill text-[#ffd700]"></i>
        //               <span className="font-bold">
        //                 {Math.round(item.vote_average * 10) / 10}
        //               </span>
        //             </div>
        //             <p className="lg:text-[0.9em] md:text-base lg:mt-5 md:mt-10 mb-12 font-semibold">
        //               {item.overview}
        //             </p>

        //             <div className="mt-5 flex gap-5 items-center">
        //               <button onClick={()=>agregarElemento(item.id)} className="bg-red-600 rounded-2xl px-8 py-2 uppercase text-[0.9em] font-semibold flex items-center gap-2">
        //                 <i className="bi bi-plus-lg"></i>Añadir
        //               </button>

        //               <Link to={`/${dataOption}/${item.id}`}>
        //                 <button className="bg-black rounded-2xl px-8 py-2 uppercase text-[0.9em] font-semibold flex items-center gap-2">
        //                   <i className="bi bi-info-circle"></i>Ver Mas
        //                 </button>
        //               </Link>
        //             </div>
        //           </div>
        //         </div>
        //       );
        //     })} */}
        //   </div>
        // </div>
      )}
      {/* <div className="flex gap-3 absolute bottom-10 right-0 left-0 justify-center items-center">
        {isLoading
          ? ""
          : dataHeader.map((_, index) => {
              return (
                <i
                  onClick={() => handleOpcionSlide(index)}
                  key={index}
                  className={`bi bi-dash-lg cursor-pointer text-[2.5em] ${
                    index === indexImg ? "text-red-500" : "text-gray-500"
                  }`}
                ></i>
              );
            })}
      </div> */}
      {/* <form
        onSubmit={handleSubmit}
        className="w-full md:w-72 relative text-end"
      >
        <input
          ref={inputText}
          onChange={(e) => handleChange(e)}
          className="w-[280px] md:w-full py-2 md:py-1 text-black px-4 rounded-md text-lg outline-none font-semibold"
          type="text"
        />
        <button
          className="absolute md:-top-1 p-2 md:-left-10 text-xl left-0"
          type="submit"
        >
          <i className="bi bi-search"></i>
        </button>
      </form> */}
    </header>
  );
}
