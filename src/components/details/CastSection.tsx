import { useCarouselController } from "../../hooks/useCarouselController";
import type { CastMember, TVShowAggregateCastMember } from "../../types/tmdb";
import { handleImageError } from "../../utils/handleImageError";
import { getProfileUrl } from "../../utils/tmdbImage";
import { Carousel } from "../carousel/Carousel";
import { CarouselCard } from "../carousel/CarouselCard";
import { CarouselControls } from "../carousel/CarouselControls";
import { CarouselHeader2 } from "../carousel/CarouselHeader2";
import { CarouselSlide } from "../carousel/CarouselSlide";
import { TmdbImage } from "../ui/TmdbImage";

interface CastSectionProps {
	cast: CastMember[] | TVShowAggregateCastMember[];
}



export function CastSection({ cast }: CastSectionProps) {

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

	return (
		<section className="cast p-[24px] min-[390px]:p-[clamp(24px,calc(1.5238vw_+_18.057px),40px)] laptop:p-[clamp(40px,calc(2.0833vw_+_10px),50px)] border border-surface-15 rounded-xl bg-surface-10">
			<CarouselHeader2 title="Актёры" variant="subsection">
				<CarouselControls

					scrollNext={scrollNext}
					scrollPrev={scrollPrev}
					nextButtonDisabled={nextButtonDisabled}
					prevButtonDisabled={prevButtonDisabled}
					variant="circle"
					showPagination={false}
					controlsVisibility="always"

				// emblaDotsRef={emblaDotsRef}
				// selectedIndex={selectedIndex}
				// scrollSnaps={scrollSnaps}

				/>
			</CarouselHeader2>
			<Carousel emblaRef={emblaRef} className="gap-5">
				{cast.map((person) => {
					const character = "character" in person ? person.character : person.roles[0]?.character;
					return (
						<CarouselSlide key={person.id} className="basis-[181px] sm:basis-[calc((100%-20px)/2)] md:basis-[calc((100%-40px)/3)] min-[55rem]:basis-[calc((100%-60px)/4)] lg:basis-[calc((100%-20px)/2)]  min-[75rem]:basis-[calc((100%-40px)/3)]  xl:basis-[calc((100%-60px)/4)]">
							<CarouselCard className="flex flex-col p-2.5 h-[clamp(259px,calc(4.667vw+240.8px),308px)] laptop:h-[clamp(308px,calc(14.375vw+101px),377px)]">

								<div className="mb-3 flex-1 min-h-0">
									{/* <img className="rounded-[10px] w-full h-full object-cover"
										loading="lazy"
										decoding="async"

										src={getProfileUrl(person.profile_path, "w185")}
										onError={handleImageError} /> */}
									<TmdbImage className="rounded-[10px] w-full h-full"
										alt="person.name"
										loading="lazy"
										decoding="async"
										src={getProfileUrl(person.profile_path, "w185")}
									/>
								</div>
								<div className="flex flex-col items-center gap-1 shrink-0">
									<h4 className="text-white text-base font-semibold text-center">
										{person.name}
									</h4>
									<p className="text-neutral-60 font-medium text-sm text-center line-clamp-1" title={character}>
										{character}
									</p>
								</div>


							</CarouselCard>
						</CarouselSlide>
					)
				})}
			</Carousel>
		</section>
	)

}