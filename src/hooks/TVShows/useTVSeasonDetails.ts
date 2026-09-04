import { useQuery } from "@tanstack/react-query";
import { tvshowsApi, type TVSeasonDetailsParams } from "../../api/tvshows";

interface UseTVSeasonDetailsParams extends TVSeasonDetailsParams {
	enabled?: boolean;
}


export function useTVSeasonDetails({
	seasonNumber, language, seriesId, append_to_response, enabled = true
}: UseTVSeasonDetailsParams) {
	return (
		useQuery({
			queryKey: ["tvshows", "season-details", seriesId, seasonNumber],
			queryFn: () => tvshowsApi.seasonDetails({ seriesId, seasonNumber, language, append_to_response }),
			enabled: enabled
		})
	)
}