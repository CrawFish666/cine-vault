import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { PageContainer } from "../components/PageContainer";
import { useScrollToHash } from "../hooks/useScrollToHash";
import { useScrollToTop } from "../hooks/useScrollToTop";



export function AppLayout() {
	useScrollToTop()
	useScrollToHash()

	return (

		<>
			<Header />

			<main className="flex-1 ">
				<PageContainer>
					<Outlet />
				</PageContainer>
			</main>

			<Footer /></>

	)
}