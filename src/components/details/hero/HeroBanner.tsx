import { HeroActionButtons } from "./HeroActionButtons";
import type { WatchListItemInput } from "../../../store/watchlistStore";

interface HeroBannerProps {
	title: string;
	overview: string;
	backdropPath: string | null;
	trailerKey?: string;
	imdbId?: string | null;
	watchlistItem: WatchListItemInput;
	onTrailerClick: () => void;
	onShareClick: () => void;
}

export function HeroBanner({
	title,
	overview,
	backdropPath,
	trailerKey,
	imdbId,
	watchlistItem,
	onTrailerClick,
	onShareClick,
}: HeroBannerProps) {
	return (
		<section className="relative flex-[0_0_100%] min-w-0 min-h-[420px] max-h-[835px] overflow-hidden">
			<img className="w-full h-full object-cover border border-surface-15 rounded-xl min-h-[420px] max-h-[835px] "
				src={`https://image.tmdb.org/t/p/original${backdropPath}`}
				alt={title}
			/>

			<div className="absolute inset-0 bg-gradient-to-t from-surface-08 to-transparent" />

			<div className="absolute text-white max-w-[1194px] left-1/2 -translate-x-1/2 bottom-2 md:bottom-5 lg:bottom-10 xl:bottom-20 flex flex-col items-center justify-center w-full gap-2 lg:gap-7.5">
				<div className="flex flex-col items-center">
					<h1 className="text-2xl md:text-3xl 2xl:text-[38px] font-bold text-center">
						{title}
					</h1>

					<p className="hidden lg:block text-lg font-normal text-neutral-60 text-center">
						{overview}
					</p>
				</div>

				<HeroActionButtons
					trailerKey={trailerKey}
					imdbId={imdbId}
					watchlistItem={watchlistItem}
					onTrailerClick={onTrailerClick}
					onShareClick={onShareClick}
				/>
			</div>
		</section>
	);
}