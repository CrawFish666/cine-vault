import { useInfiniteQuery } from "@tanstack/react-query";
import { tvshowsApi, type TrendingNowTVShowsParams } from "../../api/tvshows";


export function useTrendingNowTVShows({ language = "ru-RU", page = 1, time_window = "day" }: TrendingNowTVShowsParams = {}) {
	return useInfiniteQuery({
		queryKey: ["tv-shows", "trending-now", language, time_window],
		queryFn: ({ pageParam }) => tvshowsApi.trendingNow({ language, time_window, page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined

	})
}