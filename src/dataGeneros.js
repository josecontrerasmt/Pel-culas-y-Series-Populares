const dataGeneros = async (dataOption,genero,page) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjNjODI1YmMxNTNlZjRjNTQ0YTQyMWM4OTI4OWVkZSIsInN1YiI6IjY1YjdlZWZkMTA4OWJhMDE2NGY5MTUxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H8d3JNhSWROU7gobtmTpbCKRjEFj6kHw0b5vDaX_xFw",
    },
  };
  const url = `https://api.themoviedb.org/3/discover/${dataOption}?include_adult=false&include_video=false&language=es-MX&page=${page}&sort_by=popularity.desc&with_genres=${genero}`;
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Error en la solicitud");

    const data = await res.json();
    return data;
  } catch (error) {
    return error
  }
};
export default dataGeneros;
