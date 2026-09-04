import { ArrowDown, ArrowUp, Clock } from "lucide-react";
import type { TVShowSeason } from "../../types/tmdb";
import { pluralizeEpisodes } from "../../utils/pluralize";
import { useState } from "react";
import { useTVSeasonDetails } from "../../hooks/TVShows/useTVSeasonDetails";
import { formatRuntime } from "../../utils/format";


interface SeasonAccordionProps {
	seriesId: number;
	season: TVShowSeason;
}

export function SeasonAccordion({ season, seriesId }: SeasonAccordionProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { data, isLoading, isError } = useTVSeasonDetails({ seriesId, seasonNumber: season.season_number, enabled: isOpen });
	console.log(data)

	return (
		<div className={`p-[10px] min-[390px]:p-[clamp(20px,calc(1.9048vw_+_12.5714px),40px)] laptop:p-[clamp(40px,calc(2.0833vw_+_10px),50px)] border border-surface-15 rounded-xl bg-surface-06 flex flex-col ${isOpen ? "" : ""}`}>
			<div className="flex justify-between gap-10 items-center">
				<div className="flex flex-wrap gap-2.5 items-center">
					<h3 className="text-white text-2xl font-semibold">{season.season_number === 0 ? `${season.name}` : `Сезон ${String(season.season_number).padStart(2, "0")}`}</h3>
					<span className="text-neutral-60 text-lg font-medium">{pluralizeEpisodes(season.episode_count)}</span>
				</div>
				<button onClick={() => setIsOpen((prev) => !prev)} className="p-3 2xl:p-3.5 border border-surface-15 bg-surface-08 rounded-full cursor-pointer">
					<ArrowDown className={`w-5 h-5 2xl:w-6 2xl:h-6 text-neutral-60 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`} />
				</button>
			</div>



			<div
				className={`grid transition-[grid-template-rows, padding-top]  duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] pt-7.5" : "grid-rows-[0fr]"
					}`}
			>
				<div className="overflow-hidden">
					<div className="text-white flex flex-col gap-5">
						{isLoading && <div>Загрузка...</div>}

						{isError && <div>Не удалось загрузить сезон</div>}

						{data?.episodes.map((episode) => (
							<div key={episode.id} className="bg-surface-08  rounded-lg p-4 gap-4 grid grid-rows-[auto_118px] min-[470px]:grid-rows-[auto] min-[390px]:grid-cols-[1fr_3rem] min-[480px]:grid-cols-[258px_auto] min-[580px]:grid-cols-[auto_258px] md:grid-cols-[4rem_172px_1fr] gap-5 items-center  py-10 md:border-t md:border-surface-15 md:px-0 md:rounded-none md:bg-inherit">
								<span className="tabular-nums text-left min-[390px]:text-right min-[580px]:text-left order-1 min-[580px]:order-1 text-center text-2xl text-neutral-60 font-semibold">{String(episode.episode_number).padStart(2, "0")}</span>
								<div className="overflow-hidden order-2 min-[580px]:order-2 border rounded-xl border-surface-15 h-full md:h-auto">
									<img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original${episode.still_path}`} />
								</div>
								<div className="flex flex-col gap-3.5 order-3 col-span-full md:col-auto">
									<div className="flex flex-col items-start min-[580px]:flex-row min-[580px]:justify-between min-[580px]:items-center lg:flex-col lg:items-start xl:flex-row xl:justify-between gap-2.5">
										<h4 className="text-xl text-white font-semibold order-2 min-[580px]:order-1">{episode.name}</h4>
										<div className="shrink-0 flex items-center gap-1 px-2.5 py-2 bg-surface-08 border border-surface-15 rounded-lg order-1 min-[580px]:order-2">
											<Clock className="w-6 h-6 text-neutral-60" />
											<span className="text-base font-medium text-neutral-60">{formatRuntime(episode.runtime)}</span>
										</div>
									</div>
									<p className="text-lg text-neutral-60 font-normal order-3">{episode.overview}</p>
								</div>
							</div>
						))}


					</div>
				</div>
			</div>

			{/* {isOpen && (

				<div className="text-white divide-y divide-surface-15 border-t border-surface-15 ">
					{isLoading && <div>Загрузка...</div>}

					{isError && <div>Не удалось загрузить сезон</div>}

					{data?.episodes.map((episode) => (
						<div key={episode.id} className="grid grid-cols-[4rem_172px_1fr] gap-5 items-center  py-10">
							<span className="tabular-nums text-3xl text-neutral-60 font-semibold">{String(episode.episode_number).padStart(2, "0")}</span>
							<div className="overflow-hidden border rounded-xl border-surface-15">
								<img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original${episode.still_path}`} />
							</div>
							<div className="flex flex-col gap-3.5">
								<div className="flex items-center justify-between">
									<h4 className="text-xl text-white font-semibold">{episode.name}</h4>
									<div className="flex items-center gap-1 px-2.5 py-2 bg-surface-08 border border-surface-15 rounded-lg">
										<Clock className="w-6 h-6 text-neutral-60" />
										<span className="text-base font-medium text-neutral-60">{formatRuntime(episode.runtime)}</span>
									</div>
								</div>
								<p className="text-lg text-neutral-60 font-normal">{episode.overview}</p>
							</div>
						</div>
					))}


				</div>
			)} */}

		</div>
	)
}