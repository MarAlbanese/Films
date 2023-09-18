import { useEffect, useState } from 'react';
import axios from 'axios';

function CollectionImages() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  const [collectionImages, setCollectionImages] = useState([]);
  const [collectionId, setCollectionId] = useState("528");
  
  const fetchCollectionImages = async (id) => {
    const response = await axios.get(`${API_URL}/collection/${id}/images`, {
      params: {
        api_key: API_KEY,
      },
    });

    setCollectionImages(response.data.posters);
  };

  useEffect(() => {
    fetchCollectionImages(collectionId);
  }, [collectionId]);

  return (
    <div>
      <h2 className="text-center pt-14 mt-10 mb-10 text-4xl bg-black h-40 text-gray-300 ">Collection TERMINATOR</h2>

      <div className=" mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collectionImages.map((image, index) => (
            <div key={index} className="border-2 border-red-500 p-4 shadow-md">
              <img
                src={`${IMAGE_PATH}${image.file_path}`}
                alt={`Collection Image ${index}`}
                className="max-w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CollectionImages;

