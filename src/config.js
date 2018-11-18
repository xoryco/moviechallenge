// TMDB URL strings - no https included for flexibiility
const API_URL = 'https://api.themoviedb.org/3/';
const MOVIE_POSTER_URL ='//image.tmdb.org/t/p/';

// TMDB API settings
const API_KEY = '61dd36a35a1160d03e125afaedfb6980';

// Movie Poster is taken from URL in this format 
// MOVIE_POSTER_URL/t/p/POSTER_SIZE/file-path
//https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg


// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500'

export {
  API_URL,
  MOVIE_POSTER_URL,
  API_KEY,
  POSTER_SIZE
}