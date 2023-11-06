const paprikaURL = "https://api.coinpaprika.com/v1";
const historyURL = "https://ohlcv-api.nomadcoders.workers.dev";

const TMDB_API_KEY = "ff60f073259513a99c48e8293fae4fa6";
const TMDB_BASE_URL = "https://api.themoviedb.org/3/";

export async function getCoinList() {
  return await (await fetch(`${paprikaURL}/coins`)).json();
}

export async function getCoinInfo(coinID: string) {
  return await (await fetch(`${paprikaURL}/coins/${coinID}`)).json();
}

export async function getCoinPriceInfo(coinID: string) {
  return await (await fetch(`${paprikaURL}/tickers/${coinID}`)).json();
}

export async function getCoinHistory(coinID: string) {
  return await (await fetch(`${historyURL}/?coinId=${coinID}`)).json();
}

export interface IData {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
}

export interface IMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}

export interface ITvs {
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}

// movies
export async function getNowPlaying() {
  return await (
    await fetch(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`)
  ).json();
}
export async function getTopRatedMovie() {
  return await (
    await fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`)
  ).json();
}
export async function getupComing() {
  return await (
    await fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`)
  ).json();
}

// tv-series
export async function getOnAir() {
  return await (
    await fetch(`${TMDB_BASE_URL}/tv/on_the_air?api_key=${TMDB_API_KEY}`)
  ).json();
}
export async function getToday() {
  return await (
    await fetch(`${TMDB_BASE_URL}/tv/airing_today?api_key=${TMDB_API_KEY}`)
  ).json();
}
export async function getPopular() {
  return await (
    await fetch(`${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`)
  ).json();
}
export async function getTopRatedTv() {
  return await (
    await fetch(`${TMDB_BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}`)
  ).json();
}

// search
export async function getSearchMovie(keyword: string) {
  return await (
    await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${keyword}`
    )
  ).json();
}
export async function getSearchTv(keyword: string) {
  return await (
    await fetch(
      `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${keyword}`
    )
  ).json();
}
