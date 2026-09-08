import { Plus } from "lucide-react";
import { CarouselHeader2 } from "../carousel/CarouselHeader2";
import type { MediaReviewsParams } from "../../api/media";
import { useMediaReviews } from "../../hooks/useMediaReviews";
import { useCarouselController } from "../../hooks/useCarouselController";
import { useInfiniteScrollTrigger } from "../../hooks/useInfiniteScrollTrigger";
import { uniqueById } from "../../utils/array";
import { Carousel } from "../carousel/Carousel";
import { CarouselSlide } from "../carousel/CarouselSlide";
import { CarouselCard } from "../carousel/CarouselCard";
import { formatDateTime } from "../../utils/date";
import { StarRaiting } from "../StarRaiting";
import { CarouselControls } from "../carousel/CarouselControls";




type ReviewsSectionProps = Pick<MediaReviewsParams, "id" | "mediaType">;

export function ReviewsSection({ id, mediaType }: ReviewsSectionProps) {

	const {
		emblaRef,
		emblaDotsRef,
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
			// "(min-width: 768px)": { slidesToScroll: 2 },
			"(min-width: 1280px)": { slidesToScroll: 2 },
		}
	})

	const { data, fetchNextPage,
		hasNextPage,
		isFetchingNextPage, isLoading } = useMediaReviews({ id, mediaType, language: "en-US" });
	const allReviews = uniqueById(data?.pages.flatMap(page => page.results) ?? [])

	useInfiniteScrollTrigger({
		emblaApi,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage
	})



	return (
		<section className="reviews p-[24px] min-[390px]:p-[clamp(24px,calc(1.5238vw_+_18.057px),40px)] laptop:p-[clamp(40px,calc(2.0833vw_+_10px),50px)] border border-surface-15 bg-surface-10 rounded-xl flex flex-col space-y-10">
			<CarouselHeader2 title="Отзывы" variant="subsection" className="flex-wrap">
				<a href={`https://www.themoviedb.org/${mediaType === "movie" ? "movie" : "tv"}/${id}/reviews`} target="_blank" rel="noopener noreferrer" className="text-white flex items-center gap-1 px-4 py-3.5 border border-surface-15 bg-surface-08 rounded-lg cursor-pointer">
					<Plus className="w-7.5 h-7.5 text-white fill-white" />
					<span className="font-medium text-sm 2xl:text-lg text-white">
						Оставить отзыв
					</span>
				</a>
			</CarouselHeader2>
			{isLoading ? <div className="flex flex-col h-full p-[24px] min-[390px]:p-[clamp(24px,calc(0.5714vw_+_21.771px),30px)] laptop:p-[clamp(30px,calc(2.0833vw),40px)] gap-5 h-[clamp(200px,calc(4.667vw+240.8px),240px)] laptop:h-[clamp(240px,calc(14.375vw+101px),270px)] !bg-surface-08 animate-pulse"></div>
				: allReviews.length > 0 ? (
					<>
						<Carousel emblaRef={emblaRef} className="gap-5">
							{allReviews.map((review) => (
								<CarouselSlide className="basis-full xl:basis-[calc((100%-20px)/2)]" key={review.id}>
									<a href={review.url} target="_blank" rel="noopener noreferrer" className="">
										<CarouselCard className="flex flex-col h-full p-[24px] min-[390px]:p-[clamp(24px,calc(0.5714vw_+_21.771px),30px)] laptop:p-[clamp(30px,calc(2.0833vw),40px)] gap-5 !bg-surface-08">

											<div className="flex justify-between gap-2 items-center flex-wrap">
												<div className="flex flex-col ">
													<h4 className="font-medium text-base md:text-lg 2xl:text-xl text-white">{review.author_details.username}</h4>
													<span className="font-medium text-sm md:text-base 2xl:text-lg text-neutral-60">{formatDateTime(review.updated_at)}</span>
												</div>
												{review.author_details.rating !== null && (
													<div className="flex items-center gap-1 py-1 px-2.5 bg-surface-08 border border-surface-15 rounded-[51px]">
														<StarRaiting rating={review.author_details.rating} />
														<span className="text-sm md:text-base 2xl:text-lg text-neutral-60 font-medium">{Number((review.author_details.rating / 2).toFixed(2))}</span>
													</div>
												)}
											</div>
											<div className="">
												<p className="text-sm md:text-base 2xl:text-lg text-neutral-60 font-normal line-clamp-4" title={review.content}>{review.content}</p>
											</div>

										</CarouselCard>
									</a>
								</CarouselSlide>
							))}
						</Carousel>
						<div className="self-center">
							<CarouselControls
								scrollNext={scrollNext}
								scrollPrev={scrollPrev}
								nextButtonDisabled={nextButtonDisabled}
								prevButtonDisabled={prevButtonDisabled}
								variant="circle"
								showPagination={true}
								controlsVisibility="always"

								emblaDotsRef={emblaDotsRef}
								selectedIndex={selectedIndex}
								scrollSnaps={scrollSnaps}
							/>
						</div></>
				) :
					(
						<p className="text-xl text-white">
							Отзывов ещё нет..
						</p>
					)}

		</section>
	)
}