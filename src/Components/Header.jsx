import { useRef, useState } from "react";

export default function Header({
  dataOption,
  cambiarCategoria,
  setMenuGenero,
  setMenuWatch,
  busqueda,
  setSearch,
  menuWatch,
  ocultarWatch,
  reset,
  inputText,
}) {
  
  const [input, setInput] = useState('');
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    if (e.type === 'submit') {
      if (inputText.current) {
        inputText.current.blur();
      }
    }
    busqueda(input)
    setInput('')
    inputText.current.value=''
  }
  return (
    <header className="relative">
      <h1 className="text-center text-5xl font-bold ">Populares</h1>
      <div className="mt-10 flex flex-col items-center gap-5 md:flex-row md:justify-between">
        <div className="w-full flex justify-around md:w-auto md:gap-5">
          <button
            className={`${
              dataOption === "movie" ? "bg-red-600" : "bg-[#2C2A32]"
            } py-2 px-6 rounded-md cursor-pointer font-semibold text-lg lg:py-1`}
            onClick={() => {
              cambiarCategoria("movie");
              setMenuGenero(false);
              setMenuWatch(false);
              setSearch(null);
            }}
          >
            Películas
          </button>
          <button
            className={`${
              dataOption === "tv" ? "bg-red-600" : "bg-[#2C2A32]"
            } py-2 px-6 rounded-md cursor-pointer font-semibold text-lg lg:py-1`}
            onClick={() => {
              cambiarCategoria("tv");
              setMenuGenero(false);
              setMenuWatch(false);
              setSearch(null)
            }}
          >
            Series TV
          </button>
          <button onClick={reset} className="text-2xl bg-red-500 w-10 h-10 rounded-full pb-1"><i className="bi bi-house-door-fill"></i></button>
        </div>
        <form onSubmit={handleSubmit} className="w-full md:w-72 relative text-end">
          <input ref={inputText}
            onChange={(e) => handleChange(e)}
            className="w-[280px] md:w-full py-2 md:py-1 text-black px-4 rounded-md text-lg outline-none font-semibold"
            type="text"
          />
          <button className="absolute md:-top-1 p-2 md:-left-10 text-xl left-0" type="submit"><i className="bi bi-search"></i></button>
        </form>
      </div>
      <button
        onClick={ocultarWatch}
        className={`hidden lg:block fixed top-14 text-3xl z-50 ${
          menuWatch ? "lg:right-72" : "lg:right-14"
        } transition-all`}
      >
        <i
          className={`bi ${
            menuWatch
              ? "bi-arrow-right-circle-fill"
              : "bi-arrow-left-circle-fill"
          }`}
        ></i>
      </button>
    </header>
  );
}
