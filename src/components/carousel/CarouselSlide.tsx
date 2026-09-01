type CarouselSlideProps = {
	children: React.ReactNode;
	className?: string;
};

export function CarouselSlide(props: CarouselSlideProps) {
	return (
		<div className={`min-w-0 shrink-0 ${props?.className}`}>
			{props.children}
		</div>
	)
}