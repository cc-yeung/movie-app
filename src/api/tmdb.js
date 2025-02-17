import axios from "axios";
import { TMDB_API_KEY } from "@env";

const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: "en-US",
  },
});

export const getMovies = (category) => api.get(`/movie/${category}`);
export const getTVShows = (category) => api.get(`/tv/${category}`);
export const searchMedia = (query, type) => api.get(`/search/${type}`, { params: { query } });
export const getDetails = (id, type) => api.get(`/${type}/${id}`);

export default api;