// Favourites page: lists saved movies, each with a remove button.

const favResults = document.getElementById("results");
const favStatus = document.getElementById("status");

/** Removes the movie from storage and from the screen (no page reload needed). */
function handleRemove(movie, button) {
  toggleFavourite(movie); // it is already a favourite, so this removes it
  button.closest(".col-12").remove();
  updateFavCount();
  renderEmptyMessage();
}

function renderEmptyMessage() {
  const count = getFavourites().length;
  favStatus.innerHTML = "";
  if (count === 0) {
    favStatus.append("You haven't added any favourites yet. ");
    const link = document.createElement("a");
    link.href = "index.html";
    link.textContent = "Search for a movie";
    favStatus.append(link, " and tap “Add to favourites”.");
  } else {
    favStatus.textContent = `${count} saved ${count === 1 ? "movie" : "movies"}`;
  }
}

function renderFavourites() {
  getFavourites().forEach((movie) => favResults.append(createMovieCard(movie, handleRemove)));
  updateFavCount();
  renderEmptyMessage();
}

renderFavourites();
