
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
import YouTube from 'react-youtube';

function Consulta() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  // endpoint para las imagenes
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  // variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  //const [selectedMovie, setSelectedMovie] = useState({})
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  // funcion para realizar la peticion get a la api
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });
    //console.log('data',results);
    //setSelectedMovie(results[0])

    setMovies(results);
    setMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };

  // funcion para la peticion de un solo objeto y mostrar en reproductor de videos
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    //return data
    setMovie(data);
  };

  const selectMovie = async (movie) => {
    // const data = await fetchMovie(movie.id)
    // console.log(data);
    // setSelectedMovie(movie)
    fetchMovie(movie.id);

    setMovie(movie);
    window.scrollTo(0, 0);
  };

  // funcion para buscar peliculas
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h2 className="text-center mt-5 mb-5">Trailer Popular Movies</h2>

      {/* Buscador */}
      <form className="mb-4 flex" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchKey(e.target.value)}
          className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button className="bg-blue-500 text-white font-semibold rounded-r px-4 py-2 ml-1 focus:outline-none">
          Search
        </button>
      </form>

      {/* Contenedor para previsualizar */}
      <div>
        <main>
          {movie ? (
            <div
              className="viewtrailer bg-cover bg-center"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
                backgroundSize: "auto 100%", // Ajusta el tamaño de la imagen de fondo
                
                height: "300px"
              }}
            >
              {playing ? (
                <>
                  <div className='bg-green-300 w-full'>
                    <YouTube
                    videoId={trailer.key}
                    className="reproductor"
                    // containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 1,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  </div>
                  <button
                    onClick={() => setPlaying(false)}
                    className="boton bg-blue-500 text-white font-semibold rounded px-4 py-2 focus:outline-none"
                  >
                    Close
                  </button>
                </>
              ) : (
                <div className=" bg-gray-800 bg-opacity-80 rounded p-8 text-white">
                  {trailer ? (
                    <button
                      className="boton bg-blue-500 text-white font-semibold rounded px-4 py-2 focus:outline-none"
                      onClick={() => setPlaying(true)}
                      type="button"
                    >
                      Play Trailer
                    </button>
                  ) : (
                    "Sorry, no trailer available"
                  )}
                  <h1 className="text-white">{movie.title}</h1>
                  <p className="text-white">{movie.overview}</p>
                </div>
              )}
            </div>
          ) : null}
        </main>
      </div>

      {/* Contenedor para mostrar los posters y las películas */}
      <div className=" mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="border-2 border-blue-400 p-4 shadow-md cursor-pointer"
              onClick={() => selectMovie(movie)}
            >
              <img
                src={`${URL_IMAGE + movie.poster_path}`}
                alt={movie.title}
                className="max-w-full h-auto"
              />
              <h4 className="text-center mt-2">{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Consulta;