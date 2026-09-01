type CarouselCardProps = {
	children: React.ReactNode;
	className?: string;
};

export function CarouselCard(props: CarouselCardProps) {
	return (
		<div className={`bg-surface-10 rounded-[10px] border border-surface-15 overflow-hidden ${props.className}`}>
			{props.children}
		</div>
	)
}