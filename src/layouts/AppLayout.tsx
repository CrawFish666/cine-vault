import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header/Header";



export function AppLayout() {
	return (
		<>

			<Header />

			<main className="flex-1">
				<Outlet />
			</main>

			<Footer />

		</>
	)
}