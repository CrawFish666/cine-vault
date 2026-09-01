import { useInfiniteQuery } from "@tanstack/react-query";
import { peopleApi, type TrendingPeopleParams } from "../../api/people";

export function useTrendingPeople({ language = "ru-RU", time_window = "day" }: TrendingPeopleParams = {}) {
	return useInfiniteQuery({
		initialPageParam: 1,
		queryKey: ["people", "trending", time_window, language],
		queryFn: ({ pageParam }) => peopleApi.trending({ language, time_window, page: pageParam }),
		getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
	})
}