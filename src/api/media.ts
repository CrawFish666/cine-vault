import {
	type MediaReview,
	type Paginated
} from "../types/tmdb";
import { tmdbClient } from "./client";


export interface MediaReviewsParams {
	id: number;
	language?: string;
	mediaType: "movie" | "tv";
	page?: number;
}

// MovieListParams = {} сделан для того, чтобы можно было вообще ничего не передавать в функцию при вызове.
// Т.е. передасться пустой объект {} для деструктуризации.
// Без этого если ничего не передать, то будет попытка деструктуризировать undefined
export const mediaApi = {
	reviews: ({ id, language = "ru-RU", page = 1, mediaType }: MediaReviewsParams) =>
		tmdbClient.get<Paginated<MediaReview>>(`/${mediaType}/${id}/reviews`, {
			params: {
				language,
				page
			}
		}).then(res => res.data),
}
