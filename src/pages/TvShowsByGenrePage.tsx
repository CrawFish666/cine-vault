import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useInfiniteScrollObserver } from "../hooks/useInfiniteScrollObserver";
import { MovieGridCard } from "../components/movies/MovieGridCard";
import { ROUTES } from "../routes/pathConstants";
import { uniqueById } from "../utils/array";
import { MovieGridCardSkeleton } from "../components/skeleton/MovieGridCardSkeleton";
import { useTvShowsByGenre } from "../hooks/TVShows/useTvShowsByGenre";
import { useTVGenres } from "../hooks/TVShows/useTVGenres";
import { TvShowGridCardSkeleton } from "../components/tvshows/TvShowGridCardSkeleton";
import { TvShowGridCard } from "../components/tvshows/TvShowGridCard";

export function TvShowsByGenrePage() {
	const { id } = useParams();
	const genreId = Number(id);

	const { data: genres } = useTVGenres();
	const genreName = genres?.find((genre) => genre.id === genreId)?.name;

	const {
		data,
		isLoading,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useTvShowsByGenre(genreId);

	const sentinelRef = useInfiniteScrollObserver({
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	});

	const tvShows = useMemo(
		() => uniqueById(data?.pages.flatMap((page) => page.results) ?? []),
		[data]
	);

	return (
		<div className="py-8">
			<Link
				to={ROUTES.TV_SHOWS}
				className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4"
			>
				<ArrowLeft className="w-4 h-4" />
				Назад к сериалам
			</Link>

			<h1 className="text-2xl font-bold text-white mb-6">
				{genreName
					? `Жанр: ${genreName.charAt(0).toUpperCase() + genreName.slice(1)}`
					: "Сериалы по жанру"}
			</h1>

			{isLoading && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
					{Array.from({ length: 16 }).map((_, index) => (
						<TvShowGridCardSkeleton key={index} />
					))}
				</div>

			)}

			{!isLoading && tvShows.length === 0 && (
				<div className="py-16 text-center text-gray-400">
					Фильмы не найдены
				</div>
			)}

			{!isLoading && tvShows.length > 0 && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
					{tvShows.map((tvShow) => (
						<TvShowGridCard key={tvShow.id} tvShow={tvShow} genres={genres ?? []}/>
					))}
				</div>
			)}

			<div ref={sentinelRef} className="h-1" />

			{isFetchingNextPage && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
					{Array.from({ length: 16 }).map((_, index) => (
						<TvShowGridCardSkeleton key={index} />
					))}
				</div>
			)}

			{!hasNextPage && tvShows.length > 0 && (
				<p className="py-6 text-center text-sm text-gray-500">
					Больше фильмов нет
				</p>
			)}
		</div>
	);
}
