import { WatchlistButton } from "../../WatchlistButton";
import { TrailerButton } from "./TrailerButton";
import { ShareButton } from "./ShareButton";
import { IMDbButton } from "./IMDbButton";

import type { WatchListItemInput } from "../../../store/watchlistStore";

interface HeroActionButtonsProps {
	trailerKey?: string;
	imdbId?: string | null;
	watchlistItem: WatchListItemInput;
	onTrailerClick: () => void;
	onShareClick: () => void;
}

export function HeroActionButtons({
	trailerKey,
	imdbId,
	watchlistItem,
	onTrailerClick,
	onShareClick,
}: HeroActionButtonsProps) {
	return (
		<div className="flex flex-col md:flex-row gap-2 md:gap-5 items-center">
			{trailerKey && (
				<TrailerButton onClick={onTrailerClick} />
			)}

			{/* <button type="button"
				className="p-3.5 bg-surface-06 border border-surface-15 rounded-lg flex items-center justify-center">
				<WatchlistButton
					classNameIcon="w-7 h-7"
					item={watchlistItem}
				/>
			</button> */}

			<div className="flex gap-5 ">
				<WatchlistButton
					className="p-3.5 bg-surface-06 border border-surface-15 rounded-lg flex items-center justify-center"
					classNameIcon="w-7 h-7"
					item={watchlistItem}
				/>

				<ShareButton classNameIcon="w-7 h-7" className="p-3.5" onClick={onShareClick} />

				{imdbId && (
					<IMDbButton className="p-3.5" imdbId={imdbId} />
				)}
			</div>
		</div>
	);
}