const API_KEY = 'f9f8d231a4ae3a7cf18f7b54467801d1';

const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

const getTrending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
    res.json()
  );

const getUpcoming = () =>
  fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=1&region=KR`).then(
    (res) => res.json()
  );

const getNowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=1&region=KR`
  ).then((res) => res.json());

export const moviesAPI = { getTrending, getUpcoming, getNowPlaying };
