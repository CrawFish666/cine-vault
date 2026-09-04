interface CarouselHeaderProps {
	title: string;
	variant?: "section" | "subsection";
	children?: React.ReactNode;
	className?: string;
}

export function CarouselHeader2({ title,
	variant = "section",
	children,
	className = ""
}: CarouselHeaderProps) {

	const titleClassName = variant === "section" ? "font-bold text-3xl text-white" : "text-neutral-60 font-medium text-lg";

	return (
		<div className={`flex justify-between items-center gap-2 mb-[clamp(20px,calc(2.083vw+10px),50px)] ${className}`}>
			<h2 className={titleClassName}>
				{title}
			</h2>

			{children}
		</div>
	);
}