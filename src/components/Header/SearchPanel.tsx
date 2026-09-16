import { Search } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useSearchMulti } from "../../hooks/Search/useSearchMulti";
import { SearchResults } from "./SearchResults";
import { useDebounce } from "../../hooks/useDebounce";


// type SearchTab = "movie" | "tv" | "person";

interface SearchPanelProps {
	onClose: () => void;
	variant?: "dropdown" | "inline";
}

export function SearchPanel({ onClose, variant = "dropdown" }: SearchPanelProps) {

	const navigate = useNavigate();

	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query, 400);
	const { data, isLoading, isError } = useSearchMulti(debouncedQuery);

	const results = data?.pages[0]?.results ?? [];

	const navigateToSearch = (
		searchQuery: string,
		initialTab: "movie" | "tv" | "person"
	) => {
		navigate(`/search?q=${encodeURIComponent(searchQuery)}`, {
			state: {
				initialTab,
			},
		});
		onClose();
	};

	const handleKeyDown = (
		event: KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key !== "Enter") return;

		const firstResult = results[0];

		if (!firstResult) return;

		navigateToSearch(query, firstResult.media_type);
	};

	const searchPanelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (variant !== "dropdown") return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchPanelRef.current &&
				!searchPanelRef.current.contains(event.target as Node)
			) {
				setQuery("");
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [variant]);
	

	const wrapperClasses =
		variant === "dropdown"
			? "border-t border-surface-15 bg-surface-12 absolute inset-x-0"
			: "";

	const innerClasses =
		variant === "dropdown"
			? "w-full flex flex-col gap-5 py-6 max-w-[1600px] mx-auto px-4 min-[1280px]:px-[clamp(16px,calc(15vw_-_176px),40px)] laptop:px-10 2xl:px-[clamp(0px,calc(-10.417vw_+_200px),40px)]"
			: "w-full flex flex-col gap-5";

	return (
		<div className={wrapperClasses} ref={searchPanelRef}>
			<div className={innerClasses}>
				<div className="flex items-center gap-4">
					<Search className="w-6 h-6 text-gray-400" />

					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search for movies, TV shows..."
						className="flex-1 bg-transparent outline-none text-white"
						onKeyDown={handleKeyDown}
					/>


				</div>

				{isLoading && <div className=" text-white">Loading...</div>}

				{isError && <div className=" text-white">Something went wrong</div>}

				{data && results.length > 0 && (
					<SearchResults
						results={results}
						onResultClick={navigateToSearch}
					/>
				)}

				{data && results.length === 0 && (
					<div className=" text-white">
						Ничего не найдено
					</div>
				)}

			</div>
		</div>
	);
}