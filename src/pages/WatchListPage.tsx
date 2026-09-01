import { WatchlistMovies } from "../components/WatchlistPage/WatchlistMovies"
import { WatchlistTvShows } from "../components/WatchlistPage/WatchlistTvShows"


export function WatchListPage() {
	return (

		<div className="w-full laptop:max-w-[1280px] desktop:max-w-[1600px] mx-auto px-4 laptop:px-0 py-8 flex flex-col text-white">
			<div className=" laptop:py-10  flex flex-col gap-[clamp(50px,calc(4.167vw+20px),100px)]">
				<WatchlistMovies />
				<WatchlistTvShows />
			</div>

		</div>
	)
}