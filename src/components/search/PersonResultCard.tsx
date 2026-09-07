import { memo } from "react";
import type { Person } from "../../types/tmdb";
import { TmdbImage } from "../ui/TmdbImage";
import { getProfileUrl } from "../../utils/tmdbImage";

type PersonResultCardProps = {
	person: Person;
};

function PersonResultCardImpl({ person }: PersonResultCardProps) {
	return (
		<article className="flex overflow-hidden rounded-xl border border-surface-15 bg-surface-10 animate-[fadeIn_0.3s_ease-out]">
			<div className="w-20 sm:w-[100px] shrink-0 bg-surface-15">
				<TmdbImage
					alt={person.name}
					src={getProfileUrl(person.profile_path, "w185")}
					className="w-full h-full"
					decoding="async"
					loading="lazy" />
			</div>

			<div className="min-w-0 p-3 sm:p-4">
				<h2 className="text-sm sm:text-base font-semibold text-white line-clamp-1">
					{person.name}
				</h2>

				<p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400">
					{person.known_for_department}
				</p>

				<p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-300 line-clamp-2 sm:line-clamp-none">
					{person.known_for
						.slice(0, 3)
						.map((item) => (item.media_type === "movie" ? item.title : item.name))
						.join(", ")}
				</p>
			</div>
		</article>
	);
}

export const PersonResultCard = memo(PersonResultCardImpl);
