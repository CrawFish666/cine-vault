export function formatVoteCount(count: number) {
	if(count < 50) {
		return `0.1K`
	}

	if (count < 1000) {
		return `${Math.round(count / 100) / 10}K`;
	}

	if (count < 1000000) {
		return `${Math.round(count / 100) / 10}K`;
	}

	return `${Math.round(count / 100000) / 10}M`;
}

export function formatRuntime(minutes: number | null | undefined): string {
	if (!minutes) return "—";
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${hours}h ${mins}min`;
}