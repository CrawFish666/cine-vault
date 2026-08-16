import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout"
import { ROUTES } from "./pathConstants";
import { MoviesPage } from "../pages/MoviesPage";


export function AppRoutes() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route path={ROUTES.MOVIES} element={<MoviesPage />} />
			</Route>
		</Routes>
	)
}