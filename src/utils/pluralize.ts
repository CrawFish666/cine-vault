export function pluralizeEpisodes(count: number) {
	const lastTwo = count % 100;
	const last = count % 10;

	if (lastTwo >= 11 && lastTwo <= 14) {
		return `${count} эпизодов`;
	}

	if (last === 1) {
		return `${count} эпизод`;
	}

	if (last >= 2 && last <= 4) {
		return `${count} эпизода`;
	}

	return `${count} эпизодов`;
}