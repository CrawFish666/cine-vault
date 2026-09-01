import type { EmblaViewportRefType } from "embla-carousel-react";

type CarouselProps = {
	emblaRef: EmblaViewportRefType;
	children: React.ReactNode;
	className?: string;
};

export function Carousel(props: CarouselProps) {
	return (
		<div className="embla">
			<div ref={props.emblaRef} className="embla__viewport overflow-hidden">
				<div className={`embla__container flex touch-pan-y touch-pinch-zoom ${props.className}`}>
					{props.children}
				</div>
			</div>
		</div>
	)
}