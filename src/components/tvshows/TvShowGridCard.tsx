import { memo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/pathConstants";
import { getPosterUrl } from "../../utils/tmdbImage";
import { TmdbImage } from "../ui/TmdbImage";
import type { Genre, TVShow } from "../../types/tmdb";
import { formatDateTime } from "../../utils/date";
import { Star } from "lucide-react";

type TvShowGridCardProps = {
	tvShow: TVShow;
	genres: Genre[];
};

function TvShowGridCardImpl({ tvShow, genres }: TvShowGridCardProps) {
	const tvShowGenres = tvShow.genre_ids
		.map((id) => genres.find((genre) => genre.id === id)?.name)
		.filter((name): name is string => Boolean(name));

	return (
		<Link
			to={ROUTES.TV_SHOWS_DETAILS_BY_ID(tvShow.id)}
			className="animate-[fadeIn_0.3s_ease-out]"
		>
			<article className="flex h-full overflow-hidden rounded-xl border border-surface-15 bg-surface-10">
				<div className="relative w-32 lg:w-40 shrink-0 bg-surface-15 self-start aspect-[2/3]">
					<TmdbImage
						src={getPosterUrl(tvShow.poster_path, "w342")}
						alt={tvShow.name}
						loading="lazy"
						decoding="async"
						className="w-full h-full"
					/>
					{tvShow.vote_average > 0 && (
						<div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
							<Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
							{Number((tvShow.vote_average / 2).toFixed(1))}
						</div>
					)}
				</div>

				<div className="min-w-0 p-4 flex flex-col gap-2">
					<div>
						<h3 className="font-semibold text-white line-clamp-2">
							{tvShow.name}
						</h3>

						{tvShow.original_name !== tvShow.name && (
							<p className="mt-1 text-sm text-gray-400 line-clamp-1">
								{tvShow.original_name}
							</p>
						)}
					</div>

					<p className="text-sm text-gray-400">
						{tvShow.first_air_date ? formatDateTime(tvShow.first_air_date) : "—"}
					</p>

					{tvShowGenres.length > 0 && (
						<div className="flex flex-wrap gap-1.5">
							{tvShowGenres.map((name) => (
								<span
									key={name}
									className="px-2 py-0.5 rounded-full bg-surface-15 text-xs text-gray-300"
								>
									{name}
								</span>
							))}
						</div>
					)}

					<p className="text-sm leading-6 text-gray-300 line-clamp-5 lg:line-clamp-3">
						{tvShow.overview || "No overview available."}
					</p>
				</div>
			</article>
		</Link>
	);
}

export const TvShowGridCard = memo(TvShowGridCardImpl);

