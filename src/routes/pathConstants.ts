export const ROUTES = {
	HOME: "/",
	MOVIES: "/movies",
	MOVIE_DETAILS: "/movies/:id",
	MOVIE_DETAILS_BY_ID: (id: number | string) => `/movies/${id}`,
	MOVIES_BY_GENRE: "/movies/by-genre/:id",
	MOVIES_BY_GENRE_BY_ID: (id: number | string) => `/movies/by-genre/${id}`,
	TV_SHOWS: "/tv_shows",
	TV_SHOWS_DETAILS: "/tv_shows/:id",
	TV_SHOWS_DETAILS_BY_ID: (id: number | string) => `/tv_shows/${id}`,
	PEOPLE: "/people",
	WATCHLIST: "/watchlist",
	SEARCH: "/search",
} as const;