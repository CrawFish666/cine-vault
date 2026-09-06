import { MustWatchMovies } from "../components/movies/MustWatchMovies";
import { TrendingNow } from "../components/movies/TrendingNow";
import { MustWatchTvShows } from "../components/tvshows/MustWatchTvShows";
import { TrendingNowTvShows } from "../components/tvshows/TrendingNowTvShows";

export function HomePage() {
	return (
		<div className="py-8 flex flex-col gap-[80px] laptop:gap-[100px] desktop:gap-[180px]">
			<div className="relative laptop:px-[clamp(39px,calc(2.083vw-5px),50px)] laptop:py-10 laptop:border laptop:border-surface-15 laptop:rounded-xl flex flex-col gap-[clamp(50px,calc(4.167vw+20px),100px)]">
				<span className="hidden laptop:block absolute top-0 left-10 -translate-y-1/2 bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-md">
					Сериалы
				</span>
				<TrendingNowTvShows />
				<MustWatchTvShows />
			</div>


			<div className="relative laptop:px-[clamp(39px,calc(2.083vw-5px),50px)] laptop:py-10 laptop:border laptop:border-surface-15 laptop:rounded-xl flex flex-col gap-[clamp(50px,calc(4.167vw+20px),100px)]">
				<span className="hidden laptop:block absolute top-0 left-10 -translate-y-1/2 bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-md">
					Фильмы
				</span>
				<TrendingNow />
				<MustWatchMovies />
			</div>

		</div>
	)
}