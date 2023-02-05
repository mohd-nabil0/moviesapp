// Define a default export as an asynchronous function named `request` that takes two parameters, `url` and `method`, with an optional `headers` parameter.
export default async (url, method = 'GET', headers = {}) => {
  try {
    // Use the `fetch` function to make a request to the provided `url`.
    // Specify the `method` and set some options for the request.
    const response = await fetch(url, {
      method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    // Parse the response as JSON and assign it to `result`.
    const result = await response.json();

    // Return an object with `result` and `error` properties.
    // If there was no error, `error` will be `undefined`.
    return {result, error: undefined};
  } catch (error) {
    // If there was an error, log it to the console and return an object with `error` and `result` properties.
    // If there was no result, `result` will be `undefined`.
    console.log(error);
    return {error, result: undefined};
  }
};
