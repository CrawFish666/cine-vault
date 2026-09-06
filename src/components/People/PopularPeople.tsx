import { usePopularPeople } from "../../hooks/People/usePopularPeople";
import { CarouselProgress } from "../carousel/CarouselProgress";
import { useCarouselController } from "../../hooks/useCarouselController";
import { Carousel } from "../carousel/Carousel";
import { CarouselCard } from "../carousel/CarouselCard";
import { CarouselHeader } from "../carousel/CarouselHeader";
import { CarouselSlide } from "../carousel/CarouselSlide";
import { useInfiniteScrollTrigger } from "../../hooks/useInfiniteScrollTrigger";
import { TmdbImage } from "../ui/TmdbImage";
import { getProfileUrl } from "../../utils/tmdbImage";
import { CarouselSkeleton } from "../skeleton/CarouselSkeleton";

export function PopularPeople() {

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = usePopularPeople();
	const allData = data?.pages.flatMap((item) => item.results) ?? [];
	console.log(allData);

	const {
		emblaRef,
		emblaDotsRef,
		isMobile,
		prevButtonDisabled,
		nextButtonDisabled,
		selectedIndex,
		scrollSnaps,
		scrollProgress,
		scrollPrev,
		scrollNext,
		emblaApi
	} = useCarouselController({
		align: "start",
		dragFree: false,
		containScroll: "trimSnaps",
		slidesToScroll: 1,
		skipSnaps: false,
		inViewThreshold: 0.6,
		breakpoints: {
			"(min-width: 640px)": { slidesToScroll: 2 },
			"(min-width: 768px)": { slidesToScroll: 3 },
			"(min-width: 1280px)": { slidesToScroll: 4 },
		}
	})

	useInfiniteScrollTrigger({
		emblaApi,
		// itemsCount: allData.length,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage
	})


	return (
		<section className="">
			<CarouselHeader
				title="Популярные"
				showControls={!isLoading}
				emblaDotsRef={emblaDotsRef}
				prevButtonDisabled={prevButtonDisabled}
				nextButtonDisabled={nextButtonDisabled}
				scrollSnaps={scrollSnaps}
				selectedIndex={selectedIndex}
				scrollPrev={scrollPrev}
				scrollNext={scrollNext} />
			{isLoading ?
				(<CarouselSkeleton
					count={5}
					slideClassName="basis-[181px] sm:basis-[calc((100%-40px)/3)] md:basis-[calc((100%-60px)/4)] lg:basis-[calc((100%-80px)/5)] h-[clamp(259px,calc(4.667vw+240.8px),308px)] laptop:h-[clamp(308px,calc(14.375vw+101px),377px)]"
					gapClassName="gap-4 lg:gap-5" />)
				:
				(
					<Carousel emblaRef={emblaRef} className="gap-4 lg:gap-5">
						{allData.map((item, index) => {
							console.log(item)
							return (
								<CarouselSlide key={item.id} className="basis-[181px] sm:basis-[calc((100%-40px)/3)] md:basis-[calc((100%-60px)/4)] lg:basis-[calc((100%-80px)/5)]">
									<CarouselCard className="flex flex-col p-3 h-[clamp(259px,calc(4.667vw+240.8px),308px)] laptop:h-[clamp(308px,calc(14.375vw+101px),377px)]">

										<div className="relative min-h-0 flex-1 overflow-hidden mb-3 lg:mb-4 2xl:mb-5">

											<TmdbImage key={item.id} className="w-full h-full rounded-[10px]"
												alt={item.name}
												loading="lazy"
												decoding="async"
												src={getProfileUrl(item.profile_path, "w185")}
											/>
										</div>

										<div className="shrink-0">

											<div className="text-white font-medium text-base text-center">{item.name}</div>


										</div>
									</CarouselCard>
								</CarouselSlide>
							)
						})}
					</Carousel>
				)}
			{isMobile && <CarouselProgress scrollProgress={scrollProgress} />}
		</section>
	)
}






