export function uniqueById<T extends { id: string | number }>(items: T[]): T[] {
	return Array.from(
		items.reduce((map, item) => {
			if (!map.has(item.id)) {
				map.set(item.id, item);
			}

			return map;
		}, new Map<T["id"], T>()).values()
	);
}