const dataPopulares = async (dataOption, pagina) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjNjODI1YmMxNTNlZjRjNTQ0YTQyMWM4OTI4OWVkZSIsInN1YiI6IjY1YjdlZWZkMTA4OWJhMDE2NGY5MTUxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H8d3JNhSWROU7gobtmTpbCKRjEFj6kHw0b5vDaX_xFw",
    },
  };
  const url = `https://api.themoviedb.org/3/${dataOption}/popular?language=es-MX&page=${pagina}`;
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw res;
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default dataPopulares;
