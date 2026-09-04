import { Bookmark } from "lucide-react";
import { useWatchListStore, type WatchListItem, type WatchListItemInput } from "../store/watchlistStore";

interface WatchlistButtonProps {
	item: WatchListItemInput;
	className?: string;
	classNameIcon?: string;
	variant?: "default" | "overlay";
}

const buttonVariants = {
	default: "",
	overlay: "flex items-center justify-center p-1.5 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors",
} as const;

export function WatchlistButton({ item, className = "", classNameIcon = "", variant = "overlay" }: WatchlistButtonProps) {
	const toggleItem = useWatchListStore((state) => state.toggleItem);
	const added = useWatchListStore((state) => state.items.some((i) => i.id === item.id && i.mediaType === item.mediaType))



	return (
		<button onClick={() => toggleItem(item)} className={`${buttonVariants[variant]} ${className} cursor-pointer `}>
			<Bookmark className={`${classNameIcon} ${added ? "fill-yellow-400 text-yellow-400" : "text-white fill-white"}`} />
		</button>
	)
}

// border border-surface-15 bg-surface-06