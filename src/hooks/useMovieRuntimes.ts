import { useQueries } from "@tanstack/react-query";
import { moviesApi } from "../api/movies";
import type { Movie, MovieRuntime } from "../types/tmdb";


export function useMovieRuntimes(movies: Movie[], visibleIndexes: Set<number>) {
	return useQueries({
		queries: movies.map((movie, index) => ({
			queryKey: ["movies", "runtime", movie.id],
			queryFn: () => moviesApi.movieRuntime(movie.id),
			select: (data: MovieRuntime) => data.runtime,
			staleTime: Infinity,
			enabled: visibleIndexes.has(index)
		})),
	});
}