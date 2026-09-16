import { useQuery } from "@tanstack/react-query";
import { tvshowsApi } from "../../api/tvshows";

export function useTvShowDetails(id: number) {
	return useQuery({
		queryKey: ["tvshows", "details", id],
		queryFn: () => tvshowsApi.details(id, { language: "ru-RU", append_to_response: "aggregate_credits,videos,external_ids" }),
		enabled: !!id
	})
}