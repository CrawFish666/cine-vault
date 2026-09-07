import { useTrendingNowTVShows } from "../../hooks/TVShows/useTrendingNowTVShows";
import { useCarouselController } from "../../hooks/useCarouselController";
import { useInfiniteScrollTrigger } from "../../hooks/useInfiniteScrollTrigger";
import { uniqueById } from "../../utils/array";
import { Carousel } from "../carousel/Carousel";
import { CarouselCard } from "../carousel/CarouselCard";
import { CarouselHeader } from "../carousel/CarouselHeader";
import { CarouselProgress } from "../carousel/CarouselProgress";
import { CarouselSlide } from "../carousel/CarouselSlide";
import { WatchlistButton } from "../WatchlistButton";
import { formatVoteCount } from "../../utils/format";
import { useVisibleSlides } from "../../hooks/useVisibleSlides";
import { useTVShowCardDetails } from "../../hooks/TVShows/useTVShowCardDetails";
import { Eye } from "lucide-react";
import type { TimeWindowParam } from "../../api/tvshows";
import { useState } from "react";
import { ROUTES } from "../../routes/pathConstants";
import { TmdbImage } from "../ui/TmdbImage";
import { getPosterUrl } from "../../utils/tmdbImage";
import { CarouselSkeleton } from "../skeleton/CarouselSkeleton";
import { sectionLinks } from "../Footer/sectionLinks";



export function TrendingNowTvShows() {
	const [timeWindow, setTimeWindow] = useState<TimeWindowParam["time_window"]>("day");

	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const { data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage, isLoading } = useTrendingNowTVShows({
			time_window: timeWindow
		})

	const allData = uniqueById(data?.pages.flatMap(page => page.results) ?? []);

	const { emblaRef,
		emblaDotsRef,
		isMobile,
		prevButtonDisabled,
		nextButtonDisabled,
		selectedIndex,
		scrollSnaps,
		scrollPrev,
		scrollNext,
		emblaApi } = useCarouselController({
			align: "start",
			dragFree: false,
			containScroll: "trimSnaps",
			slidesToScroll: 1,
			skipSnaps: false,
			inViewThreshold: 0.3,
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
	const detailsData = useTVShowCardDetails(allData, visibleSlides);

	return (
		<section id={sectionLinks[ROUTES.TV_SHOWS][3].id}>
			<CarouselHeader title="В тренде"
				showControls={!isLoading}
				emblaDotsRef={emblaDotsRef}
				prevButtonDisabled={prevButtonDisabled}
				nextButtonDisabled={nextButtonDisabled}
				scrollSnaps={scrollSnaps}
				selectedIndex={selectedIndex}
				scrollPrev={scrollPrev}
				scrollNext={scrollNext}
			/>
			<div className="flex gap-3 mb-10">
				<button
					onClick={() => {
						setTimeWindow("day")
						emblaApi?.scrollTo(0);
					}}
					className={`px-6 py-3 rounded-lg transition-colors ${timeWindow === "day"
						? "bg-primary-45 text-white cursor-not-allowed"
						: "bg-surface-08 border border-surface-15 text-neutral-60 cursor-pointer"
						}`}
				>
					Сегодня
				</button>

				<button
					onClick={() => {
						setTimeWindow("week")
						emblaApi?.scrollTo(0);
					}}
					className={`px-6 py-3 rounded-lg transition-colors ${timeWindow === "week"
						? "bg-primary-45 text-white cursor-not-allowed"
						: "bg-surface-08 border border-surface-15 text-neutral-60 cursor-pointer"
						}`}
				>
					Неделя
				</button>
			</div>
			{isLoading ? (
				<CarouselSkeleton
					count={5}
					gapClassName="gap-5"
					slideClassName="basis-[181px] sm:basis-[calc((100%-40px)/3)] md:basis-[calc((100%-60px)/4)] lg:basis-[calc((100%-80px)/5)] h-[clamp(259px,calc(4.667vw+240.8px),308px)] laptop:h-[clamp(308px,calc(14.375vw+101px),377px)]" />
			) :
				(
					<Carousel emblaRef={emblaRef} className="gap-5">
						{allData.map((item, index) => {
							// const runtime = runtimes[index]?.data;
							const details = detailsData[index].data;
							return (
								<CarouselSlide key={item.id} className="relative basis-[181px] sm:basis-[calc((100%-40px)/3)] md:basis-[calc((100%-60px)/4)] lg:basis-[calc((100%-80px)/5)]">
									<CarouselCard to={ROUTES.TV_SHOWS_DETAILS_BY_ID(item.id)} className="flex flex-col p-3 h-[clamp(259px,calc(4.667vw+240.8px),308px)] laptop:h-[clamp(308px,calc(14.375vw+101px),377px)]">
										<div className="relative mb-3 flex-1 min-h-0">

											<TmdbImage className="w-full h-full rounded-[10px]"
												alt={item.name}
												loading="lazy"
												decoding="async"
												src={getPosterUrl(item.poster_path, "w342")}
											/>
										</div>

										<div className="flex flex-col gap-1 shrink-0">

											<div className="line-clamp-1 text-center text-white">{item.name}</div>
											<div className="flex justify-between items-center">
												<div className="flex items-center py-1 lg:py-2 px-2 lg:px-2.5 border border-surface-15 rounded-[51px] bg-surface-08">
													<span className="text-neutral-60 font-medium text-xs">{details ? `${details.number_of_seasons} сезонов` : "…"}</span>
												</div>

												<div className="flex gap-1 items-center py-1 lg:py-2 px-1.5 lg:px-2.5 border border-surface-15 rounded-[51px] bg-surface-08">
													<Eye className="w-5 h-5 fill-neutral-60" />
													<span className="text-neutral-60 font-medium text-xs">{formatVoteCount(item.vote_count)}</span>
												</div>
											</div>


										</div>
									</CarouselCard>
									<WatchlistButton
										className="absolute right-6 top-6"
										item={{ id: item.id, mediaType: "tv", posterPath: item.poster_path, title: item.name, voteAverage: item.vote_average }} />
								</CarouselSlide>
							)
						})}
					</Carousel>
				)}

			{isMobile && <CarouselProgress emblaApi={emblaApi} />}
		</section>
	)
}