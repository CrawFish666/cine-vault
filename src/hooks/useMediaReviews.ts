import { useInfiniteQuery } from "@tanstack/react-query";
import { mediaApi, type MediaReviewsParams } from "../api/media";

type UseMediaReviewsParams = Omit<MediaReviewsParams, "page">;


export function useMediaReviews({ id, language = "ru-RU", mediaType }: UseMediaReviewsParams) {
	return useInfiniteQuery({
		queryKey: ["media", "reviews", mediaType, id, language],
		queryFn: ({ pageParam }) => mediaApi.reviews({ id, mediaType, language, page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		enabled: !!id
	})
}