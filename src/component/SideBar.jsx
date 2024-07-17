import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { LuUserCircle } from "react-icons/lu";
import { IoIosCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, login, logout } from "../redux/userSlice";

export const SideBar = ({ watchlistName }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const toggleLoginModal = () => {
    setLoginModalOpen((prev) => !prev);
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "username") setUsername(value);
  };

  const handleRegister = () => {
    dispatch(register({ email, username }));
    setLoginModalOpen(false);
    setEmail("");
    setUsername("");
    alert("Registration successful!");
  };

  const handleLogin = () => {
    const user = users.find((user) => user.email === email);
    if (user) {
      dispatch(login(user));
      setLoginModalOpen(false);
      setEmail("");
      setUsername("");
      alert("Login successful!");
    } else {
      alert("User not found. Please register first.");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    alert("Logout successful!");
    navigate("/");
  };

  const handleWatchlistClick = () => {
    if (currentUser) {
      navigate("/watchlist");
    } else {
      alert("You must be logged in to access your watchlist.");
    }
  };

  return (
    <div className="flex flex-col border-r-2 border-r-black-500 border-solid px-5 max-w-xs min-h-full fixed">
      <h3 className="text-4xl font-bold text-red-600 mb-8">watchlists</h3>

      <Link to="/">
        <div className="flex items-center gap-3 p-2 bg-red-600 rounded text-white mb-8">
          <IoHomeOutline size={24} />
          <span>Home</span>
        </div>
      </Link>

      <div className="flex flex-col h-96 mb-8 overflow-y-auto ">
        <p
          className="font-semibold mb-2 cursor-pointer"
          onClick={handleWatchlistClick}
        >
          My Lists
        </p>

        <div className="flex flex-col gap-2">
          <div className="h-10">{watchlistName}</div>
        </div>
      </div>

      <div
        className="flex items-center gap-3 outline outline-1 outline-gray-500 rounded p-2"
        onClick={currentUser ? handleLogout : toggleLoginModal}
      >
        <LuUserCircle size={24} />
        <span>{currentUser ? currentUser.username : "Guest User"}</span>
      </div>

      {isLoginModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded shadow-lg relative">
            <button
              onClick={toggleLoginModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              <IoIosCloseCircle size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">
              {isLogin ? "Login" : "Register"}
            </h2>
            {isLogin ? (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full mb-4"
                />
                <button
                  onClick={handleLogin}
                  className="bg-red-600 text-white py-2 px-4 rounded"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full mb-4"
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full mb-4"
                />
                <button
                  onClick={handleRegister}
                  className="bg-red-600 text-white py-2 px-4 rounded"
                >
                  Register
                </button>
              </>
            )}
            <button onClick={toggleForm} className="text-red-600 mx-4">
              {isLogin
                ? "Need an account? Register"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
