import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout"
import { ROUTES } from "./pathConstants";
import { MoviesPage } from "../pages/MoviesPage";
import { HomePage } from "../pages/HomePage";
import { TVSHows } from "../pages/TVShowsPage";
import { PeoplePage } from "../pages/PeoplePage";
import { SearchPage } from "../pages/SearchPage";
import { MovieDetailsPage } from "../pages/MovieDetailsPage";
import { TvShowDetailsPage } from "../pages/TvShowDetailsPage";
import { WatchlistPage } from "../pages/WatchlistPage";
import { MoviesByGenrePage } from "../pages/MoviesByGenrePage";
import { TvShowsByGenrePage } from "../pages/TvShowsByGenrePage";
import { NotFoundPage } from "../pages/NotFoundPage";


export function AppRoutes() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route path={ROUTES.HOME} element={<HomePage />} />

				<Route path={ROUTES.MOVIES} element={<MoviesPage />} />
				<Route path={ROUTES.MOVIE_DETAILS} element={<MovieDetailsPage />} />
				<Route path={ROUTES.MOVIES_BY_GENRE} element={<MoviesByGenrePage />} />

				<Route path={ROUTES.TV_SHOWS} element={<TVSHows />} />
				<Route path={ROUTES.TV_SHOWS_DETAILS} element={<TvShowDetailsPage />} />
				<Route path={ROUTES.TV_SHOWS_BY_GENRE} element={<TvShowsByGenrePage />} />

				<Route path={ROUTES.PEOPLE} element={<PeoplePage />} />
				<Route path={ROUTES.WATCHLIST} element={<WatchlistPage />} />
				<Route path={ROUTES.SEARCH} element={<SearchPage />} />

				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	)
}