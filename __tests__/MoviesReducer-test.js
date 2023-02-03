import moviesReducer, {getMovies} from '../src/store/MovieReducer';

describe('movies reducer', () => {
  it('handles the getMovies.pending action', () => {
    const initialState = {
      movies: [],
      error: '',
      page: 1,
      totalPages: 0,
      loading: false,
    };

    const nextState = moviesReducer(initialState, {
      type: getMovies.pending.type,
    });

    expect(nextState).toEqual({
      movies: [],
      error: '',
      page: 1,
      totalPages: 0,
      loading: true,
    });
  });

  it('handles the getMovies.fulfilled action', () => {
    const initialState = {
      movies: [],
      error: '',
      page: 1,
      totalPages: 0,
      loading: false,
    };

    const result = {
      results: [
        {id: 1, title: 'Movie 1'},
        {id: 2, title: 'Movie 2'},
      ],
      total_pages: 2,
    };

    const nextState = moviesReducer(initialState, {
      type: getMovies.fulfilled.type,
      payload: {result, languageChange: false},
    });

    expect(nextState).toEqual({
      movies: [
        {id: 1, title: 'Movie 1'},
        {id: 2, title: 'Movie 2'},
      ],
      error: '',
      page: 2,
      totalPages: 2,
      loading: false,
    });
  });

  it('handles the getMovies.rejected action', () => {
    const initialState = {
      movies: [],
      error: '',
      page: 1,
      totalPages: 0,
      loading: false,
    };

    const nextState = moviesReducer(initialState, {
      type: getMovies.rejected.type,
      payload: {error: 'Error fetching movies'},
    });

    expect(nextState).toEqual({
      movies: [],
      error: 'Error fetching movies',
      page: 1,
      totalPages: 0,
      loading: false,
    });
  });
});
