import Header from "../Components/Header";
import Loader from "../Components/Loader";
import PeliculaCard from "../Components/PeliculaCard";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import buscarInfo from "../buscarInfo";
import { useParams } from "react-router-dom";

export default function Home() {
  const { dataOption, setDataOption, page, setPage } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [dataContainer, setDataContainer] = useState([]);
  const [showButton,setShowButton]=useState(false)
  const urlHome = useParams()
  useEffect(() => {
    console.log(urlHome);
    setIsLoading(true);
    cargarInfo();
  }, [dataOption, page]);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight &&
        !isLoading
      ) {
        setPage((prevPage) => prevPage + 1);
      }

      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);


  const cargarInfo = async () => {
    const datos = await buscarInfo(
      dataOption,
      page,
      dataOption === "movie" ? "popular" : "top_rated"
    );
    setDataContainer([...dataContainer, ...datos.results]);
    setIsLoading(false);
  };
  const cambiarOpcion = (categoria) => {
    if (categoria !== dataOption) {
      window.scrollTo({ top: 0 });
      setDataOption(categoria);
      setDataContainer([]);
      setPage(1);
    }
  };
  return (
    <div>
      <Header cambiarOpcion={cambiarOpcion} />
      <main className="relative md:px-20 pb-10 px-5">
        <h1 className="font-bold text-xl mb-8 mt-4 text-red-600 uppercase">
          {dataOption === "movie" ? "Populares" : "Top Rated"}
        </h1>
        <div className="w-full grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4 mb-5">
          {dataContainer.length > 0
            ? dataContainer.map((item) => {
                return <PeliculaCard key={item.id} item={item} />;
              })
            : null}
        </div>
        {isLoading ? (
          <div className="">
            <Loader />
          </div>
        ) : null}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`${showButton?'block':'hidden'} opacity-80 hover:opacity-100 transition-opacity   fixed bottom-10 right-6 rounded-full text-4xl z-30`}
        >
          <i className="bi bi-arrow-up-circle-fill"></i>
        </button>
      </main>
    </div>
  );
}
