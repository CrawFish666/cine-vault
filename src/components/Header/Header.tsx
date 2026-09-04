import { useEffect, useRef, useState } from "react"
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
	// const isScrollVisible = useScrollDirection();
	const isHeaderVisible = useScrollDirection();
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
		<header className={`sticky w-full top-0 z-50 transition-transform duration-300 ${isHeaderVisible
			? "translate-y-0"
			: "-translate-y-26"
				}`}>
			<div className={`bg-surface-08 `}>
				<div className="w-full max-w-[1600px] mx-auto px-4 min-[1280px]:px-[clamp(16px,calc(15vw_-_176px),40px)] laptop:px-10 2xl:px-[clamp(0px,calc(-10.417vw_+_200px),40px)] text-white flex items-center justify-between py-4">

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
			</div>

			{searchIsOpen && (
				<div className="relative">
					<SearchPanel onClose={closeSearch} />
				</div>
			)}
		</header>
	);
}





export function useScrollDirection(enabled = true) {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		if (!enabled) return;

		let previousScrollY = window.scrollY;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollDifference = currentScrollY - previousScrollY;

			if (currentScrollY <= 0) {
				setIsVisible(true);
				previousScrollY = currentScrollY;
				return;
			}

			if (Math.abs(scrollDifference) < 20) {
				return;
			}

			setIsVisible(scrollDifference < 0);
			previousScrollY = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, {
			passive: true,
		});

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [enabled]);

	return isVisible;
}