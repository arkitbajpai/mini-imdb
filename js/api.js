// All communication with the OMDb API lives here.

/**
 * Searches movies by title.
 * @returns {Promise<{movies: Array, total: number}>}
 * @throws {Error} with a user-friendly message
 */
async function searchMovies(query, page = 1) {
  const url = `${API_BASE_URL}?apikey=${API_KEY}&type=movie&s=${encodeURIComponent(query)}&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Something went wrong.");
  }
  return { movies: data.Search, total: Number(data.totalResults) };
}

/** Fetches full details (with long plot) for one movie by its IMDb id. */
async function getMovieDetails(imdbID) {
  const url = `${API_BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found.");
  }
  return data;
}
