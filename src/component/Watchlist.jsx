import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import Card from "./Card";

export const Watchlist = ({ watchlistName, onUpdateWatchlistName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(watchlistName);
  const currentUser = useSelector((state) => state.user.currentUser);
  const watchlist = useSelector(
    (state) => state.watchlist.watchlists[currentUser.email]
  );

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onUpdateWatchlistName(inputValue);
      setIsEditing(false);
    }
  };

  return (
    <div className="ml-64 mr-10 w-full">
      <div className="my-5">
        <input
          type="text"
          className="font-bold text-3xl"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          readOnly={!isEditing}
        />
        <button onClick={handleEditClick}>
          <FaRegEdit size={24} />
        </button>
      </div>
      <div>
        <p className="font-bold">About this Watchlist</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
          asperiores!
        </p>
      </div>
      <div className="grid grid-cols-5 gap-y-12 gap-x-12 my-10">
        {watchlist &&
          watchlist.map((movie, index) => (
            <Card key={index} movie={movie} isInWatchlist={true} />
          ))}
      </div>
    </div>
  );
};
