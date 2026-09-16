import { useInfiniteQuery } from "@tanstack/react-query";
import { tvshowsApi } from "../../api/tvshows";

export function useTvShowsByGenre(genreId: number) {
	return useInfiniteQuery({
		queryKey: ["tvshows", "by-genre", genreId],
		queryFn: ({ pageParam }) =>
			tvshowsApi.byGenre({ genreId, page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.total_pages
				? lastPage.page + 1
				: undefined,
		enabled: Number.isFinite(genreId),
	});
}