
interface CarouselSkeletonProps {
	count?: number;
	slideClassName: string;
	gapClassName?: string;
}

export function CarouselSkeleton({ count = 5, slideClassName, gapClassName = "gap-5" }: CarouselSkeletonProps) {
	return (
		<div className={`overflow-hidden flex ${gapClassName}`}>
			{Array.from({ length: count }).map((_, i) => (
				<div
					key={i}
					className={`shrink-0 rounded-[10px] bg-surface-10 animate-pulse ${slideClassName}`}
				/>
			))}
		</div>
	);
}