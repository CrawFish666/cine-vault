import { useQueries } from "@tanstack/react-query";
import type { TVShow } from "../../types/tmdb";
import { tvshowsApi } from "../../api/tvshows";


export function useTVShowCardDetails(tvShows: TVShow[], visibleIndexes: Set<number>) {
	return useQueries({
		queries: tvShows.map((show, index) => ({
			queryKey: ["tvshows", "card-details", show.id],
			queryFn: () => tvshowsApi.details(show.id),
			// select: (data: TVShowDetails) => data.number_of_seasons,
			staleTime: Infinity,
			enabled: visibleIndexes.has(index)
		})),
	});
}