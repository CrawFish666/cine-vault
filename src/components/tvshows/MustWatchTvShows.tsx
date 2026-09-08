import { useCarouselController } from "../../hooks/useCarouselController";
import { formatVoteCount } from "../../utils/format";
import { Carousel } from "../carousel/Carousel";
import { CarouselCard } from "../carousel/CarouselCard";
import { CarouselHeader } from "../carousel/CarouselHeader";
import { CarouselProgress } from "../carousel/CarouselProgress";
import { CarouselSlide } from "../carousel/CarouselSlide";
import { StarRaiting } from "../StarRaiting";
import { useInfiniteScrollTrigger } from "../../hooks/useInfiniteScrollTrigger";
import { useVisibleSlides } from "../../hooks/useVisibleSlides";
import { WatchlistButton } from "../WatchlistButton";
import { useMustWatchTVShows } from "../../hooks/TVShows/useMustWatchTVShows";
import { useTVShowCardDetails } from "../../hooks/TVShows/useTVShowCardDetails";
import { ROUTES } from "../../routes/pathConstants";
import { TmdbImage } from "../ui/TmdbImage";
import { getPosterUrl } from "../../utils/tmdbImage";
import { sectionLinks } from "../Footer/sectionLinks";
import { CarouselSkeleton } from "../skeleton/CarouselSkeleton";



export function MustWatchTvShows() {

	const { data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage, isLoading } = useMustWatchTVShows();

	const allData = data?.pages.flatMap((item) => item.results) ?? [];

	const {
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

		hasNextPage,
		isFetchingNextPage,
		fetchNextPage
	})

	const visibleSlides = useVisibleSlides(emblaApi);
	const detailsData = useTVShowCardDetails(allData, visibleSlides);

	return (
		<section className="" id={sectionLinks[ROUTES.TV_SHOWS][4].id}>
			<CarouselHeader
				title="Стоит посмотреть"
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
					count={4}
					slideClassName="basis-[231px] sm:basis-[calc((100%-16px)/2)] md:basis-[calc((100%-32px)/3)] lg:basis-[calc((100%-40px)/3)] xl:basis-[calc((100%-60px)/4)] h-[clamp(303px,calc(9.62vw+263.5px),404px)] laptop:h-[clamp(404px,calc(20vw+114px),500px)]"
					gapClassName="gap-4 lg:gap-5" />)
				:
				(
					<Carousel emblaRef={emblaRef} className="gap-4 lg:gap-5">
						{allData.map((item, index) => {
							const details = detailsData[index].data;
							return (
								<CarouselSlide key={item.id} className="relative basis-[231px] sm:basis-[calc((100%-16px)/2)] md:basis-[calc((100%-32px)/3)] lg:basis-[calc((100%-40px)/3)] xl:basis-[calc((100%-60px)/4)]">
									<CarouselCard to={ROUTES.TV_SHOWS_DETAILS_BY_ID(item.id)} className="flex flex-col p-2.5 lg:p-4 2xl:p-5 h-[clamp(303px,calc(9.62vw+263.5px),404px)] laptop:h-[clamp(404px,calc(20vw+114px),500px)]">

										<div className="relative min-h-0 flex-1 overflow-hidden mb-3 lg:mb-4 2xl:mb-5">

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

												<div className="flex items-center gap-1 px-1.5 md:px-2 lg:px-2.5 py-1 lg:py-2 border border-surface-15 rounded-[51px] bg-surface-08">
													<StarRaiting rating={item.vote_average} starClassName="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
													<div className="text-neutral-60 font-medium text-xs">{formatVoteCount(item.vote_count)}</div>
												</div>
											</div>


										</div>
									</CarouselCard>
									<WatchlistButton className="absolute right-6 top-6"
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