
import type { TVShowSeason } from "../../types/tmdb";
import { SeasonAccordion } from "./SeasonAccordion";

interface SeasonsEpisodsSectionProps {
	seriesId: number;
	seasons: TVShowSeason[];
}

export function SeasonsEpisodsSection({ seriesId, seasons }: SeasonsEpisodsSectionProps) {

	return (
		<section className="p-[24px] min-[390px]:p-[clamp(24px,calc(0.5714vw_+_21.7714px),30px)] laptop:p-[clamp(30px,calc(2.0833vw),40px)] bg-surface-10 rounded-xl">
			<h2 className="text-white text-2xl font-semibold mb-10">
				Сезоны и эпизоды
			</h2>


			<div className="[overflow-anchor:none] flex flex-col gap-5">

				{seasons.filter((season) => season.episode_count > 0).map((season) => (
					<SeasonAccordion key={season.id} season={season} seriesId={seriesId} />
				))}

			</div>

		</section>
	)
}