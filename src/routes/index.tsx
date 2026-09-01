import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout"
import { ROUTES } from "./pathConstants";
import { MoviesPage } from "../pages/MoviesPage";
import { HomePage } from "../pages/HomePage";
import { TVSHows } from "../pages/TVShowsPage";
import { PeoplePage } from "../pages/PeoplePage";
import { WatchListPage } from "../pages/WatchListPage";
import { SearchPage } from "../pages/SearchPage";


export function AppRoutes() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route path={ROUTES.HOME} element={<HomePage />} />
				<Route path={ROUTES.MOVIES} element={<MoviesPage />} />
				<Route path={ROUTES.TV_SHOWS} element={<TVSHows />} />
				<Route path={ROUTES.PEOPLE} element={<PeoplePage />} />
				<Route path={ROUTES.WATCHLIST} element={<WatchListPage />} />
				<Route path={ROUTES.SEARCH} element={<SearchPage />} />
			</Route>
		</Routes>
	)
}