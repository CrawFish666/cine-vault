import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../../api/movies";

export function useMovieDetails(id: number) {
	return useQuery({
		queryKey: ["movies", "details", id],
		queryFn: () => moviesApi.details({ id, language: "ru-RU", append_to_response: "credits,videos" }),
		enabled: !!id
	})
}