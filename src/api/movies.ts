import { type Movie, 
	type Paginated, 
	type DatedMovieResponse, 
	type GenresListResponse, type TrendingNowMovie, type MovieRuntime, type MovieDetails, 
	type MediaReview} from "../types/tmdb";
import { tmdbClient } from "./client";

export interface MovieListParams {
	page?: number;
	language?: string;
	region?: string;
}

export interface MustWatchParams extends MovieListParams {
	yearsBack?: number;
}

export interface GenresMovieListParams {
	language?: string;
}

export interface TrendingNowParams extends MovieListParams {
	time_window?: "day" | "week";
	// language?: string;
}

function getMustWatchDateFrom(yearsBack: number): string {
	const year = new Date().getFullYear() - yearsBack;
	return `${year}-01-01`;
}

export interface MovieDetailsParams {
	id: number;
	language?: string;
	append_to_response?: string;
}

export interface MovieReviewsParams {
	id: number;
	language?: string;
	page?: number;
}

// MovieListParams = {} сделан для того, чтобы можно было вообще ничего не передавать в функцию при вызове.
// Т.е. передасться пустой объект {} для деструктуризации.
// Без этого если ничего не передать, то будет попытка деструктуризировать undefined
export const moviesApi = {
	nowPlaying: ({ page = 1, language = "ru-RU", region = "RU" }: MovieListParams = {}) =>
		tmdbClient
			.get<DatedMovieResponse>("/movie/now_playing", { params: { page, language, region } })
			.then(res => res.data),
	upcoming: ({ page = 1, language = "ru-RU", region = "RU" }: MovieListParams = {}) =>
		tmdbClient
			.get<DatedMovieResponse>("/movie/upcoming", { params: { page, language, region } })
			.then(res => res.data),
	mustWatch: ({ page = 1, language = "ru-RU", region = "RU", yearsBack = 4 }: MustWatchParams = {}) =>
		tmdbClient
			.get<Paginated<Movie>>("/discover/movie", {
				params: {
					language,
					page,
					region,
					sort_by: "vote_average.desc",
					"primary_release_date.gte": getMustWatchDateFrom(yearsBack),
					"vote_average.gte": 8,
					"vote_count.gte": 1000
				}
			}).then(res => res.data),
	movieRuntime: (id: number, language = "ru-RU") =>
		tmdbClient.
			get<MovieRuntime>(`/movie/${id}`, { params: { language } })
			.then(res => res.data),
	genresMovieList: ({ language = "RU" }: GenresMovieListParams = {}) =>
		tmdbClient
			.get<GenresListResponse>("/genre/movie/list", { params: { language } })
			.then(resp => resp.data.genres),
	genrePreview: (genreId: number, language = "ru-RU") =>
		tmdbClient
			.get<Paginated<Movie>>("/discover/movie", { params: { with_genres: genreId, sort_by: "popularity.desc", language } })
			.then(res => res.data),
	trendingNow: ({ language = "ru-RU", time_window = "day", page = 1 }: TrendingNowParams = {}) =>
		tmdbClient
			.get<Paginated<TrendingNowMovie>>(`/trending/movie/${time_window}`, { params: { language, page } })
			.then(res => res.data),
	details: ({ id, language = "ru-RU", append_to_response }: MovieDetailsParams) =>
		tmdbClient
			.get<MovieDetails>(`movie/${id}`, {
				params: {
					language,
					append_to_response
				}
			})
			.then(res => res.data),

			
}
