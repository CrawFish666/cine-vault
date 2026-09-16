import { memo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/pathConstants";
import type { TVShow } from "../../types/tmdb";
import { TmdbImage } from "../ui/TmdbImage";
import { getPosterUrl } from "../../utils/tmdbImage";
import { formatDateTime } from "../../utils/date";

type TvResultCardProps = {
	show: TVShow;
};

function TvResultCardImpl({ show }: TvResultCardProps) {
	return (
		<Link
			to={ROUTES.TV_SHOWS_DETAILS_BY_ID(show.id)}
			className="animate-[fadeIn_0.3s_ease-out]"
		>
			<article className="flex overflow-hidden rounded-xl border border-surface-15 bg-surface-10">
				<div className="w-20 sm:w-[185px] shrink-0 bg-surface-15">
					<TmdbImage
						alt={show.name}
						src={getPosterUrl(show.poster_path, "w185")}
						className="w-full h-full"
						decoding="async"
						loading="lazy" />
				</div>

				<div className="min-w-0 p-3 sm:p-4">
					<h2 className="text-sm sm:text-base font-semibold text-white line-clamp-2 sm:line-clamp-1">
						{show.name}
					</h2>

					{show.original_name !== show.name && (
						<p className="hidden sm:block mt-1 text-sm text-gray-400 line-clamp-1">
							{show.original_name}
						</p>
					)}

					<p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400">
						{show.first_air_date ? formatDateTime(show.first_air_date) : "—"}
					</p>

					<p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-300 line-clamp-2 sm:line-clamp-3">
						{show.overview || "No overview available."}
					</p>
				</div>
			</article>
		</Link>
	);
}

export const TvResultCard = memo(TvResultCardImpl);
