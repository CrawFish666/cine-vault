import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

// Возможно переделать видимые слайды не по index, а по id контента

export function useVisibleSlides(emblaApi: EmblaCarouselType | undefined) {
	const [visibleSlide, setVisibleSlide] = useState<Set<number>>(new Set());

	useEffect(() => {
		if (!emblaApi) return;

		const updateVisibleSlide = () => {
			const slideInView = emblaApi.slidesInView();
			setVisibleSlide((prev) => {
				const next = new Set(prev);
				let changed = false;
				slideInView.forEach((index) => {
					if (!next.has(index)) {
						next.add(index);
						changed = true;
					}
				});
				return changed ? next : prev;
			});
		};

		updateVisibleSlide();

		emblaApi.on("slidesInView", updateVisibleSlide);

		return () => {
			emblaApi.off("slidesInView", updateVisibleSlide);
		}

	}, [emblaApi])

	return visibleSlide;
}