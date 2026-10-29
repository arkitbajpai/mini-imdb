// Movie details page: reads ?id=tt1234567 from the URL and renders full info.

const movieSection = document.getElementById("movie");
const movieStatus = document.getElementById("status");

/** Small helper: creates an element with optional class and text. */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/** Builds the <dl> of extra facts, skipping anything OMDb marks as "N/A". */
function buildFacts(movie) {
  const facts = [
    ["Genre", movie.Genre], ["Director", movie.Director], ["Writer", movie.Writer],
    ["Cast", movie.Actors], ["Released", movie.Released], ["Runtime", movie.Runtime],
    ["Language", movie.Language], ["Country", movie.Country], ["Awards", movie.Awards],
  ];
  const list = el("dl", "facts");
  facts.filter(([, value]) => value && value !== "N/A").forEach(([label, value]) => {
    list.append(el("dt", "", label), el("dd", "", value));
  });
  return list;
}

function renderMovie(movie) {
  document.title = `CineFind | ${movie.Title}`;

  // Left column: poster
  const posterCol = el("div", "col-12 col-md-4");
  const poster = el("img", "poster");
  poster.src = posterOrPlaceholder(movie.Poster);
  poster.alt = `Poster of ${movie.Title}`;
  posterCol.append(poster);

  // Right column: details
  const infoCol = el("div", "col-12 col-md-8");
  infoCol.append(el("h1", "movie-title", `${movie.Title} (${movie.Year})`));

  const badges = el("div");
  if (movie.imdbRating !== "N/A") badges.append(el("span", "rating-badge", `★ ${movie.imdbRating} IMDb`));
  if (movie.Rated !== "N/A") badges.append(el("span", "rating-badge", movie.Rated));
  infoCol.append(badges);

  infoCol.append(el("p", "plot", movie.Plot !== "N/A" ? movie.Plot : "No plot available."));
  infoCol.append(buildFacts(movie));

  const favButton = el("button", "btn-fav");
  favButton.type = "button";
  setFavButtonState(favButton, isFavourite(movie.imdbID));
  favButton.addEventListener("click", () => {
    setFavButtonState(favButton, toggleFavourite(movie));
    updateFavCount();
  });
  infoCol.append(favButton);

  movieSection.append(posterCol, infoCol);
}

async function init() {
  updateFavCount();
  const movieId = new URLSearchParams(window.location.search).get("id");

  if (!movieId) {
    movieStatus.textContent = "No movie selected. Go back and pick one.";
    return;
  }

  try {
    renderMovie(await getMovieDetails(movieId));
    movieStatus.textContent = "";
  } catch (error) {
    movieStatus.textContent = error.message;
  }
}

init();
