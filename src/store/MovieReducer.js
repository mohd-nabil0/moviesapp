import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchMovies} from '../netwrok/Api';

//async actions
const getMovies = createAsyncThunk(
  'getMovies',
  async ({page, languageCode, languageChange}) => {
    const result = await fetchMovies(languageChange ? 1 : page, languageCode);
    return {...result, languageChange};
  },
);

//slice
const slice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    error: '',
    page: 1,
    totalPages: 0,
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMovies.pending, (state, action) => {
      state.error = '';
      state.loading = true;
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      const {result, error, languageChange} = action.payload;

      if (error) return (state.error = error);

      const _m = result?.results || [];
      if (languageChange) {
        state.movies = _m;
        state.page = 2;
      } else {
        state.movies = [...state.movies, ..._m];
        state.page = state.page + 1;
      }
      state.totalPages = result?.total_pages || state.page;
      state.loading = false;
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error || 'Error fetching movies';
    });
  },
});

//export
export const {} = slice.actions;
export {getMovies};
export default slice.reducer;
