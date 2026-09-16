import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/pathConstants";
import { navLinks } from "./navLinks";


interface NavLinkListProps {
	itemClassName: (isActive: boolean) => string;
	onLinkClick?: () => void;
}

export function NavLinkList({ itemClassName, onLinkClick }: NavLinkListProps) {
	return (
		<>
			{navLinks.map((link) => (
				<NavLink
					key={link.to}
					to={link.to}
					end={link.to === ROUTES.HOME}
					onClick={onLinkClick}
					className={({ isActive }) => itemClassName(isActive)}
				>
					{link.label}
				</NavLink>
			))}
		</>
	);
}