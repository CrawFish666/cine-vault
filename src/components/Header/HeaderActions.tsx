import { NavLink } from "react-router-dom";
import { Bookmark, Search, X } from "lucide-react";
import { ROUTES } from "../../routes/pathConstants";

interface HeaderActionsProps {
	onSearchToggle: () => void;
	isSearchOpen: boolean;
}

export function HeaderActions({ onSearchToggle, isSearchOpen }: HeaderActionsProps) {
	return (
		<div className="hidden md:flex items-center gap-5">
			<button aria-label="Поиск" className="hover:text-primary-45" onClick={onSearchToggle}>
				{!isSearchOpen ? <Search className="w-6 h-6" /> : <X className="w-6 h-6" />}
			</button>
			<NavLink
				to={ROUTES.WATCHLIST}
				className={({ isActive }) => `hover:text-primary-45 ${isActive ? "text-primary-45" : ""}`}
				aria-label="Watchlist"
			>
				<Bookmark className="w-6 h-6" />
			</NavLink>
		</div>
	);
}