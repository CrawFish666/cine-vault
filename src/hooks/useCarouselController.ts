import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";


export function useCarouselController(mainOptions: EmblaOptionsType) {
	const [emblaRef, emblaApi] = useEmblaCarousel(mainOptions);
	const [emblaDotsRef, emblaDotsApi] = useEmblaCarousel({
		containScroll: "keepSnaps",
		align: "center",
		dragFree: true,
		slidesToScroll: 1,
		watchDrag: false
	});

	const [isMobile, setIsMobile] = useState(
		() => window.matchMedia("(max-width: 767px)").matches
	);

	useEffect(() => {
		const mediaQueryList = window.matchMedia("(max-width: 767px)");
		const listener = () => setIsMobile(mediaQueryList.matches);
		mediaQueryList.addEventListener("change", listener);
		return () => mediaQueryList.removeEventListener("change", listener);
	}, []);

	const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
	const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);


	const toggleButtonsDisabled = (api: EmblaCarouselType) => {
		setPrevButtonDisabled(!api.canScrollPrev());
		setNextButtonDisabled(!api.canScrollNext());
	};


	useEffect(() => {
		if (!emblaApi) return;

		setScrollSnaps(emblaApi.scrollSnapList());
		toggleButtonsDisabled(emblaApi);

		const onSelect = () => {
			const newIndex = emblaApi.selectedScrollSnap();
			setSelectedIndex(newIndex);
			toggleButtonsDisabled(emblaApi);
			emblaDotsApi?.scrollTo(newIndex);
		};

		const onReInit = () => {
			setScrollSnaps(emblaApi.scrollSnapList());
			toggleButtonsDisabled(emblaApi);
		};

		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onReInit);

		return () => {
			emblaApi.off("select", onSelect);
			emblaApi.off("reInit", onReInit);
		};
	}, [emblaApi, emblaDotsApi, ]);


	const scrollPrev = () => emblaApi?.scrollPrev()
	const scrollNext = () => emblaApi?.scrollNext()

	return {
		emblaRef,
		emblaDotsRef,
		isMobile,
		prevButtonDisabled,
		nextButtonDisabled,
		selectedIndex,
		scrollSnaps,
		scrollPrev,
		scrollNext,
		emblaApi
	}
}