import { useEffect, useRef } from "react";
import type { EmblaCarouselType } from "embla-carousel";

type CarouselProgressProps = {
	emblaApi: EmblaCarouselType | undefined;
	className?: string;
};

export function CarouselProgress({
	emblaApi,
	className = ""
}: CarouselProgressProps) {
	const barRef = useRef<HTMLDivElement>(null);
	const rafId = useRef<number | null>(null);

	useEffect(() => {
		if (!emblaApi) return;

		const update = () => {
			if (rafId.current !== null) return;
			rafId.current = requestAnimationFrame(() => {
				const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
				if (barRef.current) {
					barRef.current.style.transform = `scaleX(${progress})`;
				}
				rafId.current = null;
			});
		};

		update();
		emblaApi.on("scroll", update);
		emblaApi.on("reInit", update);
		emblaApi.on("slideFocus", update);

		return () => {
			emblaApi.off("scroll", update);
			emblaApi.off("reInit", update);
			emblaApi.off("slideFocus", update);
			if (rafId.current !== null) cancelAnimationFrame(rafId.current);
		};
	}, [emblaApi]);

	return (
		<div className={`h-1 w-20 mx-auto mt-4 overflow-hidden bg-surface-20 rounded-full ${className}`}>
			<div
				ref={barRef}
				className="h-full bg-primary-45 rounded-full origin-left"
				style={{ transform: "scaleX(0)" }}
			/>
		</div>
	);
}