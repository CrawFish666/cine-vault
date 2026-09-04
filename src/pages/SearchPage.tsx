import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";


import { useSearchMovies } from "../hooks/Search/useSearchMovies";
import { useSearchTVShows } from "../hooks/Search/useSearchTVShows";
import { useSearchPeople } from "../hooks/Search/useSearchPeople";
import { ROUTES } from "../routes/pathConstants";

// import { useSearchMovies } from "../../hooks/Search/useSearchMovies";
// import { useSearchTVShows } from "../../hooks/Search/useSearchTVShows";
// import { useSearchPeople } from "../../hooks/Search/useSearchPeople";

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
	} = useSearchMovies(query);

	const {
		data: tvShows,
		isLoading: isTVShowsLoading,
	} = useSearchTVShows(query);

	const {
		data: people,
		isLoading: isPeopleLoading,
	} = useSearchPeople(query);

	useEffect(() => {
		if (initialTab) {
			setActiveTab(initialTab);
		}
	}, [initialTab]);

	const movieResults =
		movies?.pages.flatMap((page) => page.results) ?? [];

	const tvResults =
		tvShows?.pages.flatMap((page) => page.results) ?? [];

	const personResults =
		people?.pages.flatMap((page) => page.results) ?? [];

	const counts = {
		movie: movies?.pages[0]?.total_results ?? 0,
		tv: tvShows?.pages[0]?.total_results ?? 0,
		person: people?.pages[0]?.total_results ?? 0,
	};

	const isLoading =
		isMoviesLoading ||
		isTVShowsLoading ||
		isPeopleLoading;

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
								onClick={() => setActiveTab("tv")}
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
								onClick={() => setActiveTab("movie")}
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
								onClick={() => setActiveTab("person")}
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
						<div className="text-gray-400">
							Loading...
						</div>
					)}

					{!isLoading && activeTab === "movie" && (
						<div className="flex flex-col gap-4">
							{movieResults.map((movie) => (
								<Link to={ROUTES.MOVIE_DETAILS_BY_ID(movie.id)} key={movie.id}>
									<article
										
										className="flex overflow-hidden rounded-xl border border-surface-15 bg-surface-10"
									>
										<div className="w-[100px] shrink-0 bg-surface-15">
											{movie.poster_path && (
												<img
													src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
													alt={movie.title}
													className="w-full h-full object-cover"
												/>
											)}
										</div>

										<div className="min-w-0 p-4">
											<h2 className="font-semibold text-white">
												{movie.title}
											</h2>

											{movie.original_title !== movie.title && (
												<p className="mt-1 text-sm text-gray-400">
													{movie.original_title}
												</p>
											)}

											<p className="mt-2 text-sm text-gray-400">
												{movie.release_date || "—"}
											</p>

											<p className="mt-3 text-sm leading-6 text-gray-300 line-clamp-3">
												{movie.overview || "No overview available."}
											</p>
										</div>
									</article></Link>
							))}
						</div>
					)}

					{!isLoading && activeTab === "tv" && (
						<div className="flex flex-col gap-4">
							{tvResults.map((show) => (
								<Link key={show.id} to={ROUTES.TV_SHOWS_DETAILS_BY_ID(show.id)}>
									<article
										
										className="flex overflow-hidden rounded-xl border border-surface-15 bg-surface-10"
									>
										<div className="w-[100px] shrink-0 bg-surface-15">
											{show.poster_path && (
												<img
													src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
													alt={show.name}
													className="w-full h-full object-cover"
												/>
											)}
										</div>

										<div className="min-w-0 p-4">
											<h2 className="font-semibold text-white">
												{show.name}
											</h2>

											{show.original_name !== show.name && (
												<p className="mt-1 text-sm text-gray-400">
													{show.original_name}
												</p>
											)}

											<p className="mt-2 text-sm text-gray-400">
												{show.first_air_date || "—"}
											</p>

											<p className="mt-3 text-sm leading-6 text-gray-300 line-clamp-3">
												{show.overview || "No overview available."}
											</p>
										</div>
									</article></Link>
							))}
						</div>
					)}

					{!isLoading && activeTab === "person" && (
						<div className="flex flex-col gap-4">
							{personResults.map((person) => (
								<article
									key={person.id}
									className="flex overflow-hidden rounded-xl border border-surface-15 bg-surface-10"
								>
									<div className="w-[100px] shrink-0 bg-surface-15">
										{person.profile_path && (
											<img
												src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
												alt={person.name}
												className="w-full h-full object-cover"
											/>
										)}
									</div>

									<div className="min-w-0 p-4">
										<h2 className="font-semibold text-white">
											{person.name}
										</h2>

										<p className="mt-2 text-sm text-gray-400">
											{person.known_for_department}
										</p>

										<p className="mt-3 text-sm leading-6 text-gray-300">
											{person.known_for
												.slice(0, 3)
												.map((item) =>
													item.media_type === "movie"
														? item.title
														: item.name
												)
												.join(", ")}
										</p>
									</div>
								</article>
							))}
						</div>
					)}
				</section>
			</div>
		</div>
	);
}