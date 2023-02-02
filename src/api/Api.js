export const moviesApi = (page, language) =>
  `https://api.themoviedb.org/3/movie/popular?api_key=b2cdf80c3ef444a46c0174d969e76e32&language=${language}&page=${page}`;

export const imageApi = posterPath =>
  `https://image.tmdb.org/t/p/original${posterPath}`;

export const fetchMovies = async (page, language) => {
  const {result, error} = await request(moviesApi(page, language));
  return {result, error};
};

const request = async (url, method = 'GET', headers = {}) => {
  try {
    const response = await fetch(url, {
      method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    const result = await response.json();
    return {result, error: undefined};
  } catch (error) {
    console.log(error);
    return {error, result: undefined};
  }
};
