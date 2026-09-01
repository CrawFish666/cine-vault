import { NowPlayingCarousel } from "../components/MoviesPage/NowPlayingCarousel";
import { Upcoming } from "../components/MoviesPage/Upcoming";
import { MustWatchMovies } from "../components/MoviesPage/MustWatchMovies";
import { GenresMovieList } from "../components/MoviesPage/GenresMovieList";
import { TrendingNow } from "../components/MoviesPage/TrendingNow";

export function MoviesPage() {


	return (
		<div className="w-full laptop:max-w-[1280px] desktop:max-w-[1600px] mx-auto px-4 laptop:px-0 py-8 flex flex-col gap-[80px] laptop:gap-[100px] desktop:gap-[180px]">
			<NowPlayingCarousel />
			<div className="laptop:px-[clamp(39px,calc(2.083vw-5px),50px)] laptop:py-10 laptop:border laptop:border-surface-15 laptop:rounded-xl flex flex-col gap-[clamp(50px,calc(4.167vw+20px),100px)]">
				<GenresMovieList />
				<Upcoming />
				<MustWatchMovies />
				<TrendingNow />
			</div>
		</div>
	)
}
