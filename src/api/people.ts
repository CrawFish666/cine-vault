import {
	type Person,
	type Paginated,
	type TrendingPerson,
} from "../types/tmdb";

import { tmdbClient } from "./client";

export interface PageParam {
	page?: number;
}

export interface LanguageParam {
	language?: string;
}

export interface TimeWindowParam {
	time_window?: "day" | "week";
}

export interface PopularPeopleParams
	extends LanguageParam, PageParam { };

export interface TrendingPeopleParams
	extends TimeWindowParam, LanguageParam, PageParam { };


export const peopleApi = {
	popular: ({ language = "ru-RU", page = 1 }: PopularPeopleParams = {}) =>
		tmdbClient
			.get<Paginated<Person>>("/person/popular", {
				params: {
					language,
					page
				}
			}).then(res => res.data),
	trending: ({ language = "ru-RU", page = 1, time_window = "day" }: TrendingPeopleParams) =>
		tmdbClient
			.get<Paginated<TrendingPerson>>(`/trending/person/${time_window}`, { params: { language, page } })
			.then(res => res.data)
}