import { type FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Bookmark, Search } from "lucide-react";
import { ROUTES } from "../../routes/pathConstants";
import { NavLinkList } from "./NavLinkList";

interface MobileMenuProps {
	onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
	const [query, setQuery] = useState("");


	return (
		<nav
			id="mobile-menu"
			className="md:hidden fixed inset-x-0 top-[72px] h-[calc(100dvh-72px)] flex flex-col gap-2 px-4 pt-6 pb-6 bg-surface-06 z-50 text-white overflow-y-auto"
		>
			<div className="flex items-center gap-2 mb-4">
				<Search className="w-5 h-5 text-neutral-60 shrink-0" />
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Поиск фильмов и сериалов"
					className="w-full bg-transparent border-b border-surface-20 focus:border-primary-45 outline-none text-white py-2 placeholder:text-neutral-60 transition-colors"
				/>
			</div>

			<NavLinkList
				onLinkClick={onClose}
				itemClassName={(isActive) =>
					`px-2 py-3 rounded-lg transition-colors ${isActive ? "text-primary-45" : "hover:text-primary-45"}`
				}
			/>

			<NavLink
				to={ROUTES.WATCHLIST}
				onClick={onClose}
				className={({ isActive }) =>
					`flex items-center gap-2 px-2 py-3 mt-auto border-t border-surface-20 pt-4 ${isActive ? "text-primary-45" : "hover:text-primary-45"
					}`
				}
			>
				<Bookmark className="w-5 h-5" />
				Watchlist
			</NavLink>
		</nav>
	);
}