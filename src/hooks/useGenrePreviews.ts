import { useQueries } from "@tanstack/react-query";
import type { Genre, Movie, Paginated } from "../types/tmdb";
import { moviesApi } from "../api/movies";



export function useGenrePreviews(genres: Genre[], visibleIndexes: Set<number>) {
	return useQueries({
		queries: genres.map((genre, index) => ({
			queryKey: ["movies", "genre-preview", genre.id],
			queryFn: () => moviesApi.genrePreview(genre.id),
			enabled: visibleIndexes.has(index),
			staleTime: 1000 * 60 * 60 * 12,
			select: (data: Paginated<Movie>) => data.results.filter((movie) => movie.poster_path !== null).slice(0, 4)
		}))
	})
}