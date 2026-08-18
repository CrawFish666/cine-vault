import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./queryClient"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"


function App() {


	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default App
