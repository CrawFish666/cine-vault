import { ArrowRight } from "lucide-react";
import { useGenreTvShowsPreviews } from "../../hooks/TVShows/useGenreTvShowsPreviews";
import { useTVGenres } from "../../hooks/TVShows/useTVGenres"
import { useCarouselController } from "../../hooks/useCarouselController";
import { useVisibleSlides } from "../../hooks/useVisibleSlides";
import { Carousel } from "../carousel/Carousel";
import { CarouselCard } from "../carousel/CarouselCard";
import { CarouselHeader } from "../carousel/CarouselHeader";
import { CarouselSlide } from "../carousel/CarouselSlide";
import { TmdbImage } from "../ui/TmdbImage";
import { getPosterUrl } from "../../utils/tmdbImage";
import { CarouselSkeleton } from "../skeleton/CarouselSkeleton";
import { sectionLinks } from "../Footer/sectionLinks";
import { ROUTES } from "../../routes/pathConstants";

export function OurGenresTvShowsList() {
	const { data, isLoading } = useTVGenres();

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
			"(min-width: 640px)": { slidesToScroll: 3 },
			"(min-width: 768px)": { slidesToScroll: 4 },
			"(min-width: 1024px)": { slidesToScroll: 5 },
		}
	});

	const visibleIndexes = useVisibleSlides(emblaApi);
	const genrePreviews = useGenreTvShowsPreviews(data ?? [], visibleIndexes);

	return (
		<section id={sectionLinks[ROUTES.TV_SHOWS][0].id}>
			<CarouselHeader title="По жанрам"
				showControls={!isLoading}
				emblaDotsRef={emblaDotsRef}
				prevButtonDisabled={prevButtonDisabled}
				nextButtonDisabled={nextButtonDisabled}
				scrollSnaps={scrollSnaps}
				selectedIndex={selectedIndex}
				scrollPrev={scrollPrev}
				scrollNext={scrollNext}
			/>

			{isLoading ? (
				<CarouselSkeleton
					count={5}
					slideClassName="basis-[180px] sm:basis-[calc((100%-40px)/3)] md:basis-[calc((100%-60px)/4)] lg:basis-[calc((100%-80px)/5)] h-[clamp(201px,calc(5.743vw+178.6px),259px)] laptop:h-[clamp(259px,calc(17.292vw+10px),342px)]"
					gapClassName="gap-4 lg:gap-5" />
			) :
				(
					<Carousel emblaRef={emblaRef} className="gap-4 lg:gap-5">
						{data?.map((genre, index) => {
							const posterPaths = genrePreviews[index]?.data ?? [];

							return (
								<CarouselSlide key={genre.id} className="basis-[180px] sm:basis-[calc((100%-40px)/3)] md:basis-[calc((100%-60px)/4)] lg:basis-[calc((100%-80px)/5)]">
									<CarouselCard className="text-white p-5 flex flex-col gap-2 h-[clamp(201px,calc(5.743vw+178.6px),259px)] laptop:h-[clamp(259px,calc(17.292vw+10px),342px)]">
										<div className="grid grid-cols-2 grid-rows-2 gap-1 flex-1 min-h-0">
											{posterPaths?.filter(item => item.poster_path).map((item, i) => (
												<TmdbImage key={item.id} className="w-full h-full rounded-sm"
													alt={"test"}
													loading="lazy"
													decoding="async"
													src={getPosterUrl(item.poster_path, "w154")}
												/>
											))}
										</div>
										<div className="flex items-center justify-between gap-4 shrink-0">
											<div className="font-semibold text-sm text-white">{genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}</div>
											<div><ArrowRight className="w-5 h-5" /></div>
										</div>
									</CarouselCard>
								</CarouselSlide>
							)
						})}
					</Carousel>
				)}
		</section>
	)
}