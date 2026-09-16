import { useQueries } from "@tanstack/react-query";
import { tvshowsApi } from "../../api/tvshows";
import type { Genre, Paginated, TVShow } from "../../types/tmdb";

export function useGenreTvShowsPreviews(genres: Genre[],	visibleIndexes: Set<number>) {
	return useQueries({
		queries: genres.map((genre, index) => ({
			queryKey: ["tvshows", "genre-preview", genre.id],
			queryFn: () => tvshowsApi.genrePreview(genre.id),
			enabled: visibleIndexes.has(index),
			// Можно через map вытащить еще show.posther_path и на страницу будет приходить сразу ссылки на фотки
			select: (data: Paginated<TVShow>) => data.results.filter((show) => show.poster_path !== null).slice(0, 4),
		})),
	});
}
