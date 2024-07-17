import { useState } from "react";
import { Search } from "./component/Search";
import { SideBar } from "./component/SideBar";
import { Watchlist } from "./component/Watchlist";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
function App() {
  const [watchlistName, setWatchlistName] = useState("Watchlist");
  return (
    <Provider store={store}>
      <Router>
        <div className="flex">
          <SideBar watchlistName={watchlistName} />
          <div className="flex-1">
            <Routes>
              0
              <Route path="/" element={<Search />} />
              <Route
                path="/watchlist"
                element={
                  <Watchlist
                    watchlistName={watchlistName}
                    onUpdateWatchlistName={setWatchlistName}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
