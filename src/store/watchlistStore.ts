import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type MediaType = "movie" | "tv";

export type WatchListItemInput = {
	id: number;
	mediaType: MediaType;
	title: string;
	posterPath: string | null;
	voteAverage: number;
};

export type WatchListItem = WatchListItemInput & {
	addedAt: number;
};

type WatchListStore = {
	items: WatchListItem[];

	addItem: (item: WatchListItemInput) => void;

	removeItem: (id: number, mediaType: WatchListItem["mediaType"]) => void;

	toggleItem: (item: WatchListItemInput) => void;

	isInWatchlist: (id: number, mediaType: WatchListItem["mediaType"]) => boolean;

	clear: () => void;
}



export const useWatchListStore = create<WatchListStore>()(
	persist(
		(set, get) => ({
			items: [], // initial пустой массив

			addItem: (item) => set((state) => {
				const exist = state.items.some((i) => i.id === item.id && i.mediaType === item.mediaType);

				if (exist) {
					return state;
				}

				return {
					items: [{...item, addedAt: Date.now()}, ...state.items]
				}
			}),

			removeItem: (id, mediaType) => set((state) => ({
				items: state.items.filter((i) => !(i.id === id && i.mediaType === mediaType))
			})),

			toggleItem: (item) => {
				const exist = get().isInWatchlist(item.id, item.mediaType)

				if (exist) {
					get().removeItem(item.id, item.mediaType)
				} else {
					get().addItem(item)
				}
			},

			isInWatchlist: (id, mediaType) => get().items.some((i) => i.id === id && i.mediaType === mediaType),

			clear: () => set({ items: [] })
		}),
		{
			name: "watchlist-storage"
		}
	)
)