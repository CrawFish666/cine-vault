type CarouselProgressProps = {
	scrollProgress: number;
	className?: string;
};

export function CarouselProgress({
	scrollProgress,
	className = ""
}: CarouselProgressProps) {
	return (
		<div className={`h-1 w-20 mx-auto mt-4 overflow-hidden bg-surface-20 rounded-full ${className}`}>
			<div
				className="h-full bg-primary-45 rounded-full transition-[width] duration-150 ease-out"
				style={{ width: `${scrollProgress}%` }}
			/>
		</div>
	);
}