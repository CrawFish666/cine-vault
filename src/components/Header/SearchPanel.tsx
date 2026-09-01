import { Search, X } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useSearchMulti } from "../../hooks/Search/useSearchMulti";
import { SearchResults } from "./SearchResults";


type SearchTab = "movie" | "tv" | "person";

export function SearchPanel() {

	const navigate = useNavigate();

	const [query, setQuery] = useState("");
	const { data, isLoading, isError } = useSearchMulti(query);

	const results = data?.pages[0]?.results ?? [];

	const goToSearchPage = (initialTab: SearchTab) => {
		navigate(`/search?q=${encodeURIComponent(query)}`, {
			state: {
				initialTab,
			},
		});
	};

	const navigateToSearch = (
		searchQuery: string,
		initialTab: "movie" | "tv" | "person"
	) => {
		navigate(`/search?q=${encodeURIComponent(searchQuery)}`, {
			state: {
				initialTab,
			},
		});
	};

	const handleKeyDown = (
		event: KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key !== "Enter") return;

		const firstResult = results[0];

		if (!firstResult) return;

		navigateToSearch(query, firstResult.media_type);
	};

	return (
		<div className="border-t border-surface-15 bg-surface-10">
			<div className="w-full max-w-[1600px] mx-auto px-4 py-6">
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

					<button
						type="button"

						className="p-2"
					>

						<X className="w-6 h-6 text-gray-400" />
					</button>
				</div>

				{isLoading && <div>Loading...</div>}

				{isError && <div>Something went wrong</div>}

				{data && (
					<SearchResults
						results={results}
						onResultClick={navigateToSearch}
					/>
				)}

			</div>
		</div>
	);
}