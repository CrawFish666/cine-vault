import { useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/Movies/useMovieDetails"
import { useState } from "react";
import { HeroBanner } from "../components/details/hero/HeroBanner";
import { DescriptionSection } from "../components/details/DescriptionSection";
import { ReleaseDateInfo } from "../components/details/ReleaseDateInfo";
import { RatingInfo } from "../components/details/RatingInfo";
import { GenresInfo } from "../components/details/GenresInfo";
import { PersonInfo } from "../components/details/PersonInfo";
import { CastSection } from "../components/details/CastSection";
import { ReviewsSection } from "../components/details/ReviewsSection";
import { MovieDetailsPageSkeleton } from "../components/skeleton/MovieDetailsPageSkeleton";

export function MovieDetailsPage() {
	const { id } = useParams();
	const movieId = Number(id);

	const [isTrailerOpen, setIsTrailerOpen] = useState(false);

	const { data, isLoading, isError } = useMovieDetails(movieId);




	if (isLoading) {
		return <MovieDetailsPageSkeleton mediaId={movieId}/>
	}

	if (isError || !data) {
		return <div>Не удалось загрузить фильм</div>;
	}




	const director = data.credits?.crew.find(
		(person) => person.job === "Director"
	);

	const composer = data.credits?.crew.find(
		(person) => person.job === "Original Music Composer"
	);

	const trailer = data.videos?.results.find(
		(video) =>
			video.site === "YouTube" &&
			video.type === "Trailer"
	);
	const handleShare = async () => {
		const url = window.location.href;

		try {
			if (navigator.share) {
				await navigator.share({
					title: data.title,
					url,
				});

				return;
			}

			await navigator.clipboard.writeText(url);

			// показать toast: "Ссылка скопирована"
		} catch {
			// пользователь отменил Share — ничего не делаем
		}
	};


	return (
		<div className="py-8 flex flex-col gap-[80px] laptop:gap-[100px] desktop:gap-[180px]">
			<HeroBanner
				title={data.title}
				overview={data.overview}
				backdropPath={data.backdrop_path}
				trailerKey={trailer?.key}
				imdbId={data.imdb_id}
				watchlistItem={{
					id: data.id,
					mediaType: "movie",
					title: data.title,
					posterPath: data.poster_path,
					voteAverage: data.vote_average,
				}}
				onTrailerClick={() => setIsTrailerOpen(true)}
				onShareClick={handleShare}
			/>

			<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,6fr)_minmax(0,4fr)] min-[1200px]:grid-cols-[minmax(0,53fr)_minmax(0,26fr)] relative gap-5 lg:gap-x-5 lg:gap-y-7.5">
				<div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
					<DescriptionSection overview={data.overview} />
				</div>

				<aside className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-3 self-start bg-surface-10 border border-surface-15 rounded-xl p-[24px] min-[390px]:p-[clamp(24px,calc(0.5714vw_+_21.7714px),30px)] laptop:p-[clamp(30px,calc(2.0833vw),40px)] flex flex-col gap-7.5 lg:sticky lg:top-0">
					<ReleaseDateInfo releaseDate={data.release_date} />
					<RatingInfo voteAverage={data.vote_average} />
					<GenresInfo genres={data.genres} />
					{director && <PersonInfo title="Режиссёр" person={director} />}
					{composer && <PersonInfo title="Композитор" person={composer} />}
				</aside>

				<div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2">
					<CastSection cast={data.credits?.cast ?? []} />
				</div>

				<div className="order-4 lg:order-none lg:col-start-1 lg:row-start-3">
					<ReviewsSection id={movieId} mediaType="movie" />
				</div>
			</div>
			{isTrailerOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5"
					onClick={() => setIsTrailerOpen(false)}
				>
					<div
						className="relative w-full max-w-5xl aspect-video"
						onClick={(event) => event.stopPropagation()}
					>
						<iframe
							className="w-full h-full rounded-xl"
							src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1`}
							title={`${data.title} trailer`}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						/>

						<button
							type="button"
							className="absolute top-2 right-10 text-red-500"
							onClick={() => setIsTrailerOpen(false)}
						>
							Закрыть
						</button>
					</div>
				</div>
			)}
		</div>

	)
}