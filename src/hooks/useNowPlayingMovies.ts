import { useQuery } from "@tanstack/react-query";
import { moviesApi, type MovieListParams } from "../api/movies";


export function useNowPlayingMovies(params: MovieListParams = {}) {
	return useQuery(
		{
			queryKey: ['movies', 'now-playing', params],
			queryFn: () => moviesApi.nowPlaying(params)
		}
	)
}