import { ROUTES } from "../../routes/pathConstants";

export type SectionLinkItem = {
	id: string;
	label: string;
}

export const sectionLinks: Record<string, SectionLinkItem[]> = {
	[ROUTES.HOME]: [
		{id: "trending-tv-shows", label: "Сериалы в тренде"},
		{id: "must-watch-tv-shows", label: "Сериалы, которые стоит посмотреть"},
		{id: "trending-movies", label: "Фильмы в тренде"},
		{ id: "must-watch-movies", label: "Фильмы, которые стоит посмотреть"}
	],
	[ROUTES.MOVIES]: [
		{ id: "now-playing-movies", label: "Сейчас в кино" },
		{ id: "genres-movies", label: "По жанрам" },
		{ id: "upcoming-movies", label: "Скоро в кино" },
		{ id: "must-watch-movies", label: "Стоит посмотреть" },
		{ id: "trending-movies", label: "В тренде" },
	],
	[ROUTES.TV_SHOWS]: [
		{ id: "genres-tv-shows", label: "По жанрам" },
		{ id: "airing-today-tv-shows", label: "Выходят сегодня" },
		{ id: "airing-next-week-tv-shows", label: "На этой неделе" },
		{ id: "trending-tv-shows", label: "В тренде" },
		{ id: "must-watch-tv-shows", label: "Стоит посмотреть" },
	],
	[ROUTES.PEOPLE]: [
		{ id: "popular-peoples", label: "Популярные" },
		{ id: "trending-peoples", label: "В тренде" },
	],
}