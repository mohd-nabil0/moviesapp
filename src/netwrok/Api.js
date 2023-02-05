import request from './Request';

// `moviesApi` that takes two parameters, `page` and `language`.
export const moviesApi = (page, language) =>
  // Return a string that is a URL to the MovieDB API endpoint for popular movies,
  // using the `page` and `language` parameters in the URL.
  `https://api.themoviedb.org/3/movie/popular?api_key=b2cdf80c3ef444a46c0174d969e76e32&language=${language}&page=${page}`;

//`imageApi` that takes one parameter, `posterPath`.
export const imageApi = posterPath =>
  // Return a string that is a URL to the MovieDB API endpoint for retrieving an original poster image,
  // using the `posterPath` parameter in the URL.
  `https://image.tmdb.org/t/p/original${posterPath}`;

//`fetchMovies` that takes two parameters, `page` and `language`.
export const fetchMovies = async (page, language) => {
  // Call the `request` function with the result of calling `moviesApi` with `page` and `language` as arguments.
  // Assign the destructured object to `result` and `error`.
  const {result, error} = await request(moviesApi(page, language));

  // Return an object with properties `result` and `error`.
  return {result, error};
};
