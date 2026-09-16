import { useInfiniteQuery } from "@tanstack/react-query";
import { searchApi } from "../../api/search";


export function useSearchMulti(query: string) {
	return useInfiniteQuery({
		queryKey: ["search", "multi", query],
		queryFn: ({ pageParam }) =>
			searchApi.multi({
				query,
				page: pageParam,
			}),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		enabled: query.trim().length > 0,
	});
}