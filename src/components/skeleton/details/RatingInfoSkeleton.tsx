import { Star } from "lucide-react";



export function RatingInfoSkeleton() {
	return (
		<div className="flex flex-col gap-3.5 items-start">
			<div className="flex gap-1">
				<Star className="w-6 h-6 text-neutral-60" />
				<h3 className="text-neutral-60 text-lg font-medium">
					Рейтинг
				</h3>
			</div>

			<div className="w-full h-[125px] bg-surface-15 animate-pulse"></div>
		</div>
	);
}