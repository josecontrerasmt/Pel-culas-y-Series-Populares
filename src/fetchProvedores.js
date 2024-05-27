const fetchProvedores = async (dataOption, datoId) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjNjODI1YmMxNTNlZjRjNTQ0YTQyMWM4OTI4OWVkZSIsInN1YiI6IjY1YjdlZWZkMTA4OWJhMDE2NGY5MTUxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H8d3JNhSWROU7gobtmTpbCKRjEFj6kHw0b5vDaX_xFw",
    },
  };
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${dataOption}/${datoId}/watch/providers`,
      options
    );
    if (!res.ok) throw new Error("Error en la peticion");
    const data = await res.json();
    return data.results.MX ? data.results.MX : "Sin datos";
  } catch (error) {}
};

export default fetchProvedores;
