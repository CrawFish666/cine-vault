import type { EmblaCarouselType } from "embla-carousel";
import { useEffect } from "react";

interface UseInfiniteScrollTriggerParams {
	emblaApi: EmblaCarouselType | undefined;
	// itemsCount: number;
	hasNextPage: boolean | undefined;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
	screensAhead?: number; // за сколько "экранов" до конца начинать подгрузку
}

export function useInfiniteScrollTrigger({
	emblaApi,
	// itemsCount,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	screensAhead = 2,
}: UseInfiniteScrollTriggerParams) {

	useEffect(() => {
		if (!emblaApi) return;
		const checkNearEnd = () => {
			if (!hasNextPage || isFetchingNextPage) return;

			const inView = emblaApi.slidesInView();
			if (inView.length === 0) return;

			const lastVisibleIndex = Math.max(...inView);
			const visibleCount = inView.length;
			const totalData = emblaApi.slideNodes().length;

			const threshold = totalData - visibleCount * screensAhead - 1;
			
			if (lastVisibleIndex >= threshold) {
				fetchNextPage();
			}
		};



		emblaApi.on("select", checkNearEnd);
		emblaApi.on("reInit", checkNearEnd);

		return () => {
			emblaApi.off("select", checkNearEnd);
			emblaApi.off("reInit", checkNearEnd);
		};
	}, [emblaApi, hasNextPage, isFetchingNextPage, fetchNextPage, screensAhead])
}