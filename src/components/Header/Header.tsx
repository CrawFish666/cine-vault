import { useEffect, useState } from "react"
import Logo from "../../assets/Logo.svg?react"
import { Bookmark, Menu, Search, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/pathConstants";
import { DesktopNav } from "./DesktopNav";
import { HeaderActions } from "./HeaderActions";
import { MobileMenu } from "./MobileMenu";
import { SearchPanel } from "./SearchPanel";

export function Header() {

	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const [searchIsOpen, setSearchIsOpen] = useState(false);
	const toggleSearch = () => {
		setSearchIsOpen((prev) => !prev);
	};
	const closeSearch = () => {
		setSearchIsOpen(false);
	};


	useEffect(() => {
		document.body.style.overflow = menuIsOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuIsOpen]);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMenuIsOpen(false);
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, []);

	return (
		<header className="relative ">
			<div className="w-full laptop:max-w-[1280px] desktop:max-w-[1600px] mx-auto px-4 laptop:px-0 text-white flex items-center justify-between py-4">

				<div className="inline-flex items-center gap-0.5">
					<Logo className="w-[35px] h-[35px] text-primary-45" />
					<div className="font-bold">Cine Vault</div>
				</div>

				{/* Nav на desktop */}
				<DesktopNav />
				{/* Кнопки на desktop */}
				<HeaderActions onSearchToggle={toggleSearch} isSearchOpen={searchIsOpen} />


				{/* Кнопка burger-menu на мобилке */}
				<button
					onClick={() => setMenuIsOpen((prev) => !prev)}
					type="button"
					className="md:hidden p-3 border-4 border-surface-15 bg-surface-10 rounded-xl"
				>
					{menuIsOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>
			</div>

			{/* Выпадающий список при открытом burder-menu */}
			{menuIsOpen && <MobileMenu onClose={() => setMenuIsOpen(false)} />}

			{searchIsOpen && <SearchPanel />}
		</header>
	);
}