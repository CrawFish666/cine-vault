import { ROUTES } from "../../routes/pathConstants";

export type SectionLinkItem = {
	id: string;
	label: string;
}

export const sectionLinks: Record<string, SectionLinkItem[]> = {
	[ROUTES.HOME]: [],
	[ROUTES.MOVIES]: [
		{ id: "nowPlayingMovies", label: "Now Playing" },
		{ id: "upcoming-movies", label: "Upcoming" },
		{ id: "trending-movies", label: "Trending Now" },
		{ id: "genres-movies", label: "Our Genres" },
		{ id: "must-watch-movies", label: "Must Watch" },
	],
	[ROUTES.TV_SHOWS]: [
		{ id: "airingTodayTVShows", label: "Airing Today" },
		{ id: "popularTVShows", label: "Popular" },
		{ id: "trendingTVShows", label: "Trending Now" },
		{ id: "genresTVShows", label: "Our Genres" },
	],
	[ROUTES.PEOPLE]: [],
}