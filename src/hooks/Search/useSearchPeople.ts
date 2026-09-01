import { useInfiniteQuery } from "@tanstack/react-query";
import { searchApi } from "../../api/seacrh";

export function useSearchPeople(query: string) {
	return useInfiniteQuery({
		queryKey: ["search", "person", query],
		queryFn: ({ pageParam }) =>
			searchApi.person({
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