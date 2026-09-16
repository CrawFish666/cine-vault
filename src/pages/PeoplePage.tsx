import { PopularPeople } from "../components/people/PopularPeople";
import { TrendingPeople } from "../components/people/TrendingPeople";

export function PeoplePage() {
	return (

		<div className="py-8 flex flex-col gap-[80px] laptop:gap-[100px] desktop:gap-[180px]">
			<div className="laptop:px-[clamp(39px,calc(2.083vw-5px),50px)] laptop:py-10 laptop:border laptop:border-surface-15 laptop:rounded-xl flex flex-col gap-[clamp(50px,calc(4.167vw+20px),100px)]">
				<PopularPeople />
				<TrendingPeople />
			</div>

		</div>
	)
}
