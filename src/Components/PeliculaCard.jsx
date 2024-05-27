export default function PeliculaCard({
  popular,
  listPelicula,
  setMenuWatch,
  setDatoId,
  setLoadingWatch
}) {
  return (
    <div
     onClick={() => setDatoId(popular.id)}
      className="flex justify-between items-center flex-wrap flex-col rounded-md relative cursor-pointer"
    >
      <img
        className="rounded-md w-full h-[240px] md:h-[300px] object-cover"
        src={`https://image.tmdb.org/t/p/w200/${popular.poster_path}`}
        alt={popular.title || popular.name}
      />
      {/* <h3 className="text-base font-semibold px-4 pt-1 pb-2">
        {popular.title || popular.name}
      </h3> */}
        <button
          className="absolute top-0 right-0 text-xl text-white bg-[#000000e0] pt-1 px-2 pb-2 rounded-bl-xl"
          onClick={(e) => {
            e.stopPropagation()
            setMenuWatch(true);
            setLoadingWatch(true)
            listPelicula(popular.id, true);
          }}
        >
          <i className="bi bi-plus-square-fill"></i>
        </button>
    </div>
  );
}
