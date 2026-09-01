import { Bookmark } from "lucide-react";
import { useWatchListStore, type WatchListItem, type WatchListItemInput } from "../store/watchlistStore";

interface WatchlistButtonProps {
	item: WatchListItemInput;
	className?: string;
}

export function WatchlistButton({ item, className }: WatchlistButtonProps) {
	const toggleItem = useWatchListStore((state) => state.toggleItem);
	const added = useWatchListStore((state) => state.items.some((i) => i.id === item.id && i.mediaType === item.mediaType))



	return (
		<button onClick={() => toggleItem(item)} className={`${className} cursor-pointer`}>
			<Bookmark className={`w-5 h-5 ${added ? "fill-yellow-400 text-yellow-400" : "text-yellow-400 fill-white"}`} />
		</button>
	)
}