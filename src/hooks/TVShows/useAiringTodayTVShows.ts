import { useInfiniteQuery } from "@tanstack/react-query";
import { tvshowsApi, type AiringTodayTVShowsParams } from "../../api/tvshows";
import { getUserTimezone } from "../../utils/timezone";


export function useAiringTodayTVShows({ language = "ru-RU", timezone = getUserTimezone() }: AiringTodayTVShowsParams = {}) {
	return (
		useInfiniteQuery({
			queryKey: ["tv-shows", "airing-today", language, timezone],
			queryFn: ({ pageParam }) => tvshowsApi.airingToday({
				language,
				timezone,
				page: pageParam
			}),
			initialPageParam: 1,
			getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
		})
	)
}