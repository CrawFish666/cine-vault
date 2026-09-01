import { useInfiniteQuery } from "@tanstack/react-query";
import { searchApi } from "../../api/seacrh";

export function useSearchMovies(query: string) {
	return useInfiniteQuery({
		queryKey: ["search", "movie", query],
		queryFn: ({ pageParam }) =>
			searchApi.movie({
				query,
				page: pageParam,
			}),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.total_pages
				? lastPage.page + 1
				: undefined,
		enabled: query.trim().length > 0,
	});
}