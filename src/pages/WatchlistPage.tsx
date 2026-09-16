import { WatchlistMovies } from "../components/watchlist/WatchlistMovies"
import { WatchlistTvShows } from "../components/watchlist/WatchlistTvShows"


export function WatchlistPage() {
	return (

		<div className="py-8 flex flex-col gap-[80px] laptop:gap-[100px] desktop:gap-[180px]">
			<div className=" laptop:py-10  flex flex-col gap-[clamp(50px,calc(4.167vw+20px),100px)]">
				<WatchlistMovies />
				<WatchlistTvShows />
			</div>

		</div>
	)
}