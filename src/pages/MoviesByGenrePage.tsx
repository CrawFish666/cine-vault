import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

import { useGenresMovieList } from "../hooks/Movies/useGenresMovieList";
import { useMoviesByGenre } from "../hooks/Movies/useMoviesByGenre";
import { useInfiniteScrollObserver } from "../hooks/useInfiniteScrollObserver";
import { MovieGridCard } from "../components/movies/MovieGridCard";
import { ROUTES } from "../routes/pathConstants";
import { uniqueById } from "../utils/array";
import { MovieGridCardSkeleton } from "../components/skeleton/MovieGridCardSkeleton";

export function MoviesByGenrePage() {
	const { id } = useParams();
	const genreId = Number(id);

	const { data: genres } = useGenresMovieList();
	const genreName = genres?.find((genre) => genre.id === genreId)?.name;

	const {
		data,
		isLoading,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useMoviesByGenre(genreId);

	const sentinelRef = useInfiniteScrollObserver({
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	});

	const movies = useMemo(
		() => uniqueById(data?.pages.flatMap((page) => page.results) ?? []),
		[data]
	);

	return (
		<div className="py-8">
			<Link
				to={ROUTES.MOVIES}
				className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4"
			>
				<ArrowLeft className="w-4 h-4" />
				Назад к фильмам
			</Link>

			<h1 className="text-2xl font-bold text-white mb-6">
				{genreName
					? `Жанр: ${genreName.charAt(0).toUpperCase() + genreName.slice(1)}`
					: "Фильмы по жанру"}
			</h1>

			{isLoading && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
					{Array.from({ length: 16 }).map((_, index) => (
						<MovieGridCardSkeleton key={index} />
					))}
				</div>

			)}

			{!isLoading && movies.length === 0 && (
				<div className="py-16 text-center text-gray-400">
					Фильмы не найдены
				</div>
			)}

			{!isLoading && movies.length > 0 && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
					{movies.map((movie) => (
						<MovieGridCard key={movie.id} movie={movie} genres={genres ?? []} />
					))}
				</div>
			)}

			<div ref={sentinelRef} className="h-1" />

			{isFetchingNextPage && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
					{Array.from({ length: 16 }).map((_, index) => (
						<MovieGridCardSkeleton key={index} />
					))}
				</div>
			)}

			{!hasNextPage && movies.length > 0 && (
				<p className="py-6 text-center text-sm text-gray-500">
					Больше фильмов нет
				</p>
			)}
		</div>
	);
}
