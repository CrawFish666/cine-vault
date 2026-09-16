import { useInfiniteQuery } from "@tanstack/react-query";
import { peopleApi, type PopularPeopleParams } from "../../api/people";



export function usePopularPeople({ language = "ru-RU" }: PopularPeopleParams = {}) {
	return useInfiniteQuery({
		initialPageParam: 1,
		queryKey: ["people", "popular", language],
		queryFn: ({ pageParam }) => peopleApi.popular(({ language, page: pageParam })),
		getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
	})
}