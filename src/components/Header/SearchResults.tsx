import { Film, Tv, User } from "lucide-react";
import type { MultiSearchResult } from "../../types/tmdb";

interface SearchResultsProps {
	results: MultiSearchResult[];
	onResultClick: (
		query: string,
		mediaType: MultiSearchResult["media_type"]
	) => void;
}

export function SearchResults({ results, onResultClick }: SearchResultsProps) {
	const firstMovie = results.find(
		(item) => item.media_type === "movie"
	);

	const firstTVShow = results.find(
		(item) => item.media_type === "tv"
	);

	const firstPerson = results.find(
		(item) => item.media_type === "person"
	);

	const featuredResults = [
		firstMovie,
		firstTVShow,
		firstPerson,
	].filter((item): item is MultiSearchResult => item !== undefined);

	const featuredIds = new Set(
		featuredResults.map((item) => `${item.media_type}-${item.id}`)
	);

	const remainingResults = results.filter(
		(item) => !featuredIds.has(`${item.media_type}-${item.id}`)
	).slice(0, 6);

	return (
		<div className="text-white flex flex-col   divide-y border-t border-b border-white">
			{firstMovie && (
				<div
					className="flex gap-2 items-center cursor-pointer"
					onClick={() =>
						onResultClick(firstMovie.title, firstMovie.media_type)
					}
				>
					<Film className="w-4 h-4" />
					<strong>{firstMovie.title}</strong>
					<span>в фильмах</span>
				</div>
			)}
			{firstTVShow && (
				<div
					className="flex gap-2 items-center cursor-pointer"
					onClick={() => onResultClick(firstTVShow.name, firstTVShow.media_type)}
				>
					<Tv className="w-4 h-4" />
					<strong>{firstTVShow.name}</strong>
					<span>в сериалах</span>
				</div>
			)}

			{firstPerson && (
				<div
					className="flex gap-2 items-center cursor-pointer"
					onClick={() => onResultClick(firstPerson.name, firstPerson.media_type)}
				>
					<User className="w-4 h-4" />
					<strong>{firstPerson.name}</strong>
					<span>в людях</span>
				</div>
			)}

			{remainingResults.map((item) => {
				const title =
					item.media_type === "movie"
						? item.title
						: item.media_type === "tv"
							? item.name
							: item.name;

				return (
					<div
						key={`${item.media_type}-${item.id}`}
						className="cursor-pointer"
						onClick={() =>
							onResultClick(title, item.media_type)
						}
					>
						{item.media_type === "movie" &&
							`${item.title} (${item.original_title})`}

						{item.media_type === "tv" &&
							`${item.name} (${item.original_name})`}

						{item.media_type === "person" &&
							item.name}
					</div>
				);
			})}
		</div>
	);
}