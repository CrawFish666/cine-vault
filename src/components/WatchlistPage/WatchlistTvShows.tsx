import { useCarouselController } from "../../hooks/useCarouselController";
import { useWatchListStore } from "../../store/watchlistStore";
import { formatVoteCount } from "../../utils/format";
import { Carousel } from "../carousel/Carousel";
import { CarouselCard } from "../carousel/CarouselCard";
import { CarouselHeader } from "../carousel/CarouselHeader";
import { CarouselProgress } from "../carousel/CarouselProgress";
import { CarouselSlide } from "../carousel/CarouselSlide";
import { StarRaiting } from "../StarRating";
import { WatchlistButton } from "../WatchlistButton";

export function WatchlistTvShows() {
	const data = useWatchListStore((state) => state.items).filter(item => item.mediaType === "tv");



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

	// useInfiniteScrollTrigger({
	// 	emblaApi,
	// 	// itemsCount: allData.length,
	// 	hasNextPage,
	// 	isFetchingNextPage,
	// 	fetchNextPage
	// })


	return (
		<section className="">
			<CarouselHeader
				title="Сериалы"
				showControls={true}
				emblaDotsRef={emblaDotsRef}
				prevButtonDisabled={prevButtonDisabled}
				nextButtonDisabled={nextButtonDisabled}
				scrollSnaps={scrollSnaps}
				selectedIndex={selectedIndex}
				scrollPrev={scrollPrev}
				scrollNext={scrollNext} />
			<Carousel emblaRef={emblaRef} className="gap-4 lg:gap-5">
				{data.map((item, index) => {
					console.log(item)
					return (
						<CarouselSlide key={item.id} className="basis-[231px] sm:basis-[calc((100%-16px)/2)] md:basis-[calc((100%-32px)/3)] lg:basis-[calc((100%-40px)/3)] xl:basis-[calc((100%-60px)/4)]">
							<CarouselCard className="flex flex-col p-2.5 lg:p-4 2xl:p-5 h-[clamp(303px,calc(9.62vw+263.5px),404px)] laptop:h-[clamp(404px,calc(20vw+114px),500px)]">

								<div className="relative min-h-0 flex-1 overflow-hidden mb-3 lg:mb-4 2xl:mb-5">

									<WatchlistButton className="absolute right-3 top-3"
										item={{ id: item.id, mediaType: "tv", posterPath: item.posterPath, title: item.title, voteAverage: item.voteAverage }} />
									<img className="object-cover rounded-[10px] w-full h-full" src={`https://image.tmdb.org/t/p/w500${item.posterPath}`} />
								</div>

								<div className="flex flex-col items-center self-center shrink-0 gap-1">

									<div className="line-clamp-1">
										{item.title}
									</div>

									<div className="flex items-center gap-1 px-1.5 md:px-2 lg:px-2.5 py-1 lg:py-2 border border-surface-15 rounded-[51px] bg-surface-08">
										<StarRaiting rating={item.voteAverage} starClassName="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
									</div>


								</div>
							</CarouselCard>
						</CarouselSlide>
					)
				})}
			</Carousel>
			{isMobile && <CarouselProgress scrollProgress={scrollProgress} />}
		</section>
	)
}