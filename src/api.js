import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: 'f9f8d231a4ae3a7cf18f7b54467801d1',
    language: 'en-US',
  },
});

export const movieApi = {
  nowPlaying: () => api.get('movie/now_playing'),
  upcoming: () => api.get('movie/upcoming'),
  popular: () => api.get('movie/popular'),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  search: (term) =>
    api.get('serach/movie', {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

export const tvApi = {
  topRated: () => api.get('tv/popular'),
  popular: () => api.get('tv/popualr'),
  airingToday: () => api.get('tv/airing_today'),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
    search: (term) =>
    api.get('serach/tv', {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};
