import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";

export default function PeliculaCard({ item }) {
  const { dataOption } = useContext(AppContext);
  return (
    <div className="group rounded-md relative">
      <Link to={`/${dataOption}/${item.id}`}>
        <img
          className="rounded-md w-full h-[280px] object-cover"
          src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
          alt={item.title || item.name}
        />
      </Link>
      <div className="absolute bottom-0 w-full p-2 bg-[#000000cb] lg:opacity-0 lg:group-hover:opacity-100 transition-opacity md:opacity-100">
        <h1 className="text-center lg:font-bold md:font-semibold md:text-sm">{item.title || item.name}</h1>
        <div className=" flex justify-center lg:gap-2 md:gap-1 items-center ">
          <i className="bi bi-star-fill text-[#ffd700]"></i>
          <span className="font-bold">
            {Math.round(item.vote_average * 10) / 10}
          </span>
        </div>
      </div>
    </div>
  );
}
