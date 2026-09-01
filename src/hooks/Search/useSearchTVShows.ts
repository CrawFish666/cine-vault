import { useInfiniteQuery } from "@tanstack/react-query";
import { searchApi } from "../../api/seacrh";

export function useSearchTVShows(query: string) {
	return useInfiniteQuery({
		queryKey: ["search", "tv", query],
		queryFn: ({ pageParam }) =>
			searchApi.tv({
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