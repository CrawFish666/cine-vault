import { ArrowLeft, ArrowRight } from "lucide-react";
import type { EmblaViewportRefType } from "embla-carousel-react";

type ControlsVisibility = "sm" | "md" | "lg" | "xl" | "always";

const controlsVisibilityClasses = {
	sm: "hidden sm:flex",
	md: "hidden md:flex",
	lg: "hidden lg:flex",
	xl: "hidden xl:flex",
	always: "flex",
};

const MAX_DOTS = 4;

type BaseProps = {
	prevButtonDisabled: boolean;
	nextButtonDisabled: boolean;
	scrollPrev: () => void;
	scrollNext: () => void;

	controlsVisibility?: ControlsVisibility;
	variant?: "default" | "circle";

	iconClassName?: string;
};

type PaginationProps = {
	showPagination: true;
	scrollSnaps: number[];
	selectedIndex: number;
	emblaDotsRef: EmblaViewportRefType;
};

type NoPaginationProps = {
	showPagination?: false;
};

type CarouselControlsProps =
	BaseProps & (PaginationProps | NoPaginationProps);

export function CarouselControls({
	prevButtonDisabled,
	nextButtonDisabled,
	scrollPrev,
	scrollNext,
	controlsVisibility = "md",
	variant = "default",
	iconClassName = "w-6 h-6 text-white",
	...props
}: CarouselControlsProps) {

	const buttonClassName =
		variant === "circle"
			? "p-3.5 rounded-full border border-surface-15"
			: "cursor-pointer p-2 rounded-md bg-surface-10 border border-surface-12";

	return (
		<div
			className={`${controlsVisibilityClasses[controlsVisibility]} items-center ${variant === "circle" ? "gap-2.5" : "p-2.5 bg-surface-06 rounded-[10px] border border-surface-12 gap-2.5"
				}
      `}
		>
			<button
				disabled={prevButtonDisabled}
				className={`${buttonClassName} cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed`}
				onClick={scrollPrev}
			>
				<ArrowLeft className={iconClassName} />
			</button>

			{props.showPagination && (
				<div
					className="overflow-hidden"
					ref={props.emblaDotsRef}
					style={{ maxWidth: `${MAX_DOTS * 14}px` }}
				>
					<div className="flex gap-2">
						{props.scrollSnaps.map((_, index) => (
							<div
								key={index}
								className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-200 ${index === props.selectedIndex
									? "bg-primary-45"
									: "bg-surface-20"
									}`}
							/>
						))}
					</div>
				</div>
			)}

			<button
				disabled={nextButtonDisabled}
				className={`${buttonClassName} cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed`}
				onClick={scrollNext}
			>
				<ArrowRight className="w-6 h-6 text-white" />
			</button>
		</div>
	);
}