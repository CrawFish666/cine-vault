import { AiringTodayTvShows } from "../components/TVShowsPage/AiringTodayTvShows";
import { MustWatchTvShows } from "../components/TVShowsPage/MustWatchTvShows";
import { OnTheAirTvShows } from "../components/TVShowsPage/OnTheAirTvShows";
import { OurGenresTvShowsList } from "../components/TVShowsPage/OurGenresTvShowsList";
import { TrendingNowTvShows } from "../components/TVShowsPage/TrendingNowTvShows";


export function TVSHows() {
	return (
		<div className="w-full laptop:max-w-[1280px] desktop:max-w-[1600px] mx-auto px-4 laptop:px-0 py-8 flex flex-col ">
			<div className="laptop:px-[clamp(39px,calc(2.083vw-5px),50px)] laptop:py-10 laptop:border laptop:border-surface-15 laptop:rounded-xl flex flex-col gap-[clamp(50px,calc(4.167vw+20px),100px)]">
				<OurGenresTvShowsList />
				<AiringTodayTvShows />
				<OnTheAirTvShows />
				<TrendingNowTvShows />
				<MustWatchTvShows />
			</div>

		</div>
	)
}