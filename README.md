# CineFind – Mini IMDb Clone

A small movie search app built with **vanilla JavaScript** (no JS libraries/frameworks) and the [OMDb API](https://www.omdbapi.com/). Bootstrap CSS is used for the grid and form styling.

🔗 **Live demo:** https://arkitbajpai.github.io/mini-imdb/index.html


## Features
- **Live search** – results update as you type (debounced to avoid spamming the API), with a "Load more" button for extra pages.
- **Favourites** – add/remove from any card; stored in `localStorage`, so they persist after refresh or closing the browser.
- **Movie page** – poster, title, plot, IMDb rating, genre, cast, director, runtime, awards, and more.
- **My favourites page** – all saved movies with a remove button.

## Project structure
```
mini-imdb/
├── index.html          # Home: search + results
├── movie.html          # Movie details page (?id=imdbID)
├── favourites.html     # My favourite movies
├── css/style.css       # Custom styling (ticket-stub design)
└── js/
    ├── config.js       # API key + constants
    ├── api.js          # OMDb requests
    ├── storage.js      # localStorage favourites logic
    ├── ui.js           # Shared UI helpers (movie card, buttons)
    ├── home.js         # Home page logic
    ├── movie.js        # Movie page logic
    └── favourites.js   # Favourites page logic
```


## Tech
HTML5, CSS3, Bootstrap 5 (CSS only), vanilla JavaScript (fetch, async/await, localStorage, URLSearchParams).
