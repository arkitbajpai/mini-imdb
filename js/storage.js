// Favourites persistence using localStorage (survives refresh / closing the browser).
const FAV_STORAGE_KEY = "cinefind_favourites";

/** Returns the array of favourite movie objects. */
function getFavourites() {
  try {
    return JSON.parse(localStorage.getItem(FAV_STORAGE_KEY)) || [];
  } catch (error) {
    return []; // corrupted data: start fresh
  }
}

function saveFavourites(favourites) {
  localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favourites));
}

function isFavourite(imdbID) {
  return getFavourites().some((movie) => movie.imdbID === imdbID);
}

/** Adds the movie if missing, removes it if present. Returns true if it is now a favourite. */
function toggleFavourite(movie) {
  const favourites = getFavourites();
  const index = favourites.findIndex((item) => item.imdbID === movie.imdbID);

  if (index === -1) {
    // Store only what the cards need.
    favourites.push({
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Type: movie.Type,
      Poster: movie.Poster,
    });
  } else {
    favourites.splice(index, 1);
  }

  saveFavourites(favourites);
  return index === -1;
}
