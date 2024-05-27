export default function NavBar({
  ocultarGeneros,
  menuGenero,
  ocultarWatch,
  menuWatch,
  buscarInput
}) {

  const inicio=()=>{
    window.scrollTo({ top: 0, behavior: 'smooth'});
  }

  return (
    <nav className="text-white bg-[#130F16] fixed w-full bottom-0 left-0 z-50 lg:hidden">
      <ul className="md:container md:max-w-5xl m-auto w-full  flex justify-around md:gap-14 items-center py-2 font-semibold overflow-hidden text-xs md:text-[1em]">
        <li>
          <button
            onClick={ocultarGeneros}
            className="flex items-center py-1 px-3"
          >
            <i
              className={`bi ${
                menuGenero
                  ? "bi-x-circle text-red-500"
                  : "bi-bookmark-plus-fill "
              } text-2xl`}
            ></i>
          </button>
        </li>
        <li>
          <button onClick={buscarInput} className="flex items-center py-1 px-3">
            <i className={`bi bi-search text-2xl`}></i>
          </button>
        </li>
        <li>
          <button onClick={inicio} className="flex items-center py-1 px-3">
            <i className={`bi bi-arrow-up-circle-fill text-2xl`}></i>
          </button>
        </li>
        <li>
          <button
            onClick={ocultarWatch}
            className="flex items-center py-1 px-3"
          >
            <i
              className={`bi ${
                menuWatch ? "bi-x-circle text-red-500" : "bi-eye-fill"
              } text-2xl`}
            ></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}
