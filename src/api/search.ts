import { type Movie, type MultiSearchResult, type Paginated, type Person, type TVShow } from "../types/tmdb";
import { tmdbClient } from "./client";

export interface MultiSearchParams {
	query: string;
	include_adult?: boolean;
	language?: string;
	page?: number;
}

export const searchApi = {
	multi: ({
		query,
		include_adult = false,
		language = "ru-RU",
		page = 1,
	}: MultiSearchParams) =>
		tmdbClient
			.get<Paginated<MultiSearchResult>>("/search/multi", {
				params: {
					query,
					include_adult,
					language,
					page,
				},
			}).then(res => res.data),
	movie: ({
		query,
		include_adult = false,
		language = "ru-RU",
		page = 1,
	}: MultiSearchParams) =>
		tmdbClient.get<Paginated<Movie>>("/search/movie", { params: { query, include_adult, language, page } }).
			then(res => res.data),
	tv: ({
		query,
		include_adult = false,
		language = "ru-RU",
		page = 1,
	}: MultiSearchParams) => tmdbClient.get<Paginated<TVShow>>("/search/tv", { params: { query, include_adult, language, page } }).then(res => res.data),
	person: ({
		query,
		include_adult = false,
		language = "ru-RU",
		page = 1,
	}: MultiSearchParams) => tmdbClient.get<Paginated<Person>>("/search/person", { params: { query, include_adult, language, page } }).then(res => res.data),

};