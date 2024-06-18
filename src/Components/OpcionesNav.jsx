import { useContext, useRef, useState } from "react";
import Generos from "./Generos";
import AppContext from "../context/AppContext";

export default function OpcionesNav({
  updateListOption,
  updateGenOption,
  updateSearchOption,
}) {
  const { dataOption, btnActiveContain } = useContext(AppContext);

  const [input, setInput] = useState(null);
  const inputRef = useRef();

  const handleClick = (e) => {
    if (btnActiveContain.current.querySelector(".text-red-500")) {
      btnActiveContain.current
        .querySelector(".text-red-500")
        .classList.remove("text-red-500");
      e.target.classList.add("text-red-500");
    } else {
      e.target.classList.add("text-red-500");
    }
    window.scrollTo({ top: 650, behavior: "smooth" });
    if (e.target.dataset.type === "list") {
      updateListOption(e.target.dataset.name, e.target.textContent);
    } else {
      updateGenOption(e.target);
    }
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    inputRef.current.value = "";
    updateSearchOption(input);
  };

  return (
    <section>
      <div ref={btnActiveContain} className="flex gap-5">
        <div className="w-40">
          <h2 className="font-bold mb-2 text-lg">Lista</h2>
          <div className="flex flex-col text-sm gap-1 font-semibold items-start">
            {dataOption === "movie" ? (
              <>
                <button
                  className=""
                  data-type="list"
                  data-name="now_playing"
                  onClick={(e) => handleClick(e)}
                >
                  Now Playing
                </button>
                <button
                  data-type="list"
                  onClick={(e) => handleClick(e)}
                  data-name="popular"
                >
                  Popular
                </button>
                <button
                  data-type="list"
                  onClick={(e) => handleClick(e)}
                  data-name="top_rated"
                >
                  Top Rated
                </button>
                <button
                  data-type="list"
                  onClick={(e) => handleClick(e)}
                  data-name="upcoming"
                >
                  Upcoming
                </button>
              </>
            ) : (
              <>
                <button
                  data-type="list"
                  onClick={(e) => handleClick(e)}
                  data-name="top_rated"
                >
                  Top Rated
                </button>
                <button
                  data-type="list"
                  onClick={(e) => handleClick(e)}
                  data-name="airing_today"
                >
                  Airing Today
                </button>
                <button
                  data-type="list"
                  onClick={(e) => handleClick(e)}
                  data-name="popular"
                >
                  Popular
                </button>
                <button
                  data-type="list"
                  onClick={(e) => handleClick(e)}
                  data-name="on_the_air"
                >
                  On The Air
                </button>
              </>
            )}
          </div>
        </div>
        <div>
          <h2 className="font-bold mb-2 text-lg">Géneros</h2>
          <Generos handleClick={handleClick} />
        </div>
        {/* <form
          onSubmit={handleSubmit}
          className="w-full md:w-52 relative"
        >
          <input ref={inputRef}
            onChange={(e) => handleChange(e)}
            className="italic text-sm w-full py-1 px-4 rounded-md outline-none font-semibold bg-transparent border border-gray-500 focus:border-red-500"
            placeholder={`${dataOption === "movie" ? "Película" : "Serie"}`}
            type="text"
          />
          <button
            className="absolute md:-top-1.5 p-2 md:-left-10 text-lg left-0"
            type="submit"
          >
            <i className="bi bi-search"></i>
          </button>
        </form> */}
      </div>
    </section>
  );
}
