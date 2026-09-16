import useEmblaCarousel from "embla-carousel-react";
import { useNowPlayingMovies } from "../../hooks/Movies/useNowPlayingMovies";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/pathConstants";
import { WatchlistButton } from "../WatchlistButton";
import { TmdbImage } from "../ui/TmdbImage";
import { getBackdropUrl } from "../../utils/tmdbImage";
import { CarouselSkeleton } from "../skeleton/CarouselSkeleton";
import { sectionLinks } from "../Footer/sectionLinks";


export function NowPlayingCarousel() {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, watchDrag: true })
	const [prevButtonDisabled, setPrevButtonDisabled] = useState(true)
	const [nextButtonDisabled, setNextButtonDisabled] = useState(true)
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
	const [selectedSnap, setSelectedSnap] = useState(0)

	const scrollTo = (index: number) => {
		emblaApi?.scrollTo(index);
	};
	const setupSnaps = (emblaApi: EmblaCarouselType) => setScrollSnaps(emblaApi.scrollSnapList())
	const setActiveSnap = (emblaApi: EmblaCarouselType) => {
		setSelectedSnap(emblaApi.selectedScrollSnap());
	};

	const { data, isLoading } = useNowPlayingMovies();

	const toggleButtonsDisabled = (emblaApi: EmblaCarouselType) => {
		setPrevButtonDisabled(!emblaApi.canScrollPrev())
		setNextButtonDisabled(!emblaApi.canScrollNext())
	}

	useEffect(() => {
		if (!emblaApi) return;

		toggleButtonsDisabled(emblaApi);
		setupSnaps(emblaApi)
		setActiveSnap(emblaApi)

		emblaApi.on("reInit", toggleButtonsDisabled);
		emblaApi.on("select", toggleButtonsDisabled);

		emblaApi.on('reInit', setupSnaps);
		emblaApi.on('reInit', setActiveSnap);
		emblaApi.on('select', setActiveSnap);

		return () => {
			emblaApi.off("reInit", toggleButtonsDisabled);
			emblaApi.off("select", toggleButtonsDisabled);

			emblaApi.off("reInit", setupSnaps);
			emblaApi.off("reInit", setActiveSnap);
			emblaApi.off("select", setActiveSnap);
		};
	}, [emblaApi]);

	const handleNext = () => {

		emblaApi?.scrollNext();
	}

	const handlePrev = () => {
		emblaApi?.scrollPrev()
	}

	// if (isPending) return <NowPlayingSkeleton />;

	return (
		<section id={sectionLinks[ROUTES.MOVIES][0].id} className="embla">
			{isLoading ? (
				<CarouselSkeleton count={1} slideClassName="flex-[0_0_100%] min-w-0 aspect-video max-h-[835px] border border-surface-15 bg-surface-15 rounded-xl overflow-hidden animate-pulse" />
			) : (
				<div className="embla__viewport overflow-hidden relative" ref={emblaRef}>
					<div className="embla__container flex touch-pan-y touch-pinch-zoom">
						{/** Слайды */}

						{data?.results.map((item) => (
							<div key={item.id} className="relative flex-[0_0_100%] aspect-video min-w-0 min-h-[420px] max-h-[835px] border border-surface-15 rounded-xl overflow-hidden">
								{/**Картинка слайда */}
								{/* <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="w-full h-full object-cover" /> */}
								<TmdbImage key={item.title} className="w-full h-full"
									alt={item.title}
									loading="eager"
									fetchPriority="high"
									decoding="async"
									src={getBackdropUrl(item.backdrop_path, "w1280")}
								/>
								{/**Градиент-затемнение */}
								<div className="absolute inset-0 bg-gradient-to-t from-surface-08  to-transparent" />

								<div className="absolute max-w-3xl w-full bottom-2 min-[440px]:bottom-5 md:bottom-20 lg:bottom-31 left-1/2 -translate-x-1/2 text-center flex flex-col items-center">
									<h2 className="font-bold text-[clamp(24px,1.21vw+19.3px,38px)] text-white center">{item.title}</h2>
									<div className="flex items-center gap-3 text-sm text-neutral-75 mb-2 sm:mb-5">
										<span className="font-medium text-yellow-400">★ {item.vote_average.toFixed(1)}</span>
										<span>•</span>
										<span>{item.release_date}</span>
									</div>
									<p className="font-medium text-neutral-60 text-base lg:text-lg leading-normal text-center mb-[30px] hidden min-[845px]:block">{item.overview}</p>
									<div className="flex flex-row sm:flex-row items-stretch gap-2 sm:gap-5">
										<Link to={ROUTES.MOVIE_DETAILS_BY_ID(item.id)} className="text-white text-lg flex font-semibold px-3 py-1 sm:px-6 sm:py-3.5 items-center bg-primary-45 rounded-lg">
											Подробнее
										</Link>
										<WatchlistButton
											classNameIcon="w-6 h-6 sm:w-7 sm:h-7"
											variant="default"
											className="border border-surface-15 bg-surface-06 p-2 sm:p-[13px] rounded-lg"
											item={{ id: item.id, mediaType: "movie", posterPath: item.poster_path, title: item.title, voteAverage: item.vote_average }} />


									</div>
								</div>
							</div>
						))}

					</div>

					{/**Navigation buttons */}
					<div className="hidden md:flex absolute bottom-5 inset-x-12.5 items-center justify-between gap-3 ">
						<button
							onClick={handlePrev}
							disabled={prevButtonDisabled}
							className="rounded-lg border border-surface-12 bg-surface-06 p-3.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30">
							<ArrowLeft className="h-6.5 w-6.5 text-white" />
						</button>

						<div className="flex items-center gap-1.5">
							{scrollSnaps.map((_, index) => (
								<button
									key={index}
									onClick={() => scrollTo(index)}
									className={`h-1 rounded-full transition-all ${index === selectedSnap
										? "w-[23px] bg-primary-45 cursor-default"
										: "w-4 bg-surface-20 cursor-pointer"
										}`}
								/>
							))}
						</div>

						<button
							onClick={handleNext}
							disabled={nextButtonDisabled}
							className="rounded-lg border border-surface-12 bg-surface-06 p-3.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30">
							<ArrowRight className="h-6.5 w-6.5 text-white" />
						</button>
					</div>
				</div>
			)}



		</section>
	)
}
