
import { useContext } from "react";
import Loader from "./Loader";
import AppContext from "../context/AppContext";

export default function ProvedorCard({title,isLoading,info}) {

  return (
    <div>
      <h1 className="font-semibold text-sm text-start my-3">{title}</h1>
      <ul className="flex justify-start gap-4">
        {isLoading ? (
          <Loader/>
        ) : info.length > 0 ? (
          info.map((provedor) => {
            return (
              <li
                className="flex flex-col justify-start items-center gap-2 w-16 hover:scale-125 transition-transform"
                key={provedor.provider_id}
              >
                <img
                  className="w-9 rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${provedor.logo_path}`}
                  alt={provedor.provider_name}
                />
                <span className="font-bold text-gray-400 text-[0.9em]">{provedor.provider_name}</span>
              </li>
            );
          })
        ) : (
          <span className="italic font-semibold text-gray-400">Sin Plataforma</span>
        )}
      </ul>
    </div>
  );
}
