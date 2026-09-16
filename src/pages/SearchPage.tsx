import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { useSearchMovies } from "../hooks/Search/useSearchMovies";
import { useSearchTVShows } from "../hooks/Search/useSearchTVShows";
import { useSearchPeople } from "../hooks/Search/useSearchPeople";
import { useInfiniteScrollObserver } from "../hooks/useInfiniteScrollObserver";
import { MovieResultCard } from "../components/search/MovieResultCard";
import { TvResultCard } from "../components/search/TvResultCard";
import { PersonResultCard } from "../components/search/PersonResultCard";
import { uniqueById } from "../utils/array";


type SearchTab = "movie" | "tv" | "person";

interface SearchLocationState {
	initialTab?: SearchTab;
}

export function SearchPage() {
	const [searchParams] = useSearchParams();
	const location = useLocation();

	const query = searchParams.get("q") ?? "";

	const state = location.state as SearchLocationState | null;
	const initialTab = state?.initialTab;

	const [activeTab, setActiveTab] = useState<SearchTab>(
		initialTab ?? "movie"
	);

	const {
		data: movies,
		isLoading: isMoviesLoading,
		hasNextPage: hasMoreMovies,
		isFetchingNextPage: isFetchingMoreMovies,
		fetchNextPage: fetchMoreMovies,
	} = useSearchMovies(query);

	const {
		data: tvShows,
		isLoading: isTVShowsLoading,
		hasNextPage: hasMoreTV,
		isFetchingNextPage: isFetchingMoreTV,
		fetchNextPage: fetchMoreTV,
	} = useSearchTVShows(query);

	const {
		data: people,
		isLoading: isPeopleLoading,
		hasNextPage: hasMorePeople,
		isFetchingNextPage: isFetchingMorePeople,
		fetchNextPage: fetchMorePeople,
	} = useSearchPeople(query);

	const movieSentinelRef = useInfiniteScrollObserver({
		hasNextPage: hasMoreMovies,
		isFetchingNextPage: isFetchingMoreMovies,
		fetchNextPage: fetchMoreMovies,
	});

	const tvSentinelRef = useInfiniteScrollObserver({
		hasNextPage: hasMoreTV,
		isFetchingNextPage: isFetchingMoreTV,
		fetchNextPage: fetchMoreTV,
	});

	const personSentinelRef = useInfiniteScrollObserver({
		hasNextPage: hasMorePeople,
		isFetchingNextPage: isFetchingMorePeople,
		fetchNextPage: fetchMorePeople,
	});

	useEffect(() => {
		if (initialTab) {
			setActiveTab(initialTab);
		}
	}, [initialTab]);

	const movieResults = useMemo(
		() => uniqueById(movies?.pages.flatMap((page) => page.results) ?? []),
		[movies]
	);

	const tvResults = useMemo(
		() => uniqueById(tvShows?.pages.flatMap((page) => page.results) ?? []),
		[tvShows]
	);

	const personResults = useMemo(
		() => uniqueById(people?.pages.flatMap((page) => page.results) ?? []),
		[people]
	);

	const counts = {
		movie: movies?.pages[0]?.total_results ?? 0,
		tv: tvShows?.pages[0]?.total_results ?? 0,
		person: people?.pages[0]?.total_results ?? 0,
	};

	const isLoading =
		isMoviesLoading ||
		isTVShowsLoading ||
		isPeopleLoading;

	const handleTabChange = (tab: SearchTab) => {
		setActiveTab(tab);
		window.scrollTo({ top: 0, });
	};

	return (
		<div className="py-8 flex flex-col gap-[80px] laptop:gap-[100px] desktop:gap-[180px]">
			<div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8">

				{/* Sidebar */}
				<aside className="lg:sticky lg:top-6 self-start">
					<div className="overflow-hidden rounded-xl border border-surface-15 bg-surface-10">
						<div className="bg-accent px-5 py-4">
							<h2 className="text-lg font-semibold text-white">
								Search Results
							</h2>
						</div>

						<div className="p-2">
							<button
								type="button"
								onClick={() => handleTabChange("tv")}
								className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${activeTab === "tv"
									? "bg-surface-15 text-white"
									: "text-gray-300 hover:bg-surface-15"
									}`}
							>
								<span>TV Shows</span>

								<span className="px-2.5 py-1 rounded-full bg-surface-20 text-sm text-gray-300">
									{counts.tv}
								</span>
							</button>

							<button
								type="button"
								onClick={() => handleTabChange("movie")}
								className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${activeTab === "movie"
									? "bg-surface-15 text-white"
									: "text-gray-300 hover:bg-surface-15"
									}`}
							>
								<span>Movies</span>

								<span className="px-2.5 py-1 rounded-full bg-surface-20 text-sm text-gray-300">
									{counts.movie}
								</span>
							</button>

							<button
								type="button"
								onClick={() => handleTabChange("person")}
								className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${activeTab === "person"
									? "bg-surface-15 text-white"
									: "text-gray-300 hover:bg-surface-15"
									}`}
							>
								<span>People</span>

								<span className="px-2.5 py-1 rounded-full bg-surface-20 text-sm text-gray-300">
									{counts.person}
								</span>
							</button>
						</div>
					</div>
				</aside>

				{/* Results */}
				<section>
					<div className="mb-6">
						<h1 className="text-2xl font-bold text-white">
							Search results for "{query}"
						</h1>
					</div>

					{isLoading && (
						<div className="flex justify-center py-16">
							<Loader2 className="w-6 h-6 text-primary-45 animate-spin" />
						</div>
					)}

					{!isLoading && activeTab === "movie" && (
						<>
							{movieResults.length === 0 ? (
								<div className="py-16 text-center text-gray-400">
									Ничего не найдено по запросу «{query}»
								</div>
							) : (
								<div className="flex flex-col gap-4">
									{movieResults.map((movie) => (
										<MovieResultCard key={movie.id} movie={movie} />
									))}
								</div>
							)}

							<div ref={movieSentinelRef} className="h-1" />

							{isFetchingMoreMovies && (
								<div className="flex justify-center py-6">
									<Loader2 className="w-6 h-6 text-primary-45 animate-spin" />
								</div>
							)}

							{!hasMoreMovies && movieResults.length > 0 && (
								<p className="py-6 text-center text-sm text-gray-500">
									Больше результатов нет
								</p>
							)}
						</>
					)}

					{!isLoading && activeTab === "tv" && (
						<>
							{tvResults.length === 0 ? (
								<div className="py-16 text-center text-gray-400">
									Ничего не найдено по запросу «{query}»
								</div>
							) : (
								<div className="flex flex-col gap-4">
									{tvResults.map((show) => (
										<TvResultCard key={show.id} show={show} />
									))}
								</div>
							)}

							<div ref={tvSentinelRef} className="h-1" />

							{isFetchingMoreTV && (
								<div className="flex justify-center py-6">
									<Loader2 className="w-6 h-6 text-primary-45 animate-spin" />
								</div>
							)}

							{!hasMoreTV && tvResults.length > 0 && (
								<p className="py-6 text-center text-sm text-gray-500">
									Больше результатов нет
								</p>
							)}
						</>
					)}

					{!isLoading && activeTab === "person" && (
						<>
							{personResults.length === 0 ? (
								<div className="py-16 text-center text-gray-400">
									Ничего не найдено по запросу «{query}»
								</div>
							) : (
								<div className="flex flex-col gap-4">
									{personResults.map((person) => (
										<PersonResultCard key={person.id} person={person} />
									))}
								</div>
							)}

							<div ref={personSentinelRef} className="h-1" />

							{isFetchingMorePeople && (
								<div className="flex justify-center py-6">
									<Loader2 className="w-6 h-6 text-primary-45 animate-spin" />
								</div>
							)}

							{!hasMorePeople && personResults.length > 0 && (
								<p className="py-6 text-center text-sm text-gray-500">
									Больше результатов нет
								</p>
							)}
						</>
					)}
				</section>
			</div>
		</div>
	);
}
