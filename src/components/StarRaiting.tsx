import { Star } from "lucide-react";

interface StarRatingProps {
	rating: number;
	maxStars?: number;
	starClassName?: string;
}

export function StarRaiting({ rating, maxStars = 5, starClassName = "w-4 h-4" }: StarRatingProps) {
	const convertedRating = Number((rating / 2).toFixed(2));

	return (
		<div className="inline-flex items-center gap-0.5">
			{Array.from({ length: maxStars }).map((_, index) => {
				const fillPercent = Math.min(Math.max(convertedRating - index, 0), 1) * 100;
				return (
					<div key={index} className={`relative ${starClassName}`}>
						<Star className={`absolute inset-0 text-neutral-60 fill-neutral-60 ${starClassName}`} />
						<div
							style={{ width: `${fillPercent}%` }}
							className="absolute inset-y-0 left-0 overflow-hidden">
							<Star className={`max-w-none shrink-0 text-primary-45 fill-primary-45 ${starClassName}`} />
						</div>
					</div>
				)
			})}
		</div>
	)
}