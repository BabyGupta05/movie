import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  watchlists: {},
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      const { userId, movie } = action.payload;
      if (!state.watchlists[userId]) {
        state.watchlists[userId] = [];
      }
      state.watchlists[userId].push(movie);
    },
    removeMovie: (state, action) => {
      const { userId, movieId } = action.payload;
      state.watchlists[userId] = state.watchlists[userId].filter(
        (movie) => movie.imdbID !== movieId
      );
    },
  },
});

export const { addMovie, removeMovie } = watchlistSlice.actions;

export default watchlistSlice.reducer;
