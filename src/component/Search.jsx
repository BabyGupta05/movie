import { CiSearch } from "react-icons/ci";
import Card from "./Card";
import { useState } from "react";
import axios from "axios";

export const Search = () => {
  const API_URL = "http://www.omdbapi.com/?apikey=1696d76b";
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async (query) => {
    try {
      const response = await axios.get(`${API_URL}&s=${query}`);
      const data = response.data;
      if (data.Response === "True") {
        const movieDetails = await Promise.all(
          data.Search.map(async (movie) => {
            const detailResponse = await axios.get(
              `${API_URL}&i=${movie.imdbID}`
            );
            console.log(detailResponse.data);
            return detailResponse.data;
          })
        );
        setMovies(movieDetails.slice(0, 10));
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearchClick = () => {
    if (searchTerm) {
      fetchMovies(searchTerm);
    } else {
      setMovies([]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="ml-64">
      <div className="flex flex-col outline outline-red-600 outline-1 rounded p-10 my-10 mr-10 ">
        <p className="text-3xl">
          Welcome to <span className="text-red-600">Watchlists</span>
        </p>
        <p className="mt-5">
          Browse movies, add them to watchlist and share them with friends, just
          click on the + to add a movie, the poster to see more detail to mark
          the movie as watched.
        </p>
      </div>
      <div className="flex outline outline-1 outline-gray-500 rounded mr-10">
        <CiSearch size={24} className="m-2" />
        <input
          type="search"
          placeholder="Search movies here"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full outline-none"
        />
        <button
          className="bg-red-600 text-white font-bold p-2"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-5 gap-y-12 gap-x-12 my-10">
        {movies.map((movie, index) => (
          <Card key={index} movie={movie} isSearchResult={true} />
        ))}
      </div>
    </div>
  );
};
