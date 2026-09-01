import { PopularPeople } from "../components/People/PopularPeople";
import { TrendingPeople } from "../components/People/TrendingPeople";

export function PeoplePage() {
	return (

		<div className="w-full laptop:max-w-[1280px] desktop:max-w-[1600px] mx-auto px-4 laptop:px-0 py-8 flex flex-col ">
			<div className="laptop:px-[clamp(39px,calc(2.083vw-5px),50px)] laptop:py-10 laptop:border laptop:border-surface-15 laptop:rounded-xl flex flex-col gap-[clamp(50px,calc(4.167vw+20px),100px)]">
				<PopularPeople />
				<TrendingPeople />
			</div>

		</div>
	)
}