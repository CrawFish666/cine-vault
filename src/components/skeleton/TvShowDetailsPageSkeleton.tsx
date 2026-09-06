import { ReviewsSection } from "../details/ReviewsSection";
import { CastSectionSkeleton } from "./details/CastSectionSketelon";
import { DescriptionSectionSkeleton } from "./details/DescriptionSectionSkeleton";
import { GenresInfoSkeleton } from "./details/GenresInfoSkeleton";
import { HeroBannerSkeleton } from "./details/HeroBannerSkeleton";
import { PersonInfoSkeleton } from "./details/PersonInfoSkeleton";
import { RatingInfoSkeleton } from "./details/RatingInfoSkeleton";
import { ReleaseDateInfoSkeleton } from "./details/ReleaseDateInfoSkeleton";
import { SeasonsEpisodsSectionSkeleton } from "./details/SeasonsEpisodsSectionSkeleton";

interface TvShowDetailsPageSkeletonProps {
	mediaId: number
}

export function TvShowDetailsPageSkeleton({ mediaId }: TvShowDetailsPageSkeletonProps) {
	return (
		<div className="py-8 flex flex-col gap-[80px] laptop:gap-[100px] desktop:gap-[180px]">
			<HeroBannerSkeleton />

			<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,6fr)_minmax(0,4fr)] min-[1200px]:grid-cols-[minmax(0,53fr)_minmax(0,26fr)] relative gap-5 lg:gap-x-5 lg:gap-y-7.5">

				<div className="order-1 lg:order-none lg:col-start-1 lg:row-start-2">
					<DescriptionSectionSkeleton />
				</div>

				<div className="order-2 lg:order-none lg:col-start-1 lg:row-start-1">
					<SeasonsEpisodsSectionSkeleton />

				</div>

				<aside className="order-3 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-3 self-start bg-surface-10 border border-surface-15 rounded-xl p-[24px] min-[390px]:p-[clamp(24px,calc(0.5714vw_+_21.7714px),30px)] laptop:p-[clamp(30px,calc(2.0833vw),40px)] flex flex-col gap-7.5 lg:sticky lg:top-0">
					<ReleaseDateInfoSkeleton />
					<RatingInfoSkeleton />
					<GenresInfoSkeleton />
					<PersonInfoSkeleton />
					<PersonInfoSkeleton />

				</aside>

				<div className="order-4 lg:order-none lg:col-start-1 lg:row-start-3">
					<CastSectionSkeleton />
				</div>

				<div className="order-5 lg:order-none lg:col-start-1 lg:row-start-4">
					<ReviewsSection id={mediaId} mediaType="tv" />
				</div>

			</div>

		</div>
	)
}