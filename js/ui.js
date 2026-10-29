// Shared UI helpers used by more than one page.

const NO_POSTER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="440"><rect width="100%" height="100%" fill="#cfd6e6"/>' +
    '<text x="50%" y="50%" fill="#5a6286" font-family="sans-serif" font-size="20" text-anchor="middle">No poster</text></svg>'
  );

/** OMDb returns the string "N/A" for missing data; fall back to a placeholder. */
function posterOrPlaceholder(poster) {
  return poster && poster !== "N/A" ? poster : NO_POSTER;
}

/** Updates the favourites counter in the navbar. */
function updateFavCount() {
  document.getElementById("fav-count").textContent = getFavourites().length;
}

/** Sets the button's look/text depending on favourite state. */
function setFavButtonState(button, isFav, removeLabel = "Remove from favourites") {
  button.classList.toggle("is-fav", isFav);
  button.textContent = isFav ? removeLabel : "Add to favourites";
  button.setAttribute("aria-pressed", String(isFav));
}

/**
 * Builds one ticket-style movie card.
 * @param {Object} movie - {imdbID, Title, Year, Type, Poster}
 * @param {Function} onFavClick - called with (movie, button) when the button is clicked
 */
function createMovieCard(movie, onFavClick) {
  const column = document.createElement("div");
  column.className = "col-12 col-md-6 col-xl-4";

  const card = document.createElement("article");
  card.className = "ticket";
  card.tabIndex = 0;

  const poster = document.createElement("img");
  poster.src = posterOrPlaceholder(movie.Poster);
  poster.alt = `Poster of ${movie.Title}`;
  poster.loading = "lazy";

  const body = document.createElement("div");
  body.className = "ticket-body";

  // textContent (not innerHTML) keeps API data from injecting HTML.
  const title = document.createElement("h2");
  title.className = "ticket-title";
  title.textContent = movie.Title;

  const meta = document.createElement("div");
  meta.className = "ticket-meta";
  meta.textContent = `${movie.Year} • ${movie.Type}`;

  const favButton = document.createElement("button");
  favButton.className = "btn-fav";
  favButton.type = "button";
  setFavButtonState(favButton, isFavourite(movie.imdbID));

  favButton.addEventListener("click", (event) => {
    event.stopPropagation(); // don't trigger the card's "open movie page"
    onFavClick(movie, favButton);
  });

  // Clicking anywhere else on the card opens the movie page.
  const openMovie = () => (window.location.href = `movie.html?id=${movie.imdbID}`);
  card.addEventListener("click", openMovie);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target === card) openMovie();
  });

  body.append(title, meta, favButton);
  card.append(poster, body);
  column.append(card);
  return column;
}
