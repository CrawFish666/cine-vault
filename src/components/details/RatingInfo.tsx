import { Star } from "lucide-react";
import { StarRaiting } from "../StarRating";

interface RatingInfoProps {
	voteAverage: number;
}

export function RatingInfo({ voteAverage }: RatingInfoProps) {
	return (
		<div className="flex flex-col gap-3.5 items-start">
			<div className="flex gap-1">
				<Star className="w-6 h-6 text-neutral-60" />
				<h3 className="text-neutral-60 text-lg font-medium">
					Рейтинг
				</h3>
			</div>

			<div className="p-4 border border-surface-15 rounded-lg bg-surface-08 inline-flex flex-col gap-1 ">
				<h4 className="text-white font-semibold text-xl">
					TMDB
				</h4>

				<div className="flex items-center gap-1">
					<StarRaiting rating={voteAverage} />
					<span className="text-white text-xl font-medium">
						{Number((voteAverage / 2).toFixed(2))}
					</span>
				</div>
			</div>
		</div>
	);
}