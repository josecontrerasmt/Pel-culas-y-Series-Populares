import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import Loader from "./Loader";
import { Link } from "react-router-dom";

export default function ListOptions() {
  const { dataOption,updateList,setUpdateList,setPageList,setMenuMobile } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [lista, setLista] = useState([]);

  const listaOptions = {
    movie: [
      { title: "Popular", type: "popular" },
      { title: "Now Playing", type: "now_playing" },
      { title: "Top Rated", type: "top_rated" },
      { title: "Upcoming", type: "upcoming" },
    ],
    tv: [
      { title: "Top Rated", type: "top_rated" },
      { title: "On The Air", type: "on_the_air" },
      { title: "Popular", type: "popular" },
      { title: "Airing Today", type: "airing_today" }
    ],
  };

  const cargarLista = async () => {
    setIsLoading(true);
    dataOption==='movie'?setLista(listaOptions.movie):setLista(listaOptions.tv)
    setIsLoading(false);
  };
  useEffect(() => {
    cargarLista();
  }, [dataOption]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="font-bold flex flex-col gap-2 ">
          {lista.map((list) => (
            <Link
              key={list.type}
              onClick={()=>{
                setUpdateList(!updateList)
                setPageList(1)
                setMenuMobile(false)
              }}
              className="hover:text-black hover:bg-white transition-all p-2 md:text-sm text-lg rounded-sm "
              to={`/${dataOption}/lista/${list.type}`}
            >
              {list.title}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
