import { useInfiniteQuery } from "@tanstack/react-query";
import { tvshowsApi, type OnTheAirTVShowsParams } from "../../api/tvshows";
import { getUserTimezone } from "../../utils/timezone";


export function useOnTheAirTVShows({ language = "ru-RU", timezone = getUserTimezone() }: OnTheAirTVShowsParams = {}) {
	return useInfiniteQuery({
		initialPageParam: 1,
		queryKey: ["tvshows", "on-the-air", language, timezone],
		queryFn: ({ pageParam }) => tvshowsApi.onTheAir({ language, timezone, page: pageParam }),
		getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
	})
}