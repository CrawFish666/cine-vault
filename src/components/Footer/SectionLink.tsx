import { Link } from "react-router-dom";

type SectionLinkProps = {
	to: string;
	id: string;
	label: string;
};

export function SectionLink({
	to,
	id,
	label,
}: SectionLinkProps) {
	return (
		<Link to={`${to}#${id}`}>
			{label}
		</Link>
	);
}