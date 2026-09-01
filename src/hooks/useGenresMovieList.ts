import { useQuery } from "@tanstack/react-query";
import { moviesApi, type GenresMovieListParams } from "../api/movies";

export function useGenresMovieList(params: GenresMovieListParams = {}) {
	return useQuery({
		queryKey: ['movies', 'genres', params],
		queryFn: () => moviesApi.genresMovieList(params),
		staleTime: 1000 * 60 * 60 * 24,
	})
}