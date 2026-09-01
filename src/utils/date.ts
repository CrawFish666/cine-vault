export function formatDate(date: string): string {
	const [year, month, day] = date.split("-").map(Number)

	return new Intl.DateTimeFormat("ru-RU", {
		day: "numeric",
		month: "long",
		year: "numeric",
	})
		.format(new Date(year, month - 1, day))
		.replace(" г.", "")
}