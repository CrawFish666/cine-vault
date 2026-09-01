import { useInfiniteQuery } from "@tanstack/react-query";
import { tvshowsApi, type MustWatchTVShowsParams } from "../../api/tvshows";
import { getUserTimezone } from "../../utils/timezone";

export function useMustWatchTVShows({ language = "ru-RU", timezone = getUserTimezone() }: MustWatchTVShowsParams = {}) {
	return useInfiniteQuery({
		initialPageParam: 1,
		queryKey: ["tv-shows", "must-watch", language, timezone],
		queryFn: ({ pageParam }) => tvshowsApi.mustWatch({ language, timezone, page: pageParam }),
		getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
	})
}