import {
  BsEmojiSmileFill,
  BsEmojiHeartEyesFill,
  BsBookmarkPlusFill,
} from "react-icons/bs";
import { BiSolidBookmarkMinus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../redux/watchlistSlice";

const Card = ({ movie, isInWatchlist, isSearchResult }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const watchlist = useSelector((state) =>
    currentUser ? state.watchlist.watchlists[currentUser.email] || [] : []
  );

  const viewPercentage =
    movie.Metascore !== "N/A" ? parseInt(movie.Metascore) : 50;

  const handleAddMovie = () => {
    if (currentUser) {
      dispatch(addMovie({ userId: currentUser.email, movie }));
    } else {
      alert("You must be logged in to add movie in your watchlist.");
    }
  };

  const handleRemoveMovie = () => {
    if (currentUser) {
      dispatch(
        removeMovie({ userId: currentUser.email, movieId: movie.imdbID })
      );
    }
  };

  const isMovieInWatchlist = watchlist?.some(
    (watchlistMovie) => watchlistMovie.imdbID === movie.imdbID
  );

  return (
    <div className="w-36 rounded relative shadow-lg">
      {isInWatchlist ? (
        <div className="absolute top-2 left-2">
          <BiSolidBookmarkMinus
            className="text-red-600 cursor-pointer"
            onClick={handleRemoveMovie}
          />
        </div>
      ) : (
        isSearchResult && (
          <div className="absolute top-2 left-2">
            {isMovieInWatchlist ? (
              <BiSolidBookmarkMinus
                className="text-red-600 cursor-pointer"
                onClick={handleRemoveMovie}
              />
            ) : (
              <BsBookmarkPlusFill
                className="text-slate-400 cursor-pointer"
                onClick={handleAddMovie}
              />
            )}
          </div>
        )
      )}

      <div className="flex justify-center">
        <img src={movie.Poster} alt={movie.Title} className="w-full h-52" />
      </div>

      <div className="flex items-center w-16 ml-16 mt-1">
        {viewPercentage < 80 ? (
          <BsEmojiSmileFill className="text-yellow-500" />
        ) : (
          <BsEmojiHeartEyesFill className="text-green-500" />
        )}
        <span className="ml-2 text-gray-600">
          {viewPercentage}
          <sup>/100</sup>
        </span>
      </div>
      <div className="mt-1">
        <p className="font-semibold">{movie.Title}</p>
        <p className="line-clamp-2">{movie.Plot}</p>
        <p className="text-sm">({movie.Year})</p>
      </div>
    </div>
  );
};

export default Card;
