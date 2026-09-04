import { type TVShow, type Paginated, type TrendingNowTVShows, type GenresListResponse, type TVShowDetails, type TVShowSeasonDetails } from "../types/tmdb";
import { getUserTimezone } from "../utils/timezone";
import { tmdbClient } from "./client";

export interface PageParam {
	page?: number;
}

export interface LanguageParam {
	language?: string;
}

export interface RegionParam {
	region?: string;
}

export interface TimeWindowParam {
	time_window?: "day" | "week";
}

export interface TimezoneParam {
	timezone?: string;
}

export interface TrendingNowTVShowsParams extends TimeWindowParam, LanguageParam, PageParam { };
export interface AiringTodayTVShowsParams extends LanguageParam, TimezoneParam { };
export interface AiringTodayTVShowsRequest extends AiringTodayTVShowsParams, PageParam { };
export interface MustWatchTVShowsParams extends LanguageParam, TimezoneParam { };
export interface MustWatchTVShowsRequest extends MustWatchTVShowsParams, PageParam { };
export interface GenresTVListParams extends LanguageParam { };
export interface OnTheAirTVShowsParams extends LanguageParam, TimezoneParam { };
export interface OnTheAirTVShowsRequest extends OnTheAirTVShowsParams, PageParam { };
export interface DetailsParams extends LanguageParam {
	append_to_response?: string;
}

export interface TVSeasonDetailsParams {
	seriesId: number;
	seasonNumber: number;
	language?: string;
	append_to_response?: string;
}

export const tvshowsApi = {
	trendingNow: ({ language = "ru-RU", time_window = "day", page = 1 }: TrendingNowTVShowsParams = {}) =>
		tmdbClient.
			get<Paginated<TrendingNowTVShows>>(`/trending/tv/${time_window}`, { params: { language, page } })
			.then(res => res.data),
	airingToday: ({ language = "ru-RU", page = 1, timezone = getUserTimezone() }: AiringTodayTVShowsRequest = {}) =>
		tmdbClient
			.get<Paginated<TVShow>>(`/tv/airing_today`, { params: { language, page, timezone } })
			.then(res => res.data),
	mustWatch: ({ language = "ru-RU", page = 1, timezone = getUserTimezone() }: MustWatchTVShowsRequest = {}) =>
		tmdbClient.get<Paginated<TVShow>>("/discover/tv", {
			params: {
				language,
				page,
				timezone,
				include_adult: false,
				include_null_first_air_dates: false,
				sort_by: "vote_average.desc",
				"vote_average.gte": 8,
				"vote_count.gte": 500
			}
		})
			.then(res => res.data),
	getGenres: ({ language = "ru-RU" }: GenresTVListParams = {}) =>
		tmdbClient
			.get<GenresListResponse>("/genre/tv/list", {
				params: {
					language
				}
			})
			.then(res => res.data.genres),
	genrePreview: (genreId: number) =>
		tmdbClient
			.get<Paginated<TVShow>>("/discover/tv", {
				params: {
					language: "ru-RU",
					with_genres: genreId,
					sort_by: "popularity.desc"
				}
			}).then(resp => resp.data),
	onTheAir: ({ language = "ru-RU", page = 1, timezone = getUserTimezone() }: OnTheAirTVShowsRequest = {}) =>
		tmdbClient.get<Paginated<TVShow>>("/tv/on_the_air", {
			params: {
				language,
				timezone,
				page
			}
		}).then(res => res.data),
	details: (id: number, { language = "ru-RU", append_to_response }: DetailsParams = {}) =>
		tmdbClient.get<TVShowDetails>(`/tv/${id}`, {
			params: {
				language,
				append_to_response
			}
		}).then(res => res.data),
	seasonDetails: ({ seriesId, seasonNumber, language = "ru-RU", append_to_response }: TVSeasonDetailsParams) =>
		tmdbClient.get<TVShowSeasonDetails>(`/tv/${seriesId}/season/${seasonNumber}`, {
			params: {
				language,
				append_to_response
			}
		}).then(res => res.data),
}