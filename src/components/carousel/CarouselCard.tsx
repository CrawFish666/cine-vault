import { Link } from "react-router-dom";

type CarouselCardProps = {
	children: React.ReactNode;
	className?: string;
} & (
		| { to: string; href?: never }
		| { href: string; to?: never }
		| { to?: never; href?: never }
	);

export function CarouselCard(props: CarouselCardProps) {
	const classes = `bg-surface-10 rounded-[10px] border border-surface-15 overflow-hidden ${props.className ?? ""}`;

	if (props.to) {
		return (
			<Link to={props.to} className={classes}>
				{props.children}
			</Link>
		);
	}

	if (props.href) {
		return (
			<a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
				{props.children}
			</a>
		);
	}

	return (
		<div className={classes}>
			{props.children}
		</div>
	);
}