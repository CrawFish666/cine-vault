import { useQuery } from "@tanstack/react-query";
import { moviesApi, type MovieListParams } from "../api/movies";


export function useUpcomingMovies(params: MovieListParams = {}) {
	return useQuery(
		{
			queryKey: ['movies', 'upcoming', params],
			queryFn: () => moviesApi.upcoming(params),
			staleTime: 1000 * 60 * 60, // "скоро в кино" меняется редко — час нормально
		}
	)
}