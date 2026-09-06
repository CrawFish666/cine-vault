import { NavLink } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { ROUTES } from "../../routes/pathConstants";
import { NavLinkList } from "./NavLinkList";
import { SearchPanel } from "./SearchPanel";

interface MobileMenuProps {
	onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {


	return (
		<nav
			id="mobile-menu"
			className="md:hidden fixed inset-x-0 top-[72px] h-[calc(100dvh-72px)] flex flex-col gap-2 px-4 pt-6 pb-6 bg-surface-06 z-50 text-white overflow-y-auto"
		>
			<div className="mb-4">
				<SearchPanel variant="inline" onClose={onClose} />
			</div>

			<NavLinkList
				onLinkClick={onClose}
				itemClassName={(isActive) =>
					`px-2 py-3 rounded-lg transition-colors self-start ${isActive ? "text-primary-45" : "hover:text-primary-45"}`
				}
			/>

			<div className="border-t border-surface-20 inline-flex">
				<NavLink
					to={ROUTES.WATCHLIST}
					onClick={onClose}
					className={({ isActive }) =>
						`flex items-center gap-2 px-2 py-3 mt-auto pt-4 self-start ${isActive ? "text-primary-45" : "hover:text-primary-45"}`
					}
				>
					<Bookmark className="w-5 h-5" />
					<span>Watchlist</span>
				</NavLink>
			</div>
		</nav>
	);
}