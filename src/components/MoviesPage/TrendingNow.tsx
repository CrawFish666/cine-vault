import { Clock3, Eye } from "lucide-react";
import { useCarouselController } from "../../hooks/useCarouselController";
import { useTrendingNowMovies } from "../../hooks/useTrendingNowMovies";
import { Carousel } from "../carousel/Carousel";
import { CarouselCard } from "../carousel/CarouselCard";
import { CarouselHeader } from "../carousel/CarouselHeader";
import { CarouselProgress } from "../carousel/CarouselProgress";
import { CarouselSlide } from "../carousel/CarouselSlide";
import { formatRuntime, formatVoteCount } from "../../utils/format";
import { useInfiniteScrollTrigger } from "../../hooks/useInfiniteScrollTrigger";
import { useVisibleSlides } from "../../hooks/useVisibleSlides";
import { useMovieRuntimes } from "../../hooks/useMovieRuntimes";
import { uniqueById } from "../../utils/array";
import { WatchlistButton } from "../WatchlistButton";

export function TrendingNow() {

	const { data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage } = useTrendingNowMovies({
			time_window: "day"
		})

	const allData = uniqueById(data?.pages.flatMap(page => page.results) ?? [])

	const { emblaRef,
		emblaDotsRef,
		isMobile,
		prevButtonDisabled,
		nextButtonDisabled,
		selectedIndex,
		scrollSnaps,
		scrollProgress,
		scrollPrev,
		scrollNext,
		emblaApi } = useCarouselController({
			align: "start",
			dragFree: false,
			containScroll: "trimSnaps",
			slidesToScroll: 1,
			skipSnaps: false,
			inViewThreshold: 0.6,
			breakpoints: {
				"(min-width: 640px)": { slidesToScroll: 3 },
				"(min-width: 768px)": { slidesToScroll: 4 },
				"(min-width: 1024px)": { slidesToScroll: 5 },
			}
		})


	useInfiniteScrollTrigger({
		emblaApi,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage
	})

	const visibleSlides = useVisibleSlides(emblaApi);
	const runtimes = useMovieRuntimes(allData, visibleSlides)

	return (
		<section>
			<CarouselHeader title="В тренде"
				showControls
				emblaDotsRef={emblaDotsRef}
				prevButtonDisabled={prevButtonDisabled}
				nextButtonDisabled={nextButtonDisabled}
				scrollSnaps={scrollSnaps}
				selectedIndex={selectedIndex}
				scrollPrev={scrollPrev}
				scrollNext={scrollNext}
			/>
			<Carousel emblaRef={emblaRef} className="gap-5">
				{allData.map((item, index) => {
					const runtime = runtimes[index]?.data;

					return (
						<CarouselSlide key={item.id} className="basis-[181px] sm:basis-[calc((100%-40px)/3)] md:basis-[calc((100%-60px)/4)] lg:basis-[calc((100%-80px)/5)]">
							<CarouselCard className="flex flex-col p-3 h-[clamp(259px,calc(4.667vw+240.8px),308px)] laptop:h-[clamp(308px,calc(14.375vw+101px),377px)]">
								<div className="relative mb-3 flex-1 min-h-0">
									
									<WatchlistButton
										className="absolute right-3 top-3"
										item={{ id: item.id, mediaType: "movie", posterPath: item.poster_path, title: item.title, voteAverage: item.vote_average }} />
									<img className="rounded-[10px] w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original${item.poster_path}`} />
								</div>

								<div className="flex justify-between gap-1 shrink-0">
									<div className="flex items-center py-1 lg:py-2 px-1 lg:px-2.5 border border-surface-15 rounded-[51px] bg-surface-08">
										<Clock3 className="w-5 h-5  fill-neutral-60" />
										<span className="text-neutral-60 font-medium text-xs ">{runtime !== undefined ? (formatRuntime(runtime)) : "…"}</span>
									</div>

									<div className="flex gap-1 items-center py-1 lg:py-2 px-1.5 lg:px-2.5 border border-surface-15 rounded-[51px] bg-surface-08">
										<Eye className="w-5 h-5 fill-neutral-60" />
										
										<span className="text-neutral-60 font-medium text-xs">{formatVoteCount(item.vote_count)}</span>
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