import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { moviesApi, type MustWatchParams } from "../api/movies";


// Делаем пагинацию через tanstack query
// В передаваемых параметрах исключим пока что возможность передачи page
export function useMustWatchMovies(params: Omit<MustWatchParams, "page"> = {}) {
	return useInfiniteQuery({
		queryKey: ["movies", "must-watch", params],
		queryFn: ({ pageParam }) => moviesApi.mustWatch({ ...params, page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		staleTime: 1000 * 60 * 60 * 24,

	})
}