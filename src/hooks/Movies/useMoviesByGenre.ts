import { useInfiniteQuery } from "@tanstack/react-query";
import { moviesApi } from "../../api/movies";

export function useMoviesByGenre(genreId: number) {
	return useInfiniteQuery({
		queryKey: ["movies", "by-genre", genreId],
		queryFn: ({ pageParam }) =>
			moviesApi.byGenre({ genreId, page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.total_pages
				? lastPage.page + 1
				: undefined,
		enabled: Number.isFinite(genreId),
	});
}