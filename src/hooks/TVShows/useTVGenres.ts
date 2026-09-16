import { useQuery } from "@tanstack/react-query";
import { tvshowsApi, type GenresTVListParams } from "../../api/tvshows";

export function useTVGenres({ language = "ru-RU" }: GenresTVListParams = {}) {
	return useQuery({
		queryKey: ["tvshows", "genres", language],
		queryFn: () => tvshowsApi.getGenres({ language }),
		staleTime: 1000 * 60 * 60 * 24, // 24 часа

	});
}
