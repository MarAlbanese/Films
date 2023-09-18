import  { useEffect, useState } from 'react';
import axios from 'axios';

function MovieDetails() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84"; // Reemplaza con tu clave de API
  const movieIds = [565770, 433694, 945729]; // Cambia estos IDs a los de las películas que deseas consultar

  const [movieDetailsList, setMovieDetailsList] = useState([]);

  const fetchMovieDetails = async (id) => {
    const response = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    return response.data;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await Promise.all(movieIds.map(id => fetchMovieDetails(id)));
      setMovieDetailsList(movies);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2 className="text-center mt-5 mb-5">Movie Details</h2>

      {movieDetailsList.map((movieDetails, index) => (
        <div key={index} className=" mx-auto mt-8">
          <div className="flex">
            <img
              src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="mr-4 max-w-[150px] h-auto"
            />
            <div className='w-1/2'>
              <h3>Title: {movieDetails.title}</h3>
              <p className='text-sm'>Overview: {movieDetails.overview}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieDetails;

