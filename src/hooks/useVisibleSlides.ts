import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

// Возможно переделать видимые слайды не по index, а по id контента

export function useVisibleSlides(emblaApi: EmblaCarouselType | undefined) {
	const [visibleSlide, setVisibleSlide] = useState<Set<number>>(new Set());

	useEffect(() => {
		if (!emblaApi) return;

		const updateVisibleSlide = () => {
			const slideInView = emblaApi.slidesInView();
			// console.log("VISIBLE:", slideInView);

			setVisibleSlide((prev) => {
				const next = new Set(prev);
				slideInView.forEach((index) => next.add(index));
				return next;
			})
		}

		updateVisibleSlide();

		emblaApi.on("slidesInView", updateVisibleSlide);

		return () => {
			emblaApi.on("slidesInView", updateVisibleSlide);
		}

	}, [emblaApi])

	return visibleSlide;
}