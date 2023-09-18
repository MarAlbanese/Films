import { useEffect, useState } from 'react';
import axios from 'axios';

function DiscoverTV() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  const [tvShows, setTVShows] = useState([]);

  const fetchTVShows = async () => {
    const response = await axios.get(`${API_URL}/discover/tv`, {
      params: {
        api_key: API_KEY,
        include_adult: false,
        include_null_first_air_dates: false,
        language: "en-US",
        page: 1,
        sort_by: "popularity.desc",
      },
    });

    setTVShows(response.data.results);
  };

  useEffect(() => {
    fetchTVShows();
  }, []);

  return (
    <div>
      <h2 className="text-center pt-14 mt-10 mb-10 text-4xl bg-black h-40 text-blue-300 ">Discover TV Shows</h2>

      <div className=" mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tvShows.map((show) => (
            <div key={show.id} className="border-2 border-blue-400 p-4 shadow-md">
              <img
                src={`${IMAGE_PATH}${show.poster_path}`}
                alt={show.name}
                className="max-w-full h-auto"
              />
              <h4 className="text-center mt-2">{show.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiscoverTV;
