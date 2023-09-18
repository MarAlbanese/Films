import { useEffect, useState } from 'react';
import axios from 'axios';

function TopRatedTVShows() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84"; // Reemplaza con tu clave de API

  const [topRatedTVShows, setTopRatedTVShows] = useState([]);

  const fetchTopRatedTVShows = async () => {
    const response = await axios.get(`${API_URL}/tv/top_rated`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1, // Puedes ajustar el número de página si deseas más resultados
      },
    });

    setTopRatedTVShows(response.data.results);
  };

  useEffect(() => {
    fetchTopRatedTVShows();
  }, []);

  return (
    <div>
      <h2 className="text-center pt-14 mt-10 mb-10 text-4xl bg-black h-40 text-green-600">Top Rated TV Shows</h2>

      <div className=" mx-auto mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topRatedTVShows.map((show) => (
            <div key={show.id} className="border-2 border-green-500 p-4 shadow-md">
              <img
                src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                alt={show.name}
                className="max-w-full h-auto mb-2"
              />
              <h4 className="text-center font-semibold">{show.name}</h4>
              <p className="text-gray-600 text-sm">{show.overview}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopRatedTVShows;
