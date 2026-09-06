
import { useUpcomingMovies } from '../../hooks/useUpcomingMovies';
import { CarouselHeader } from '../carousel/CarouselHeader';
import { CarouselProgress } from '../carousel/CarouselProgress';
import { Carousel } from '../carousel/Carousel';
import { CarouselCard } from '../carousel/CarouselCard';
import { CarouselSlide } from '../carousel/CarouselSlide';
import { useCarouselController } from '../../hooks/useCarouselController';
import { WatchlistButton } from '../WatchlistButton';
import { ROUTES } from '../../routes/pathConstants';
import { TmdbImage } from '../ui/TmdbImage';
import { getPosterUrl } from '../../utils/tmdbImage';
import { CarouselSkeleton } from '../skeleton/CarouselSkeleton';
import { sectionLinks } from '../Footer/sectionLinks';





export function Upcoming() {
	const { data, isLoading } = useUpcomingMovies();

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
		breakpoints: {
			"(min-width: 640px)": { slidesToScroll: 3 },
			"(min-width: 768px)": { slidesToScroll: 4 },
			"(min-width: 1280px)": { slidesToScroll: 5 },
		}
	});


	return (
		<section id={sectionLinks[ROUTES.MOVIES][2].id} className="">

			<CarouselHeader
				title='Скоро в кино'
				showControls={!isLoading}
				emblaDotsRef={emblaDotsRef}
				prevButtonDisabled={prevButtonDisabled}
				nextButtonDisabled={nextButtonDisabled}
				scrollSnaps={scrollSnaps}
				selectedIndex={selectedIndex}
				scrollPrev={scrollPrev}
				scrollNext={scrollNext} />

			{isLoading ?
				(
					<CarouselSkeleton
						count={5}
						gapClassName="gap-5"
						slideClassName="basis-[178px] sm:basis-[calc((100%-40px)/3)] md:basis-[calc((100%-60px)/4)] xl:basis-[calc((100%-80px)/5)] h-[clamp(259px,calc(4.667vw+238.8px),308px)] laptop:h-[clamp(308px,calc(14.375vw+99px),375px)]" />
				)
				:
				(
					<Carousel emblaRef={emblaRef} className='gap-5'>
						{data?.results.map(item => (
							<CarouselSlide key={item.id} className='relative basis-[178px] sm:basis-[calc((100%-40px)/3)] md:basis-[calc((100%-60px)/4)] xl:basis-[calc((100%-80px)/5)]'>
								<CarouselCard to={ROUTES.MOVIE_DETAILS_BY_ID(item.id)} className='flex flex-col py-2.5 px-1 sm:p-3.5  laptop:p-5 h-[clamp(259px,calc(4.667vw+238.8px),308px)] laptop:h-[clamp(308px,calc(14.375vw+99px),375px)]'>
									<div className="relative min-h-0 flex-1 overflow-hidden rounded-[10px] mb-2.5 px-1.5 sm:px-0">
										<TmdbImage key={item.title} className="w-full h-full rounded-[10px]"
											alt={item.title}
											loading="lazy"
											decoding="async"
											src={getPosterUrl(item.poster_path, "w342")}
										/>
									</div>
									<p className="shrink-0 bg-surface-08 border border-surface-15 rounded-[51px] py-1 px-3 2xl:px-6 font-medium text-xs flex justify-center sm:self-center">
										<span className="text-neutral-60">В кино:</span>
										<span className="text-neutral-75">{item.release_date}</span>
									</p>
								</CarouselCard>
								<WatchlistButton className="absolute right-6 top-6"
									item={{ id: item.id, mediaType: "movie", posterPath: item.poster_path, title: item.title, voteAverage: item.vote_average }} />
							</CarouselSlide>
						))}
					</Carousel>

				)
			}

			{isMobile && <CarouselProgress emblaApi={emblaApi} />}
		</section>
	)
}

/*
{isLoading ?
				(
					<CarouselSkeleton
						count={5}
						gapClassName="gap-5"
						slideClassName="basis-[178px] sm:basis-[calc((100%-40px)/3)] md:basis-[calc((100%-60px)/4)] xl:basis-[calc((100%-80px)/5)] h-[clamp(259px,calc(4.667vw+238.8px),308px)] laptop:h-[clamp(308px,calc(14.375vw+99px),375px)]" />
				)
				:
				(
					<Carousel emblaRef={emblaRef} className='gap-5'>
						{data?.results.map(item => (
							<CarouselSlide key={item.id} className='relative basis-[178px] sm:basis-[calc((100%-40px)/3)] md:basis-[calc((100%-60px)/4)] xl:basis-[calc((100%-80px)/5)]'>
								<CarouselCard to={ROUTES.MOVIE_DETAILS_BY_ID(item.id)} className='flex flex-col py-2.5 px-1 sm:p-3.5  laptop:p-5 h-[clamp(259px,calc(4.667vw+238.8px),308px)] laptop:h-[clamp(308px,calc(14.375vw+99px),375px)]'>
									<div className="relative min-h-0 flex-1 overflow-hidden rounded-[10px] mb-2.5 px-1.5 sm:px-0">
										<TmdbImage key={item.title} className="w-full h-full rounded-[10px]"
											alt={item.title}
											loading="lazy"
											decoding="async"
											src={getPosterUrl(item.poster_path, "w342")}
										/>
									</div>
									<p className="shrink-0 bg-surface-08 border border-surface-15 rounded-[51px] py-1 px-3 2xl:px-6 font-medium text-xs flex justify-center sm:self-center">
										<span className="text-neutral-60">В кино:</span>
										<span className="text-neutral-75">{item.release_date}</span>
									</p>
								</CarouselCard>
								<WatchlistButton className="absolute right-6 top-6"
									item={{ id: item.id, mediaType: "movie", posterPath: item.poster_path, title: item.title, voteAverage: item.vote_average }} />
							</CarouselSlide>
						))}
					</Carousel>

				)
			}
*/