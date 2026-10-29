// Home page: live search + favourite toggling.

const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");
const statusText = document.getElementById("status");
const loadMoreButton = document.getElementById("load-more");

let currentQuery = "";
let currentPage = 1;
let loadedCount = 0;
let debounceTimer;
let latestRequestId = 0; // used to ignore outdated responses

/** Favourite button handler for search results. */
function handleFavClick(movie, button) {
  const nowFavourite = toggleFavourite(movie);
  setFavButtonState(button, nowFavourite);
  updateFavCount();
}

/** Runs a search. When `append` is true, results are added to the existing list. */
async function runSearch(query, page = 1, append = false) {
  const requestId = ++latestRequestId;
  statusText.textContent = "Searching…";

  try {
    const { movies, total } = await searchMovies(query, page);
    if (requestId !== latestRequestId) return; // a newer search started; drop this one

    if (!append) {
      resultsContainer.innerHTML = "";
      loadedCount = 0;
    }
    movies.forEach((movie) => resultsContainer.append(createMovieCard(movie, handleFavClick)));

    loadedCount += movies.length;
    statusText.textContent = `Showing ${loadedCount} of ${total} results for "${query}"`;
    loadMoreButton.classList.toggle("d-none", loadedCount >= total);
  } catch (error) {
    if (requestId !== latestRequestId) return;
    if (!append) resultsContainer.innerHTML = "";
    loadMoreButton.classList.add("d-none");
    statusText.textContent =
      error.message === "Movie not found!" ? `No movies found for "${query}".` : error.message;
  }
}

// Debounce: wait until the user pauses typing so we don't call the API on every key.
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  const query = searchInput.value.trim();

  if (query.length < 2) {
    latestRequestId++; // cancel anything in flight
    resultsContainer.innerHTML = "";
    loadMoreButton.classList.add("d-none");
    statusText.textContent = query ? "Keep typing…" : "";
    return;
  }

  debounceTimer = setTimeout(() => {
    currentQuery = query;
    currentPage = 1;
    runSearch(query, 1, false);
  }, SEARCH_DELAY_MS);
});

loadMoreButton.addEventListener("click", () => {
  currentPage++;
  runSearch(currentQuery, currentPage, true);
});

updateFavCount();
