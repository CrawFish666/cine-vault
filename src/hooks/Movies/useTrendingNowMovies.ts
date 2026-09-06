import { useInfiniteQuery,  } from "@tanstack/react-query";
import { moviesApi, type TrendingNowParams } from "../../api/movies";


export function useTrendingNowMovies({ language = "ru-RU", time_window = "day" }: TrendingNowParams = {}) {
	return useInfiniteQuery({
		queryKey: ["movies", "trending-now", time_window, language],
		queryFn: ({ pageParam }) => moviesApi.trendingNow({
			language,
			time_window,
			page: pageParam
		}),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
	})
}