import { ArrowLeft, ArrowRight } from "lucide-react";
import type { EmblaViewportRefType } from "embla-carousel-react";


type BaseProps = {
	title: string;
}

type ControlsProps = {
	showControls: true;
	controlsVisibility?: ControlsVisibility;
	prevButtonDisabled: boolean;
	nextButtonDisabled: boolean;
	scrollSnaps: number[]
	selectedIndex: number;
	emblaDotsRef: EmblaViewportRefType;
	scrollPrev: () => void;
	scrollNext: () => void;
}

type NoControlsProps = {
	showControls?: false;
}

type ControlsVisibility = "sm" | "md" | "lg" | "xl" | "always";

type CarouselHeaderProps = BaseProps & (ControlsProps | NoControlsProps);

const MAX_DOTS = 4;

const controlsVisibilityClasses = {
	sm: "hidden sm:flex",
	md: "hidden md:flex",
	lg: "hidden lg:flex",
	xl: "hidden xl:flex",
	always: "flex",
};

export function CarouselHeader(props: CarouselHeaderProps) {
	return(
		<div className="flex justify-between items-center gap-2 mb-[clamp(20px,calc(2.083vw+10px),50px)]">
			<h2 className="font-bold text-3xl text-white">{props.title}</h2>

			{props.showControls && 
				<div className={`${controlsVisibilityClasses[props.controlsVisibility ?? "md"]} items-center p-2.5 bg-surface-06 rounded-[10px] border border-surface-12 gap-2.5`}>
					<button disabled={props.prevButtonDisabled} className="embla__prev cursor-pointer p-2 rounded-md bg-surface-10 border border-surface-12 disabled:opacity-30 disabled:cursor-not-allowed" onClick={props.scrollPrev}>
						<ArrowLeft className="w-6 h-6 text-white" />
					</button>

					<div className="overflow-hidden" ref={props.emblaDotsRef} style={{ maxWidth: `${MAX_DOTS * 14}px` }}>
						<div className="flex gap-2">
							{props.scrollSnaps.map((_, index) => (
								<div
									key={index}
									
									className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-200 ${index === props.selectedIndex ? "bg-primary-45" : "bg-surface-20"
										}`}
								/>
							))}
						</div>
					</div>

					<button disabled={props.nextButtonDisabled} className="embla__next cursor-pointer p-2 rounded-md bg-surface-10 border border-surface-12 disabled:opacity-30 disabled:cursor-not-allowed" onClick={props.scrollNext}>
						<ArrowRight className="w-6 h-6 text-white" />
					</button>
				</div>
			}

		</div>
	)
}