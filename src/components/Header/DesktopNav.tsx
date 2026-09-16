import { NavLinkList } from "./NavLinkList";

export function DesktopNav() {
	return (
		<div className="hidden md:flex items-center gap-8 bg-surface-06 py-2 px-3.5 border-4 border-surface-12 rounded-xl text-neutral-75">
			<nav className="flex items-center gap-1">
				<NavLinkList
					itemClassName={(isActive) =>
						`px-4 py-3 rounded-xl transition-colors ${isActive ? "bg-surface-10 text-white" : "hover:text-white hover:bg-surface-10"
						}`
					}
				/>
			</nav>
		</div>
	);
}